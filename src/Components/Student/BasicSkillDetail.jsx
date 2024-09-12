import React from 'react'
import { getBasicSkills } from '../API/MarksApi.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';

const BasicSkillDetail = ({ id, isEditing, isSubmit, setIsSubmit }) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getBasicSkills(id)
            .then(res => setSkills(res))
            .catch(err => console.log(err))
    }, [])

    // call update api
    useEffect(() => {
        if (isSubmit === true) {
            axios.put("http://localhost:3000/auth/update_basic_skills/" + id, skills)
                .then(res => {
                    console.log(res)
                    setIsSubmit(false)
                })
                .catch(err => console.log(err))
        }
    }, [isSubmit])

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <table className='table table-borderless'>
                <thead>
                    <tr>
                        <th>Kỹ năng nghe</th>
                        <th>Kỹ năng nói</th>
                        <th>Kỹ năng đọc</th>
                        <th>Kỹ năng viết</th>
                    </tr>
                </thead>
                <tbody>
                    {isEditing ? (
                        <tr>
                            <td>
                                <input 
                                    type='text'
                                    defaultValue={skills.listening}
                                    onChange={(e) => setSkills({ ...skills, listening: e.target.value })}
                                />
                            </td>
                            <td>
                                <input 
                                    type='text'
                                    defaultValue={skills.speaking}
                                    onChange={(e) => setSkills({ ...skills, speaking: e.target.value })}
                                />
                            </td>
                            <td>
                                <input 
                                    type='text'
                                    defaultValue={skills.reading}
                                    onChange={(e) => setSkills({ ...skills, reading: e.target.value })}
                                />
                            </td>
                            <td>
                                <input 
                                    type='text'
                                    defaultValue={skills.writing}
                                    onChange={(e) => setSkills({ ...skills, writing: e.target.value })}
                                />
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td>{skills.listening ? (skills.listening) : (<span className='fst-italic'>Chưa có</span>)}</td>
                            <td>{skills.speaking ? (skills.speaking) : (<span className='fst-italic'>Chưa có</span>)}</td>
                            <td>{skills.reading ? (skills.reading) : (<span className='fst-italic'>Chưa có</span>)}</td>
                            <td>{skills.writing ? (skills.writing) : (<span className='fst-italic'>Chưa có</span>)}</td>
                        </tr>
                    )}
                </tbody>
            </table >
            {/* <button className='btn btn-success d-flex ms-2' onClick={handleEdit}>
                <i className="bi bi-pencil-square me-1"></i>
                {isEditing ? 'Lưu' : 'Sửa'}
            </button> */}

        </div >

    )
}

export default BasicSkillDetail