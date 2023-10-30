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
        about: Yup.string()
            .required("Ma'lumot kiritilmagan...!"),
        email: Yup.string()
            .required("Email kiritilmagan...!"),
        phone: Yup.string()
            .required("Telefon Nomer kiritilmagan...!"),
        telegram: Yup.string()
            .required("Telegram kiritilmagan...!"),
        address: Yup.string()
            .required("Address kiritilmagan...!"),
    })

    const mutation = useMutation({
        mutationFn: async (values) => {

            if (!modalData.data) {
                return await api.post(
                    "/company-details/create",
                    values
                );
            }
            else {
                return await api.patch(
                    `/company-details/update`,
                    values
                )
            }
        },
        onSuccess: (data) => {
            setModalData(false)
            queryClient.invalidateQueries({ queryKey: ["info"] });
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Ma'lumot qo'shildi",
                });
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Ma'lumot o'zgartirildi",
                });
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: "Ma'lumot qo'shilmadi",
            });
        }
    });

    return (
        <Modal
            title={get(modalData, "data") ? "Ma'lumotni o'zgartirish" : "Yangi ma'lumot qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <Formik
                initialValues={{
                    about: modalData?.data?.about,
                    address: modalData?.data?.address,
                    email: modalData?.data?.email,
                    phone: modalData?.data?.phone,
                    telegram: modalData?.data?.telegram,
                }}
                validationSchema={validate}
            >
                {({ values, resetForm }) => {
                    return (
                        <Form>
                            <>
                                <Field
                                    name={`address`}
                                    label="Manzil"
                                    component={Fields.TextArea}
                                />
                                <Field
                                    name={`about:`}
                                    label="Kompaniya xaqida ma'lumot"
                                    component={Fields.TextArea}
                                />
                                <Field
                                    name={`email`}
                                    label="E-mail"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`telegram`}
                                    label="Telegram"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`phone`}
                                    label="Telefon"
                                    component={Fields.Input}
                                />
                                <div className="w-full flex justify-end my-3">
                                    <Button className="" type="primary" onClick={() => { mutation.mutate(values), resetForm({ values: { address: "", about: "", email: "", telegram: "", phone: "" } }) }}>
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