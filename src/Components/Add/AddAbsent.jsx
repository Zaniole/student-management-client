import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddAbsent = () => {
    const [absent, setAbsent] = useState({
        studentName: "",
        

    });

    useEffect(() => {
        axios.get('http://localhost:3000/auth/add_absent')
            .then(result => {
                if (result.data.Status) {
                    //setStudents(result.data.Result);
                    console.log(result.data.result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_absent', absent)
        .then(result => {
            console.log(result.data);
            if(result.data.Status) {
                navigate('/dashboard/student')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-25 border'>
                <h2>Thêm lượt vắng</h2>
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
                            onChange={(e) => setNewStudent({ ...newStudent, class_id: e.target.value })}
                        >
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

export default AddAbsent