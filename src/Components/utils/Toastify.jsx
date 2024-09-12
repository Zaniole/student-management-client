import React, {useEffect} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = ({ message, type }) => {
    const showToast = () => {
        toast[type](message, {
            autoClose: 2000
        });
    }
    
    showToast();

    return null
}

export default Toastify