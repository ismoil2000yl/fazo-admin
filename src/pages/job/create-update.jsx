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
        title: Yup.string()
            .required("Vakansiya kiritilmagan...!")
    })

    const mutation = useMutation({
        mutationFn: async (values) => {

            if (!modalData.data) {
                return await api.post(
                    "vacancies/create",
                    values
                );
            }
            else {
                return await api.put(
                    `vacancies/update/${modalData.data.id}`,
                    values
                )
            }
        },
        onSuccess: (data) => {
            setModalData(false)
            queryClient.invalidateQueries({ queryKey: ["vakansiya"] });
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Vakansiya qo'shildi",
                });
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Vakansiya o'zgartirildi",
                });
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: "Vakansiya qo'shilmadi",
            });
        }
    });
    return (
        <Modal
            title={get(modalData, "data") ? "Vakansiyani o'zgartirish" : "Yangi Vakansiya qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <Formik
                initialValues={{
                    title: modalData?.data?.title
                }}
                validationSchema={validate}
            >
                {({ values, resetForm }) => {
                    return (
                        <Form>
                            <>
                                <Field
                                    name={`title`}
                                    label="Title"
                                    component={Fields.Input}
                                />
                                <div className="w-full flex justify-end my-3">
                                    <Button className="" type="primary" onClick={() => { mutation.mutate(values), resetForm({ values: { title: "" } }) }}>
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