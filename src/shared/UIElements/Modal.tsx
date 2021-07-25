import {Modal, Backdrop, Card, Button, Typography} from '@material-ui/core';

type props = {
    open: boolean;
    onClose: () => void;
    title: string;
}

const CustomModal = (props:props) => {

    return (
        <Backdrop open={props.open}>
            <Modal open={props.open} onClose={props.onClose}>
                <Card component="dialog">

                </Card>
            </Modal>
        </Backdrop>
    )
}

export default CustomModal;