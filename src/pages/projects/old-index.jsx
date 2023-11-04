import React from 'react'
import ContainerAll from 'moduls/container/all'
import { get, truncate } from 'lodash'
import { useHooks } from 'hooks'
import { useState } from 'react'
import { Avatar, Button, message, Pagination, Popover, Tooltip } from 'antd'
import { Table } from 'components'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
import Form from './create-update.jsx'
import Content from './content'
import axios from 'axios'
import { useEffect } from 'react'

export const types = [
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

const index = () => {
    const { params, navigate, } = useHooks()
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const queryClient = useQueryClient()

    const [modalData, setModalData] = useState({
        isOpen: false, data: null
    })

    const [contentModal, setContentModal] = useState({
        isOpen: false, data: null
    })

    const [service, setService] = useState([])

    const getService = async () => {
        const data = await axios.get("http://192.168.1.195:5055/services/all")
        setService(data.data)
    }
    const getLength = async () => {
        const data = await axios.get("http://192.168.1.195:5055/company-details/length")
        setTotal(data?.data?.projects)
    }

    useEffect(() => {
        getService()
        getLength()
    }, [])

    const columns = [
        // {
        //     title: 'Id',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (value) => {
                return <Avatar className='shadow-sm' size={"large"} src={`http://192.168.1.195:5055/projects/${value}`} />
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            render: (value) => {
                return value?.length > 40 ? (
                    <Popover title={value}>
                        {truncate(value, { length: 40, omission: "..." })}
                    </Popover>
                ) : (
                    value
                );
            },
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (value) => {
                return value?.length > 40 ? (
                    <Popover title={value}>
                        {truncate(value, { length: 20, omission: "..." })}
                    </Popover>
                ) : (
                    value
                );
            },
        },
        {
            title: 'Type',
            dataIndex: 'status',
            key: 'type',
            render: (value) => {
                return value && types.find((item) => item.value === value).label
            }
        },
        {
            title: "Category",
            dataIndex: "serviceId",
            key: "category",
            render: (value) => {
                const title = service.find(item => item.id === value)
                return title?.title
            }
        },
    ]

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/projects/delete/${id}`,
            method: "delete",
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["projects"] });
                message.success("Project o'chirib yuborildi");
            },
            onError: () => {
                message.error("Project o'chirilmadi...!")
            }
        })
    };

    const onChange = (page) => {
        setCurrent(page);
    };

    return (
        <ContainerAll
            url={"/projects/all"}
            queryKey={"projects"}
            params={{
                take: 5,
                offset: current
            }}
        >
            {({ items, isLoading, meta }) => {

                return (
                    <div>
                        <div className="d-flex justify-end my-3">
                            {/* <Tooltip placement='bottom' title={"Yangi proyekt qo'shish"}>
                                <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                                    Add Projects
                                </Button>
                            </Tooltip> */}
                            <Tooltip placement='bottom' title={"Yangi proyekt qo'shish"}>
                                <Button type='primary' onClick={() => navigate("/projects-create")}>
                                    Add Projects
                                </Button>
                            </Tooltip>
                            <Form {...{ modalData, setModalData, types }} />
                            <Content {...{ contentModal, setContentModal }} />
                        </div>
                        <div className="my-3">
                            <Table
                                meta={meta}
                                items={items}
                                isLoading={isLoading}
                                columns={columns}
                                hasDelete={true}
                                deleteAction={(row) => deleteConfirm(get(row, "id"))}
                                updateAction={(row) => setModalData({ isOpen: true, data: row })}
                                hasUpdate={true}
                                hasPagination={false}
                                customPagination={false}
                                hasContent={true}
                                contentAction={(row) => setContentModal({ isOpen: true, data: row })}
                            />
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