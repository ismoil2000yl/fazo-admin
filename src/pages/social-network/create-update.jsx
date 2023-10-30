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
        facebook: Yup.string()
            .required("Facebook kiritilmagan...!"),
        instagram: Yup.string()
            .required("Instagram kiritilmagan...!"),
        linkedin: Yup.string()
            .required("Linked In kiritilmagan...!"),
        github: Yup.string()
            .required("Git hub kiritilmagan...!"),
        telegram: Yup.string()
            .required("Telegram kiritilmagan...!"),
    })
    const formData = new FormData()

    const mutation = useMutation({
        mutationFn: async (values) => {
            if (modalData?.data?.facebook === values.facebook) delete values.facebook
            if (modalData?.data?.instagram === values.instagram) delete values.instagram
            if (modalData?.data?.telegram === values.telegram) delete values.telegram
            if (modalData?.data?.linkedIn === values.linkedIn) delete values.linkedIn
            if (modalData?.data?.github === values.github) delete values.github
            if (!modalData.data) {
                return await api.post(
                    "/links/create",
                    values
                );
            }
            else {
                return await api.patch(
                    `links/update`,
                    values
                )
            }
        },
        onSuccess: (data) => {
            setModalData(false)
            queryClient.invalidateQueries({ queryKey: ["links"] });
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Ijtimoiy tarmoq linki qo'shildi",
                });
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Ijtimoiy tarmoq linki o'zgartirildi",
                });
            }
        },
        onError: (error) => {
            messageApi.open({
                type: 'error',
                content: "Ijtimoiy tarmoq linki qo'shilmadi",
            });
        }
    });

    return (
        <Modal
            title={get(modalData, "data") ? "Ijtimoiy tarmoqni o'zgartirish" : "Yangi Ijtimoiy tarmoq qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <Formik
                initialValues={{
                    facebook: modalData?.data?.facebook,
                    telegram: modalData?.data?.telegram,
                    linkedIn: modalData?.data?.linkedIn,
                    github: modalData?.data?.github,
                    instagram: modalData?.data?.instagram
                }}
                validationSchema={validate}
            >
                {({ values, resetForm }) => {
                    return (
                        <Form>
                            <>
                                <Field
                                    name={`facebook`}
                                    label="Facebook"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`instagram`}
                                    label="Instagram"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`telegram`}
                                    label="Telegram"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`linkedIn`}
                                    label="LinkedIn"
                                    component={Fields.Input}
                                />
                                <Field
                                    name={`github`}
                                    label="Git hub"
                                    component={Fields.Input}
                                />
                                <div className="w-full flex justify-end my-3">
                                    <Button className="" type="primary" onClick={() => { mutation.mutate(values), resetForm({ values: { facebook: "", telegram: "", instagram: "", linkedIn: "", github: "" } }) }}>
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