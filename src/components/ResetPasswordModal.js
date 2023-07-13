import React,{useState} from 'react'

const ResetPasswordModal = () => {
    return (
        <Modal
            title="Second Modal"
            open={secondModalVisible}
            onCancel={handleSecondModalClose}
            onOk={null}
        >
            <p>This is the content of the second modal.</p>
            <p>You can add any React components or text here.</p>
        </Modal>
    )
}

export default ResetPasswordModal