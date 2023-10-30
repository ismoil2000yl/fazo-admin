import { Modal } from 'antd'
import React from 'react'

const content = ({ contentModal, setContentModal }) => {

    return (
        <Modal
            title={"Ma'lumotni ko'rish"}
            open={contentModal.isOpen}
            footer={false}
            onCancel={() => setContentModal({ isOpen: false, data: null })}
        >
            <div className="mt-3">
                <p className='font-bold	p-0 m-0'>Manzil:</p> <br />
                <p className="p-0 m-0">{contentModal?.data?.address}</p>
            </div>
            <div className="mt-3">
                <p className='font-bold	p-0 m-0'>Kompaniya xaqida:</p> <br />
                <p className="p-0 m-0">{contentModal?.data?.about}</p>
            </div>
            <div className="mt-3">
                <p className='font-bold	p-0 m-0'>Email:</p> <br />
                <p className="p-0 m-0">{contentModal?.data?.email}</p>
            </div>
            <div className="mt-3">
                <p className='font-bold	p-0 m-0'>Telegram:</p> <br />
                <p className="p-0 m-0">{contentModal?.data?.telegram}</p>
            </div>
            <div className="mt-3">
                <p className='font-bold	p-0 m-0'>Telefon:</p> <br />
                <p className="p-0 m-0">{contentModal?.data?.phone}</p>
            </div>
        </Modal>
    )
}

export default content