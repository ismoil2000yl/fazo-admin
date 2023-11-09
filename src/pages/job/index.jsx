import React from 'react'
import ContainerAll from 'moduls/container/all'
import { get, truncate } from 'lodash'
import { useHooks } from 'hooks'
import { useState } from 'react'
import { Avatar, Button, message, Popover, Tooltip } from 'antd'
import { Table } from 'components'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'
// import Form from './create-update.jsx'
import Form from './create'

const index = () => {
  const { params, navigate, } = useHooks()
  const queryClient = useQueryClient()

  const [modalData, setModalData] = useState({
    isOpen: false, data: null
  })

  const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    }
  ]

  const { mutate: deletedHandler } = usePost()

  const deleteConfirm = (id) => {
    deletedHandler({
      url: `/vacancies/delete/${id}`,
      method: "delete",
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["vakansiya"] });
        message.success("Vakansiya o'chirib yuborildi");
      },
      onError: () => {
        message.error("Vakansiya o'chirilmadi...!")
      }
    })
  };

  return (
    <ContainerAll
      url={"/vacancies/all"}
      queryKey={"vakansiya"}
      params={{
        take: 0,
        page: get(params, "page", 1)
      }}
    >
      {({ items, isLoading, meta }) => {

        return (
          <div>
            <div className="d-flex justify-end my-3">
              <Tooltip placement='bottom' title={"Yangi Vakansiya qo'shish"}>
                <Button type='primary' onClick={() => setModalData({ isOpen: true, data: null })}>
                  Add Job
                </Button>
              </Tooltip>
              <Form {...{ modalData, setModalData }} />
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
              />
            </div>
          </div>
        )
      }}
    </ContainerAll>
  )
}

export default index