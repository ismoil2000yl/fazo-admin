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

const index = () => {
    const { params, navigate, } = useHooks()
    const queryClient = useQueryClient()

    const [modalData, setModalData] = useState({
        isOpen: false, data: null
    })
    const columns = [
        {
            title: 'Facebook',
            dataIndex: 'facebook',
            key: 'facebook',
        },
        {
            title: 'Instagram',
            dataIndex: 'instagram',
            key: 'instagram',
        },
        {
            title: 'Telegram',
            dataIndex: 'telegram',
            key: 'telegram',
        },
        {
            title: 'LinkedIn',
            dataIndex: 'linkedIn',
            key: 'linkedin',
        },
        {
            title: 'Git hub',
            dataIndex: 'github',
            key: 'github',
        },
    ]

    const { mutate: deletedHandler } = usePost()

    const deleteConfirm = (id) => {
        deletedHandler({
            url: `/links/delete/${id}`,
            method: "delete",
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["links"] });
                message.success("Ijtimoiy tarmoq o'chirib yuborildi");
            },
            onError: () => {
                message.error("Ijtimoiy tarmoq o'chirilmadi...!")
            }
        })
    };

    return (
        <ContainerAll
            url={"/links/all"}
            queryKey={"link"}
        // params={{
        //     sort: "-id",
        //     limit: "10",
        //     page: get(params, "page", 1)
        // }}
        >
            {({ items, isLoading, meta }) => {

                return (
                    <div>
                        <div className="d-flex justify-end my-3">
                            {
                                items?.length > 0 ? null :
                                    <Tooltip placement='bottom' title={"Yangi Ijtimoiy tarmoq qo'shish"}>
                                        <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                                            Add Social Network
                                        </Button>
                                    </Tooltip>
                            }
                            <Form {...{ modalData, setModalData }} />
                        </div>
                        <div className="my-3">
                            <Table
                                meta={meta}
                                items={items}
                                isLoading={isLoading}
                                columns={columns}
                                hasDelete={false}
                                deleteAction={(row) => deleteConfirm(get(row, "id"))}
                                updateAction={(row) => setModalData({ isOpen: true, data: row })}
                                hasUpdate={true}
                                hasPagination={false}
                                customPagination={true}
                            />
                        </div>
                    </div>
                )
            }}
        </ContainerAll>
    )
}

export default index