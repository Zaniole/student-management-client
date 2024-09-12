import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toastify from '../utils/Toastify';

const AddStudent = () => {
    const [className, setClassName] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: "",
        class_id: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/class')
            .then(result => {
                if (result.data.Status) {
                    setClassName(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (newStudent.name.trim() === "" || newStudent.class_id === "") {
            Toastify({ message: "Vui lòng nhập đủ thông tin", type: "warning" });
        } else {
            axios.post('http://localhost:3000/auth/add_student', newStudent)
                .then(result => {
                    console.log(result.data);
                    if (result.data.Status) {
                        navigate('/dashboard/student')
                        Toastify({ message: "Thêm học sinh thành công!", type: "success" });
                    } else {
                        console.log(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Thêm học sinh</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Họ và tên:</strong></label>
                        <input type="text" name='name' placeholder='Nhập tên lớp'
                            className='form-control rounded-0'
                            onChange={(e) =>
                                setNewStudent({ ...newStudent, name: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="class"><strong>Lớp</strong></label>
                        <select name='class' id='class'
                            className="form-select"
                            defaultValue={'default'}
                            onChange={(e) => setNewStudent({ ...newStudent, class_id: e.target.value })}
                        >
                            <option value="default" disabled>
                                Chọn lớp
                            </option>
                            {className.map(c => {
                                return <option key={c.id} value={c.id}>{c.class_name}</option>
                            })}
                        </select>
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Thêm</button>
                </form>
            </div>
        </div>
    )
}

export default AddStudent