import { Button, Tooltip, Upload, message, Select } from 'antd'
import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'services/api'

const create = () => {

    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState({ uz: "", ru: "", en: "" })
    const [desc, setDesc] = useState({ uz: "", ru: "", en: "" })
    const [link, setLink] = useState("")
    const [status, setStatus] = useState(1)
    const [serviceId, setServiceId] = useState("")
    const [options, setOptions] = useState([])

    const strTitle = JSON.stringify(title);
    const strDesc = JSON.stringify(desc)

    const [messageApi, contextHolder] = message.useMessage();

    const types = [
        {
            id: 1,
            label: 'Katta loyiha',
            value: 1
        },
        {
            id: 2,
            label: 'Kichik loyiha',
            value: 2
        }
    ]

    const formData = new FormData();

    const handleSubmit = async () => {
        formData.append('image', image)
        formData.append('title', strTitle)
        formData.append('desc', strDesc)
        formData.append('link', link)
        formData.append('status', status)
        formData.append('serviceId', serviceId)
        try {
            await api.post(
                "/projects/create",
                formData
            );
            messageApi.open({
                type: 'success',
                content: "Yangi Project qo'shildi",
            });
            navigate("/projects")
            setImage("")
            setTitle("")
            setDesc("")
            setLink("")
            setStatus("")
            setServiceId("")
            setOptions("")
        }
        catch (err) {
            messageApi.open({
                type: 'error',
                content: "Project qo'shilmadi",
            });
        }
    }

    const getService = async () => {
        // const services = await axios.get("http://192.168.1.195:5055/services/all")
        const data = await api.get("/services/all")
        // const prsData = JSON.parse(data)
        setOptions(data.data)
    }

    useEffect(() => {
        getService()
    }, [])

    return (
        <div>
            <div className="my-2">
                <Tooltip placement='bottom' title={"Ortga qaytish"}>
                    <Button type='primary' onClick={() => navigate("/projects")}>
                        {'<- '} Back to Projects
                    </Button>
                </Tooltip>
            </div>
            <div className="my-3 overflow-y-scroll h-[100vh] pb-20">
                <div className=" w-full m-auto	">
                    <h6 className={"d-flex justify-center items-center "}>Project Image:</h6>
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
                d-flex 
                my-3 
                justify-center
                items-center
                ">
                    <div className='w-[50%]'>
                        <h6>Project link:</h6>
                        <Input
                            type="text"
                            value={link}
                            defaultValue={link}
                            className='outline-none w-full'
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                </div>
                <div className="
                sm:block md:block d-flex 
                my-3 gap-4  
                justify-center
                items-center
                ">
                    <Select value={serviceId} className="w-[45%] cursor-pointer" onChange={(e) => setServiceId(e)}>
                        {
                            options.map((item, index) => {
                                const strTirile = JSON.parse(item.title)
                                return (
                                    <option key={index} value={item.id}>{strTirile.uz}</option>
                                )
                            })
                        }
                    </Select>
                    <Select value={status} className="w-[45%] cursor-pointer" onChange={(e) => setStatus(e)}>
                        {
                            types.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="
                sm:block md:block d-flex 
                my-3 gap-4  
                justify-center
                items-center
                ">
                    <div className=' w-[30%]'>
                        <h6>Title Uz:</h6>
                        <Input
                            type="text"
                            value={title.uz}
                            defaultValue={title.uz}
                            className='outline-none w-full'
                            onChange={(e) => setTitle((pev) => ({ ...pev, uz: e.target.value }))}
                        />
                    </div>
                    <div className=' w-[30%]'>
                        <h6>Title Ru:</h6>
                        <Input
                            type="text"
                            value={title.ru}
                            defaultValue={title.ru}
                            className='outline-none w-full'
                            onChange={(e) => setTitle((pev) => ({ ...pev, ru: e.target.value }))}
                        />
                    </div>
                    <div className=' w-[30%]'>
                        <h6>Title En:</h6>
                        <Input
                            type="text"
                            value={title.en}
                            defaultValue={title.en}
                            className='outline-none w-full'
                            onChange={(e) => setTitle((pev) => ({ ...pev, en: e.target.value }))}
                        />
                    </div>
                </div>
                <div className='my-3 d-flex flex-col justify-center items-center'>
                    <div className="w-[95%] my-3">
                        <h6>Description Uz:</h6>
                        <TextArea
                            rows={"5"}
                            value={desc.uz}
                            defaultValue={desc.uz}
                            onChange={(e) => setDesc((pev) => ({ ...pev, uz: e.target.value }))}
                        />
                    </div>
                    <div className="w-[95%] my-3">
                        <h6>Description Ru:</h6>
                        <TextArea
                            rows={"5"}
                            value={desc.ru}
                            defaultValue={desc.ru}
                            onChange={(e) => setDesc((pev) => ({ ...pev, ru: e.target.value }))}
                        />
                    </div>
                    <div className="w-[95%] my-3">
                        <h6>Description En:</h6>
                        <TextArea
                            rows={"5"}
                            value={desc.en}
                            defaultValue={desc.en}
                            onChange={(e) => setDesc((pev) => ({ ...pev, en: e.target.value }))}
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
            {contextHolder}
        </div>
    )
}

export default create