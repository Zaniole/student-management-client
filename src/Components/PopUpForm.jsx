import React, { useEffect, useRef, useState } from 'react';
import getStudent from './API/StudentApi';
import addAbsent from './API/AbsentApi';
import axios from 'axios';
import "./styleForm.css"
import Toastify from './utils/Toastify';

const PopUpForm = ({ handleClose, show, id }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const [student, setStudent] = useState([])
    const formRef = useRef(null);

    useEffect(() => {
        getStudent(id)
            .then(res => setStudent(res))
            .catch(err => console.log(err))
    }, [])

    const [newAbsent, setNewAbsent] = useState({
        student_id: id,
        date: "",
        note: ""
    })

    const handleAddAbsent = (e) => {
        e.preventDefault();
        if(newAbsent.date === "" || newAbsent.note === ""){
            Toastify({message: "Vui lòng nhập đủ thông tin vắng", type: "error"});
        } else {
            axios.post("http://localhost:3000/auth/add_absent/", { newAbsent })
                .then(result => {
                    if (result.data.Status) {
                        handleClose();
                        formRef.current.reset();
                        setNewAbsent({ ...newAbsent, date: "", note: "" });
                        Toastify({message: "Thêm lượt vắng thành công!", type: "success"})
                    } else {
                        alert(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <button onClick={handleClose} className='btn btn-danger float-end'>Đóng</button>
                <form ref={formRef} onSubmit={handleAddAbsent}>
                    <div className='mb-3'>
                        <label htmlFor="name" className='mt-2' ><strong>Họ và tên: </strong>{student.name}</label>
                        <br></br>
                        <label htmlFor="class" className='mt-2'><strong>Lớp: </strong>{student.class_name}</label>
                        <br></br>
                        <label htmlFor="date" className='mt-2'><strong>Ngày vắng</strong></label>
                        <input type="date" name='date'
                            onChange={(e) => setNewAbsent({ ...newAbsent, date: e.target.value })}
                            className='form-control rounded-0 mt-2'
                        />
                        <label htmlFor="note" className='mt-2'><strong>Lí do:</strong></label>
                        <input type="text" name='note' placeholder='Nhập lí do vắng'
                            className='form-control rounded-0 mt-2'
                            onChange={(e) => setNewAbsent({ ...newAbsent, note: e.target.value })}
                        />
                    </div>
                    <button className='btn btn-success rounded-0 mb-2'>Thêm</button>
                </form>
            </section>
        </div>
    );
};

export default PopUpForm;