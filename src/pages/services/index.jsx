import React from 'react'
import ContainerAll from 'moduls/container/all'
import { useHooks } from 'hooks'
import { useState } from 'react'
import { Avatar, Button, message, Pagination, Popover, Tooltip, Card, Popconfirm, Spin, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PaperClipOutlined } from "@ant-design/icons";
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
import Content from './content'
import { useEffect } from 'react'
import axios from 'axios'
import { truncate } from 'lodash'
const { Meta } = Card;

const index = () => {
    const { params, navigate, } = useHooks()
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const queryClient = useQueryClient()

    // <Avatar className='shadow-sm' size={"large"} src={`http://192.168.1.195:5055/services/${value}`} />

    const getLength = async () => {
        const data = await axios.get("http://192.168.1.195:5055/company-details/length")
        setTotal(data?.data?.services)
    }

    useEffect(() => {
        getLength()
    }, [])

    const [contentModal, setContentModal] = useState({
        isOpen: false, data: null
    })

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/services/delete/${id}`,
            method: "delete",
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["services"] });
                message.success("Service o'chirib yuborildi");
            },
            onError: () => {
                message.error("Service o'chirilmadi...!")
            }
        })
    };

    const onChange = (page) => {
        setCurrent(page);
    };

    const cancel = (e) => {
        message.error("Ushbu ma'lumot o'chirilmadi");
    };

    return (
        <ContainerAll
            url={"/services/all"}
            queryKey={"services"}
            params={{
                take: 5,
                offset: current
            }}
        >
            {({ items, isLoading, meta }) => {

                return (
                    <div>
                        <div className="d-flex justify-end my-3">
                            <Tooltip placement='bottom' title={"Yangi xizmat qo'shish"}>
                                <Button type='primary' onClick={() => navigate("/services-create")}>
                                    Add Services
                                </Button>
                            </Tooltip>
                            <Content {...{ contentModal, setContentModal }} />
                        </div>
                        <div className="
                        my-4 gap-4 overflow-y-scroll 
                        h-[70vh] d-flex justify-center 
                        items-center flex-wrap w-[95%]"
                        >
                            {
                                items ? items.map(item => {
                                    let prsTitle = JSON.parse(item.title)
                                    let prsDesc = JSON.parse(item.desc)
                                    return (
                                        <>
                                            <Card
                                                key={item.id}
                                                style={{
                                                    width: 300
                                                }}
                                                cover={
                                                    <img
                                                        alt="example"
                                                        className='w-[200px] h-[200px] object-contain p-[16px]'
                                                        src={`http://192.168.1.195:5055/services/${item.image}`}
                                                    />
                                                }
                                                actions={[
                                                    <EditOutlined key="edit" onClick={() => navigate(`/services-update/${item.id}`)} />,
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title={"O'chirish"}
                                                        description={"O'chirishni xoxlaysizmi?"}
                                                        onConfirm={() => deleteConfirm(item.id)}
                                                        onCancel={cancel}
                                                        okText="Ha"
                                                        cancelText="Yo'q"
                                                    >
                                                        <DeleteOutlined
                                                            key={"delete"}
                                                            className="text-red-500 cursor-pointer text-lg"
                                                        />
                                                    </Popconfirm>,
                                                    <PaperClipOutlined
                                                        key="content"
                                                        onClick={() => setContentModal({ isOpen: true, data: item })}
                                                    />,
                                                ]}
                                            >
                                                <Meta
                                                    title={prsTitle?.uz}
                                                    description={truncate(prsDesc?.uz,
                                                        { length: 110, omission: "..." })}
                                                />
                                            </Card>
                                        </>
                                    )
                                }) : <Space size="middle">
                                    <Spin tip="Loading" size="large" />
                                </Space>
                            }
                        </div>
                        <div className="my-2 mx-4 float-right">
                            <Pagination current={current} pageSize={5} onChange={onChange} total={total} />
                        </div>
                    </div>
                )
            }}
        </ContainerAll>
    )
}

export default index