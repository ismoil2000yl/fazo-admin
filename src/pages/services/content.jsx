import { Modal } from 'antd'
import React from 'react'

const content = ({ contentModal, setContentModal }) => {
    const strTitle = JSON.parse(contentModal?.data?.title ? contentModal.data.title : "{}")
    const strDesc = JSON.parse(contentModal?.data?.desc ? contentModal.data.desc : "{}")

    return (
        <Modal
            title={"Ma'lumotni ko'rish"}
            open={contentModal.isOpen}
            footer={false}
            onCancel={() => setContentModal({ isOpen: false, data: null })}
        >
            <div className='w-full h-full'>
                <img className='w-full h-full' src={`http://192.168.1.195:5055/services/${contentModal?.data?.image}`} alt="" />
            </div>
            <div className="my-2 text-center gap-4 d-flex justify-center items-center flex-wrap w-[95%]">
                <div>
                    <h6>title uz:</h6>
                    <h4 className='tracking-wider'>{strTitle?.uz}</h4>
                </div>
                <div>
                    <h6>title ru:</h6>
                    <h4 className='tracking-wider'>{strTitle?.ru}</h4>
                </div>
                <div>
                    <h6>title en:</h6>
                    <h4 className='tracking-wider'>{strTitle?.en}</h4>
                </div>
            </div>
            <div className="my-2 gap-4 d-flex flex-col justify-center items-start w-[95%]">
                <div>
                    <h6>Description uz</h6>
                    <p className='text-base tracking-wider'>{strDesc?.uz}</p>
                </div>
                <div>
                    <h6>Description ru</h6>
                    <p className='text-base tracking-wider'>{strDesc?.ru}</p>
                </div>
                <div>
                    <h6>Description en</h6>
                    <p className='text-base tracking-wider'>{strDesc?.en}</p>
                </div>
            </div>
        </Modal>
    )
}

export default content