import { Button, Input, message, Modal, Tooltip, Upload } from 'antd'
import { get } from 'lodash'
import React, { useState } from 'react'
import api from 'services/api'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const form = ({ modalData, setModalData }) => {

    const [title, setTitle] = useState("")

    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()

    useEffect(() => {
        setTitle(modalData?.data?.title)
    }, [modalData])

    const handleSubmit = async () => {
        setModalData({
            isOpen: false, data: null
        })
        try {
            if (!modalData?.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Vakansiya qo'shildi",
                });
                return (await api.post(
                    "vacancies/create",
                    { title }
                ),
                    queryClient.invalidateQueries({ queryKey: ["vakansiya"] }))

            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Vakansiya o'zgartirildi",
                });
                return (await api.put(
                    `vacancies/update/${modalData.data.id}`,
                    { title }
                ), queryClient.invalidateQueries({ queryKey: ["vakansiya"] }))
            }
        }
        catch (err) {
            messageApi.open({
                type: 'error',
                content: "Vakansiya qo'shilmadi",
            });
        }
    };

    return (
        <Modal
            title={get(modalData, "data") ? "Vakansiyani o'zgartirish" : "Yangi Vakansiya qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <div className="my-3">
                <div className="
                sm:block md:block d-flex 
                my-3 gap-4  
                justify-center
                items-center
                ">
                    <div className=' w-[100%]'>
                        <h6>Name:</h6>
                        <Input
                            type="text"
                            value={title}
                            defaultValue={title}
                            className='outline-none w-full'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="w-[95%] flex justify-end my-3">
                    <Tooltip placement='top' title={"Yaratish"}>
                        <Button className="" type="primary" onClick={handleSubmit}>
                            {get(modalData, "data") ? "Update" : "Create"}
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Modal>
    )
}

export default form