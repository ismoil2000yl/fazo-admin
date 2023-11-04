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
import { useEffect } from 'react'
import axios from 'axios'

const index = () => {
    const { params, navigate, } = useHooks()
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0)
    const queryClient = useQueryClient()

    const getLength = async () => {
        const data = await axios.get("http://192.168.1.195:5055/company-details/length")
        setTotal(data?.data?.services)
    }

    useEffect(() => {
        getLength()
    }, [])

    // const [modalData, setModalData] = useState({
    //     isOpen: false, data: null
    // })

    const [contentModal, setContentModal] = useState({
        isOpen: false, data: null
    })

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
                return <Avatar className='shadow-sm' size={"large"} src={`http://192.168.1.195:5055/services/${value}`} />
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
            key: 'description',
            render: (value) => {
                return value?.length > 40 ? (
                    <Popover title={value}>
                        {truncate(value, { length: 40, omission: "..." })}
                    </Popover>
                ) : (
                    value
                );
            },
        }
    ]

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
                                {/* <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}> */}
                                <Button type='primary' onClick={() => navigate("/services-create")}>
                                    Add Services
                                </Button>
                            </Tooltip>
                            {/* <Form {...{ modalData, setModalData }} /> */}
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