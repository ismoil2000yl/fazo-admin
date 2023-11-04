import { Button, Input, Tooltip, message } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'services/api'
const { TextArea } = Input;

const create = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [telegram, setTelegram] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState({ uz: "", ru: "", en: "" })
    const [about, setAbout] = useState({ uz: "", ru: "", en: "" })

    const strAddress = JSON.stringify(address);
    const strAbout = JSON.stringify(about)

    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async () => {

        const data = {
            email: email,
            telegram: telegram,
            phone: phone,
            address: strAddress,
            about: strAbout
        }

        try {
            await api.post(
                "/company-details/create",
                data
            );
            messageApi.open({
                type: 'success',
                content: "Yangi Ma'lumot qo'shildi",
            });
            navigate("/info")
            setEmail("")
            setTelegram("")
            setPhone("")
            setAddress("")
            setAbout("")
        }
        catch (err) {
            messageApi.open({
                type: 'error',
                content: "Ma'lumot qo'shilmadi",
            });
        }
    }

    return (
        <div>
            <div className="my-2">
                <Tooltip placement='bottom' title={"Ortga qaytish"}>
                    <Button type='primary' onClick={() => navigate("/info")}>
                        {'<- '} Back to Info
                    </Button>
                </Tooltip>
            </div>
            <div className="my-3 overflow-y-scroll h-[100vh] pb-20">
                <div className=" w-full m-auto	">
                    <div className="
                sm:block md:block d-flex 
                my-3 gap-4  
                justify-center
                items-center
                ">
                        <div className=' w-[30%]'>
                            <h6>Email:</h6>
                            <Input
                                type="text"
                                value={email}
                                defaultValue={email}
                                className='outline-none w-full'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className=' w-[30%]'>
                            <h6>Telegram:</h6>
                            <Input
                                type="text"
                                value={telegram}
                                defaultValue={telegram}
                                className='outline-none w-full'
                                onChange={(e) => setTelegram(e.target.value)}
                            />
                        </div>
                        <div className=' w-[30%]'>
                            <h6>Phone number:</h6>
                            <Input
                                type="text"
                                value={phone}
                                defaultValue={phone}
                                className='outline-none w-full'
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='my-3 d-flex flex-col justify-center items-center'>
                        <div className="w-[95%] my-3">
                            <h6>Address uz:</h6>
                            <TextArea
                                rows={"5"}
                                value={address.uz}
                                defaultValue={address.uz}
                                onChange={(e) => setAddress((pev) => ({ ...pev, uz: e.target.value }))}
                            />
                        </div>
                        <div className="w-[95%] my-3">
                            <h6>Address ru:</h6>
                            <TextArea
                                rows={"5"}
                                value={address.ru}
                                defaultValue={address.ru}
                                onChange={(e) => setAddress((pev) => ({ ...pev, ru: e.target.value }))}
                            />
                        </div>
                        <div className="w-[95%] my-3">
                            <h6>Address en:</h6>
                            <TextArea
                                rows={"5"}
                                value={address.en}
                                defaultValue={address.en}
                                onChange={(e) => setAddress((pev) => ({ ...pev, en: e.target.value }))}
                            />
                        </div>
                        <div className="w-[95%] my-3">
                            <h6>About uz:</h6>
                            <TextArea
                                rows={"5"}
                                value={about.uz}
                                defaultValue={about.uz}
                                onChange={(e) => setAbout((pev) => ({ ...pev, uz: e.target.value }))}
                            />
                        </div>
                        <div className="w-[95%] my-3">
                            <h6>About ru:</h6>
                            <TextArea
                                rows={"5"}
                                value={about.ru}
                                defaultValue={about.ru}
                                onChange={(e) => setAbout((pev) => ({ ...pev, ru: e.target.value }))}
                            />
                        </div>
                        <div className="w-[95%] my-3">
                            <h6>About en:</h6>
                            <TextArea
                                rows={"5"}
                                value={about.en}
                                defaultValue={about.en}
                                onChange={(e) => setAbout((pev) => ({ ...pev, en: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="w-[95%] flex justify-end my-3">
                        <Tooltip placement='top' title={"Yaratish"}>
                            <Button className="" type="primary" onClick={handleSubmit}>
                                Create
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            {contextHolder}
        </div>
    )
}

export default create