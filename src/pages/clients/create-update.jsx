import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, message, Modal } from 'antd'
import { get } from 'lodash'
import { Formik, Form, Field } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { Fields } from 'components'
import api from 'services/api'

const form = ({ modalData, setModalData }) => {

    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()
    const validate = Yup.object({
        image: Yup.string()
            .required("Rasm kiritilmagan...!"),
        name: Yup.string()
            .required("Name kiritilmagan...!")
    })
    const formData = new FormData()

    const mutation = useMutation({
        mutationFn: async (values) => {
            formData.append('image', values.image)
            formData.append('name', values.name)

            if (!modalData.data) {
                return await api.post(
                    "/partners/create",
                    formData
                );
            }
            else {
                return await api.put(
                    `/partners/update/${modalData.data.id}`,
                    formData
                )
            }
        },
        onSuccess: (data) => {
            setModalData(false)
            queryClient.invalidateQueries({ queryKey: ["clients"] });
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Client qo'shildi",
                });
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Client o'zgartirildi",
                });
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: "Client qo'shilmadi",
            });
        }
    });

    return (
        <Modal
            title={get(modalData, "data") ? "Clientni o'zgartirish" : "Yangi Client qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <Formik
                initialValues={{
                    image: "",
                    name: modalData?.data?.name
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
                                // setFieldValue={modalData?.data?.image}
                                />
                                <Field
                                    name={`name`}
                                    label="Name"
                                    component={Fields.Input}
                                />
                                <div className="w-full flex justify-end my-3">
                                    <Button className="" type="primary" onClick={() => { mutation.mutate(values), resetForm({ values: { image: "", name: "" } }) }}>
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