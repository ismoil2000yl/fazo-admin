import React from 'react'
import ContainerAll from 'moduls/container/all'
import { get, truncate } from 'lodash'
import { useHooks } from 'hooks'
import { useState } from 'react'
import { Button, message, Popconfirm, Popover, Tooltip } from 'antd'
import { usePost } from 'crud'
import { useQueryClient } from '@tanstack/react-query'

const index = () => {
    const { params, navigate, } = useHooks()
    const queryClient = useQueryClient()

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

    const cancel = (e) => {
        message.error("Ushbu ma'lumot o'chirilmadi");
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

                // const strAddress = JSON.parse(items.length > 0 ? items[0].address : "{}")
                // const strAbout = JSON.parse(items.length > 0 ? items[0].about : "{}")
                const strAddress = items?.[0] ? JSON.parse(items[0].address) : ""
                const strAbout = items?.[0] ? JSON.parse(items[0].about) : ""

                return (
                    <div>
                        <div className="d-flex justify-end my-3">
                            {
                                !items?.length > 0 ? <Tooltip placement='bottom' title={"Yangi ma'lumot qo'shish"}>
                                    <Button type='primary' onClick={() => navigate("/info-create")}>
                                        Add Info
                                    </Button>
                                </Tooltip> :
                                    <div className='d-flex my-3 gap-4'>
                                        <Tooltip placement='bottom' title={"Ma'lumotni o'zgartirish"}>
                                            <Button type='primary' onClick={() => navigate(`/info-update`)}>
                                                Update
                                            </Button>
                                        </Tooltip>
                                        <Tooltip placement='bottom' title={"Ma'lumotni o'chirish"}>
                                            <Popconfirm
                                                placement="topRight"
                                                title={"O'chirish"}
                                                description={"O'chirishni xoxlaysizmi?"}
                                                onConfirm={() => deleteConfirm(items[0].id)}
                                                onCancel={cancel}
                                                okText="Ha"
                                                cancelText="Yo'q"
                                            >
                                                <Button type='primary' danger >
                                                    Delete
                                                </Button>
                                            </Popconfirm>,

                                        </Tooltip>
                                    </div>

                            }
                        </div>
                        <div className="my-3">
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
                                            <h4>{items?.length > 0 ? items?.[0].email : ""}</h4>
                                        </div>
                                        <div className=' w-[30%]'>
                                            <h6>Telegram:</h6>
                                            <h4>{items?.length > 0 ? items?.[0].telegram : ""}</h4>
                                        </div>
                                        <div className=' w-[30%]'>
                                            <h6>Phone number:</h6>
                                            <h4>{items?.length > 0 ? items?.[0].phone : ""}</h4>
                                        </div>
                                    </div>
                                    <div className='my-3 d-flex flex-col justify-center items-center'>
                                        <div className="w-[95%] my-3">
                                            <h6>Address uz:</h6>
                                            <p>{strAddress?.uz}</p>
                                        </div>
                                        <div className="w-[95%] my-3">
                                            <h6>Address ru:</h6>
                                            <p>{strAddress?.ru}</p>
                                        </div>
                                        <div className="w-[95%] my-3">
                                            <h6>Address en:</h6>
                                            <p>{strAddress?.en}</p>
                                        </div>
                                        <div className="w-[95%] my-3">
                                            <h6>About uz:</h6>
                                            <p>{strAbout.uz}</p>
                                        </div>
                                        <div className="w-[95%] my-3">
                                            <h6>About ru:</h6>
                                            <p>{strAbout.ru}</p>
                                        </div>
                                        <div className="w-[95%] my-3">
                                            <h6>About en:</h6>
                                            <p>{strAbout.en}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </ContainerAll>
    )
}

// navigate(`/info-update/${"id"}`)

export default index