import {ToastContainer, ToastContainerProps} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {FC} from "react";

type Props = ToastContainerProps;

export const Alert: FC<Props> = ({autoClose, hideProgressBar, draggable, position, ...restProps}) => {
    return (
        <ToastContainer
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            draggable={draggable}
            {...restProps}
        />
    )
}

Alert.defaultProps = {
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: true,
    position: "top-right"
}
