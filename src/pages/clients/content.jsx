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
            <div className="my-2 text-center">
                <h3>{contentModal?.data?.name}</h3>
            </div>
            <div className="my-2 w-full h-full">
                <img className="w-full h-full" src={`http://192.168.1.195:5055/partners/${contentModal?.data?.image}`} alt="" />
            </div>
        </Modal>
    )
}

export default content