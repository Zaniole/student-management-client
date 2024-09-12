import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Toastify from '../utils/Toastify';

const AddClass = () => {
    const [newClass, setNewClass] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        if (newClass === "") {
            Toastify({message: "Vui lòng nhập tên lớp", type: "error"})
        } else {
            axios.post('http://localhost:3000/auth/add_class', { newClass })
                .then(result => {
                    if (result.data.Status) {
                        navigate('/dashboard/class')
                        Toastify({message: "Thêm lớp mới thành công!", type: "success"})
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Thêm lớp</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="class"><strong>Lớp:</strong></label>
                        <input type="text" name='class' placeholder='Nhập tên lớp'
                            className='form-control rounded-0'
                            onChange={(e) => setNewClass(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Thêm</button>
                </form>
            </div>
        </div>
    )
}

export default AddClass