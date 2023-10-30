import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, message, Modal } from 'antd'
import { get } from 'lodash'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { Fields } from 'components'
import api from 'services/api'
import { useState } from 'react'
import { useEffect } from 'react'


const form = ({ modalData, setModalData }) => {

    const [messageApi, contextHolder] = message.useMessage();

    const queryClient = useQueryClient()
    const validate = Yup.object({
        image: Yup.string()
            .required("Rasm kiritilmagan...!"),
        title: Yup.string()
            .required("Title kiritilmagan...!"),
        desc: Yup.string()
            .required("Description kiritilmagan...!"),
    })
    const formData = new FormData()

    const mutation = useMutation({
        mutationFn: async (values) => {
            formData.append('image', values.image)
            formData.append('title', values.title)
            formData.append('desc', values.desc)

            if (!modalData.data) {
                return await api.post(
                    "/services/create",
                    formData
                );
            }
            else {
                return await api.put(
                    `/services/update/${modalData.data.id}`,
                    formData
                )
            }
        },
        onSuccess: (data) => {
            setModalData({ isOpen: false, data: null })
            queryClient.invalidateQueries({ queryKey: ["services"] });
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Service qo'shildi",
                });
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Service o'zgartirildi",
                });
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: "Service qo'shilmadi",
            });
        }
    });
    return (
        <Modal
            title={get(modalData, "data") ? "Serviceni o'zgartirish" : "Yangi Service qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => { setModalData({ isOpen: false, data: null }) }}
        >
            <Formik
                initialValues={{
                    image: "",
                    title: get(modalData, "data.title", ""),
                    desc: get(modalData, "data.desc", "")
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
                                    name={`desc`}
                                    label="Description"
                                    component={Fields.TextArea}
                                />
                                <div className="w-full flex justify-end my-3">
                                    <Button className="" type="primary" onClick={() => mutation.mutate(values)}>
                                        {get(modalData, "data") ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </>
                        </Form>
                    )
                }}
            </Formik>
            {contextHolder}
        </Modal>
    )
}

export default form