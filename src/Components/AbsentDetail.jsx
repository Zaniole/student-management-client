import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormatDate from './utils/FormatDate';
import { deleteAbsent, getAbsent } from './API/AbsentApi.jsx';
import getStudent from './API/StudentApi.jsx';
import PopUpForm from './PopUpForm.jsx';
import "./styleForm.css"

const AbsentDetail = () => {
    const [student, setStudent] = useState([]);
    const [absents, setAbsents] = useState([]);
    const { id } = useParams();
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };

    useEffect(() => {
        getStudent(id)
            .then(res => setStudent(res))
            .catch(err => console.log(err))

        getAbsent(id)
            .then(res => { setAbsents(res) })
            .catch(err => { console.log(err) })
    }, [show])

    const handleDelete = (absentId) => {
        deleteAbsent(absentId);
    }

    const handleEdit = () => {
    }

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Quản lý điểm danh - Vắng</h3>
            </div>
            <div>
                <button type="button" className='btn btn-success' onClick={showModal}>
                    Thêm lượt vắng
                </button>
                <PopUpForm show={show} handleClose={hideModal} id={id} />
            </div>
            <div className='d-flex justify-content-center'>
                <div className="card shadow-sm mt-2" style={{ width: 18 + 'rem' }}>
                    <div className="card-header text-center">
                        <h4>{student.name}</h4>
                    </div>
                    <div className="card-body">
                        <p className="mb-0"><strong className="pr-1">ID học sinh: </strong>{student.id}</p>
                        <p className="mb-0"><strong className="pr-1">Lớp: </strong>{student.class_name}</p>
                    </div>
                </div>
            </div>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Ngày vắng</th>
                            <th>Lí do</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    {absents.map((a, index) => (
                        <tbody key={index}>
                            <tr >
                                <td>{FormatDate(a.date)}</td>
                                <td>{a.note}</td>
                                <td>
                                    <button onClick={handleEdit} className='btn btn-primary btn-sm me-2'>
                                        Sửa
                                    </button>
                                    <button onClick={() => handleDelete(a.id)} className='btn btn-sm btn-danger'>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>



        </div>
    )
}

export default AbsentDetail