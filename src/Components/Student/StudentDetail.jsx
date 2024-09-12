import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import "./style.css"
import MarkDetails from './MarkDetails.jsx'
import { useEffect } from 'react'
import BasicSkillDetail from './BasicSkillDetail.jsx'
import getStudent from '../API/StudentApi.jsx'
import MultipleChoice from './MultipleChoice.jsx'
import EssayDetails from './EssayDetails.jsx'

const StudentDetail = () => {
    const [student, setStudent] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getStudent(id)
            .then(res => setStudent(res)
            )
            .catch(err => console.log(err))    
    }, [])

    const handleEdit = () => {
        setIsSubmit(false)
        setIsEditing((preIsEditing) => !preIsEditing);
    }

    const handleSubmit = () => {
        setIsSubmit(true)
        setIsEditing((preIsEditing) => !preIsEditing);
    }

    return (
        <div className="student-profile py-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="card shadow-sm">
                            <div className="card-header bg-transparent text-center">
                                <h3>{student.name}</h3>
                            </div>
                            <div className="card-body">
                                <p className="mb-0"><strong className="pr-1">ID học sinh: </strong>{student.id}</p>
                                <p className="mb-0"><strong className="pr-1">Lớp: </strong>{student.class_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10 mt-2">
                        <div className="card shadow-sm">
                            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
                                <h3 className="mb-0">Thông tin học tập</h3>
                                {isEditing ?
                                    <button 
                                        className='btn btn-success d-flex ms-2' 
                                        onClick={handleSubmit}>
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Lưu
                                    </button>
                                    :
                                    <button 
                                        className='btn btn-success d-flex ms-2' 
                                        onClick={handleEdit}>
                                        <i className="bi bi-pencil-square me-1"></i>
                                        Sửa thông tin học tập
                                    </button>
                                }
                            </div>
                            <div className="card-body pt-0">
                                <table className="table table-bordered border-success">
                                    <thead>
                                        <tr>
                                            <th>Thông tin</th>
                                            <th>Chi tiết điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th width="25%">Điểm</th>
                                            <td><MarkDetails id={id} isEditing={isEditing} isSubmit={isSubmit} setIsSubmit={setIsSubmit} /></td>
                                        </tr>
                                        <tr>
                                            <th width="25%">Kĩ năng cơ bản	</th>
                                            <td><BasicSkillDetail id={id} isEditing={isEditing} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/></td>
                                        </tr>
                                        <tr>
                                            <th width="25%">Kĩ năng làm bài trắc nghiệm</th>
                                            <td><MultipleChoice id={id} isEditing={isEditing} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/></td>
                                        </tr>
                                        <tr>
                                            <th width="25%">Kĩ năng làm bài tự luận</th>
                                            <td><EssayDetails id={id} isEditing={isEditing} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/></td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StudentDetail