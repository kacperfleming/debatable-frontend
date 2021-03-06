import {
  Snackbar,
} from "@material-ui/core";

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

interface Props {
    type?: 'error' | 'warning' | 'info' | 'success';
    message: string;
    open: boolean;
    timer?: number;
    onClose(): void;
};

const Notification = (props: Props) => (
    <Snackbar open={props.open} autoHideDuration={props.timer || 2000} onClose={props.onClose}>
        <Alert onClose={props.onClose} severity={props.type || 'info'}>
            {props.message}
        </Alert>
    </Snackbar>
);

export default Notification;
