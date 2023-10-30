import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, message, Modal } from 'antd'
import { get } from 'lodash'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { Fields } from 'components'
import api from 'services/api'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const form = ({ modalData, setModalData, types }) => {

    const [service, setService] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()
    const validate = Yup.object({
        title: Yup.string()
            .required("Title kiritilmagan...!"),
        image: Yup.string()
            .required("Image kiritilmagan...!"),
        link: Yup.string()
            .required("Link kiritilmagan...!"),
        status: Yup.string()
            .required("Type kiritilmagan...!"),
        desc: Yup.string()
            .required("Description kiritilmagan...!")
    })
    const formData = new FormData()

    const mutation = useMutation({
        mutationFn: async (values) => {
            console.log(values)
            formData.append('image', values.image)
            formData.append('title', values.title)
            formData.append('desc', values.desc)
            formData.append('link', values.link)
            formData.append('status', values.status)
            formData.append('serviceId', values.serviceId)

            if (!modalData.data) {
                return await api.post(
                    "/projects/create",
                    formData
                );
            }
            else {
                return await api.put(
                    `/projects/update/${modalData.data.id}`,
                    formData
                )
            }
        },
        onSuccess: (data) => {
            setModalData({ isOpen: false, data: null })
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi proyekt qo'shildi",
                });
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Proyekt o'zgartirildi",
                });
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: "Proyekt qo'shilmadi",
            });
        }
    });

    const getService = async () => {
        const services = await axios.get("http://192.168.1.195:5055/services/all")
        setService(services.data)
    }

    useEffect(() => {
        getService()
    }, [])
    return (
        <Modal
            title={get(modalData, "data") ? "Proyekt ni o'zgartirish" : "Yangi Proyekt qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <Formik
                initialValues={{
                    image: "",
                    title: modalData?.data?.title,
                    desc: modalData?.data?.desc,
                    link: modalData?.data?.link,
                    status: modalData?.data?.status,
                    serviceId: modalData?.data?.serviceId,
                }}
                validationSchema={validate}
            >
                {({ values, resetForm }) => {
                    return (
                        <Form>
                            <>
                                <Field
                                    name="image"
                                    component={Fields.Upload}
                                />
                                <Field
                                    name={`title`}
                                    label="Title"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`link`}
                                    label="Link"
                                    component={Fields.Input}
                                />
                                <Field
                                    name="serviceId"
                                    label="Service"
                                    options={service}
                                    component={Fields.SelectService}
                                />
                                <Field
                                    name="status"
                                    label="Type"
                                    options={types}
                                    component={Fields.Select}
                                />
                                <Field
                                    name={`desc`}
                                    label="Description"
                                    component={Fields.TextArea}
                                />
                                <div className="w-full flex justify-end my-3">
                                    <Button
                                        className=""
                                        type="primary"
                                        onClick={() => { mutation.mutate(values), resetForm({ values: { image: "", title: "", link: "", serviceId: "", status: "", desc: "" } }) }}
                                    >
                                        {get(modalData, "data") ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </>
                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}

export default form