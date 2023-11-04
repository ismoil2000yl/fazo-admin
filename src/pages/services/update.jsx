import { Button, Tooltip, Upload, message } from 'antd'
import Input from 'antd/es/input/Input'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'services/api'

const create = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [image, setImage] = useState(null)
    const [title, setTitle] = useState({ uz: "", ru: "", en: "" })
    const [desc, setDesc] = useState({ uz: "", ru: "", en: "" })

    const strTitle = JSON.stringify(title);
    const strDesc = JSON.stringify(desc)

    const [messageApi, contextHolder] = message.useMessage();

    const formData = new FormData();

    const handleSubmit = async () => {
        formData.append('image', image)
        formData.append('title', strTitle)
        formData.append('desc', strDesc)
        try {
            await api.put(
                `/services/update/${id}`,
                formData
            );
            messageApi.open({
                type: 'success',
                content: "Service o'zgartirildi",
            });
            navigate("/services")
            setImage("")
            setTitle("")
            setDesc("")
        }
        catch (err) {
            messageApi.open({
                type: 'error',
                content: "Service o'zgartirilmadi...!",
            });
        }
    }

    const getData = async () => {
        const data = await api.get(`/services/${id}`)
        const prsTitle = JSON.parse(data.data.title)
        const prsDesc = JSON.parse(data.data.desc)
        setImage(data.data.image)
        setTitle({ uz: prsTitle.uz, ru: prsTitle.ru, en: prsTitle.en })
        setDesc({ uz: prsDesc.uz, ru: prsDesc.ru, en: prsDesc.en })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="my-2">
                <Tooltip placement='bottom' title={"Ortga qaytish"}>
                    <Button type='primary' onClick={() => navigate("/services")}>
                        {'<- '} Back to Services
                    </Button>
                </Tooltip>
            </div>
            <div className="my-3 overflow-y-scroll h-[100vh] pb-20">
                <div className=" w-full m-auto	">
                    <h6 className={"d-flex justify-center items-center "}>Service Icon:</h6>
                    <div className='d-flex items-center gap-4 justify-center flex-col'>
                        {typeof image == "object" ? null :
                            <img className='w-[100px] aspect-square' src={`http://192.168.1.195:5055/services/${image}`} alt="" />
                        }
                        <Upload
                            listType="picture-card"
                            onChange={(e) => setImage(e.file.originFileObj)}
                            onPreview={false}
                            // fileList={[{ thumbUrl: `http://192.168.1.195:5055/services/${image}` }]}
                            className={"d-flex justify-center items-center"}
                        >
                            + Upload
                        </Upload >
                    </div>
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
                    <Tooltip placement='top' title={"O'zgartirish"}>
                        <Button className="" type="primary" onClick={handleSubmit}>
                            Update
                        </Button>
                    </Tooltip>
                </div>
            </div>
            {contextHolder}
        </div>
    )
}

export default create