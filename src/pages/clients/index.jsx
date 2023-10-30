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
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (value) => {
        return <Avatar className='shadow-sm' size={"large"} src={`http://192.168.1.195:5055/partners/${value}`} />
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }
  ]

  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/partners/delete/${id}`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        message.success("Client o'chirib yuborildi");
      },
      onError: () => {
        message.error("Client o'chirilmadi...!")
      }
    })
  };

  return (
    <ContainerAll
      url={"/partners/all"}
      queryKey={"clients"}
      params={{
        take: "10",
        page: get(params, "page", 1)
      }}
    >
      {({ items, isLoading, meta }) => {

        return (
          <div>
            <div className="d-flex justify-end my-3">
              <Tooltip placement='bottom' title={"Yangi client qo'shish"}>
                <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                  Add Client
                </Button>
              </Tooltip>
              <Form {...{ modalData, setModalData }} />
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