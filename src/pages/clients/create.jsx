import { Button, Input, message, Modal, Tooltip, Upload } from 'antd'
import { get } from 'lodash'
import React, { useState } from 'react'
import api from 'services/api'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const form = ({ modalData, setModalData }) => {

    const [image, setImage] = useState(null)
    const [name, setName] = useState("")

    const formData = new FormData()

    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient()

    useEffect(() => {
        setName(modalData?.data?.name)
        setImage(modalData?.data?.image)
    }, [modalData])

    const handleSubmit = async () => {
        formData.append('image', image)
        formData.append('name', name)
        setModalData({
            isOpen: false, data: null
        })
        try {
            if (!modalData.data) {
                messageApi.open({
                    type: 'success',
                    content: "Yangi Client qo'shildi",
                });
                return (await api.post(
                    "/partners/create",
                    formData
                ), queryClient.invalidateQueries({ queryKey: ["clients"] }))
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: "Client o'zgartirildi",
                });
                return (await api.put(
                    `/partners/update/${modalData.data.id}`,
                    formData
                ), queryClient.invalidateQueries({ queryKey: ["clients"] }))
            }
        }
        catch (err) {
            messageApi.open({
                type: 'error',
                content: "Client qo'shilmadi",
            });
        }
    };

    return (
        <Modal
            title={get(modalData, "data") ? "Clientni o'zgartirish" : "Yangi Client qo'shish"}
            open={modalData.isOpen}
            footer={false}
            onCancel={() => setModalData({ isOpen: false, data: null })}
        >
            {contextHolder}
            <div className="my-3">
                <div className=" w-full m-auto	">
                    <h6 className={"d-flex justify-center items-center "}>Image:</h6>
                    {!modalData?.data?.image ? null :
                        <img className='w-[100px] aspect-square' src={`http://192.168.1.195:5055/partners/${image}`} alt="" />
                    }
                    <Upload
                        listType="picture-card"
                        onChange={(e) => setImage(e.file.originFileObj)}
                        onPreview={false}
                        className={"d-flex justify-center items-center "}
                    >
                        + Upload
                    </Upload >
                </div>
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
                            value={name}
                            defaultValue={name}
                            className='outline-none w-full'
                            onChange={(e) => setName(e.target.value)}
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