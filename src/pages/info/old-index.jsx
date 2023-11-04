import React from 'react'
import ContainerAll from 'moduls/container/all'
import { get, truncate } from 'lodash'
import { useHooks } from 'hooks'
import { useState } from 'react'
import { Avatar, Button, message, Popover, Tooltip } from 'antd'
import { Table } from 'components'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
import Form from './create-update.jsx'
import Content from './content'

const index = () => {
    const { params, navigate, } = useHooks()
    const queryClient = useQueryClient()

    const [modalData, setModalData] = useState({
        isOpen: false, data: null
    })

    const [contentModal, setContentModal] = useState({
        isOpen: false, data: null
    })

    const columns = [
        {
            title: 'Manzil',
            dataIndex: 'address',
            key: 'address',
            render: (value) => {
                return value?.length > 30 ? (
                    <Popover title={value}>
                        {truncate(value, { length: 40, omission: "..." })}
                    </Popover>
                ) : (
                    value
                );
            },
        },
        {
            title: 'Kompaniya xaqida',
            dataIndex: 'about',
            key: 'about',
            render: (value) => {
                return value?.length > 30 ? (
                    <Popover title={value}>
                        {truncate(value, { length: 40, omission: "..." })}
                    </Popover>
                ) : (
                    value
                );
            },
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telegram',
            dataIndex: 'telegram',
            key: 'telegram',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
        }
    ]

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/company-details/delete`,
            method: "delete",
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["info"] });
                message.success("Ma'lumot o'chirib yuborildi");
            },
            onError: () => {
                message.error("Ma'lumot o'chirilmadi...!")
            }
        })
    };

    return (
        <ContainerAll
            url={"/company-details"}
            queryKey={"info"}
            params={{
                take: 0,
                page: get(params, "page", 1)
            }}
        >
            {({ items, isLoading, meta }) => {

                return (
                    <div>
                        <div className="d-flex justify-end my-3">
                            {/* {
                                items?.length > 0 ? null :
                                    <Tooltip placement='bottom' title={"Yangi ma'lumot qo'shish"}>
                                        <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                                            Add Info
                                        </Button>
                                    </Tooltip>
                            } */}
                            {
                                items?.length > 0 ? null :
                                    <Tooltip placement='bottom' title={"Yangi ma'lumot qo'shish"}>
                                        <Button type='primary' onClick={() => navigate("/info-create")}>
                                            Add Info
                                        </Button>
                                    </Tooltip>
                            }
                            <Form {...{ modalData, setModalData }} />
                            <Content {...{ contentModal, setContentModal }} />
                        </div>
                        <div className="my-3">
                            <Table
                                meta={meta}
                                items={items}
                                isLoading={isLoading}
                                columns={columns}
                                hasDelete={false}
                                deleteAction={(row) => deleteConfirm()}
                                updateAction={(row) => navigate(`/info-update/${"id"}`)}
                                hasUpdate={true}
                                hasPagination={false}
                                customPagination={true}
                                hasContent={true}
                                contentAction={(row) => setContentModal({ isOpen: true, data: row })}
                            />
                        </div>
                    </div>
                )
            }}
        </ContainerAll>
    )
}

export default index