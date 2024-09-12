import React, { useState, useEffect } from 'react'
import { getEssay } from '../API/MarksApi'
import axios from 'axios';

const EssayDetails = ({ id, isEditing, isSubmit, setIsSubmit }) => {
    const [essay, setEssay] = useState([]);

    useEffect(() => {
        getEssay(id)
            .then(res => setEssay(res))
            .catch(err => console.log(err))
    }, [])

    // call update api
    useEffect(() => {
        if (isSubmit === true) {
            axios.put("http://localhost:3000/auth/update_essay/" + id, essay)
                .then(res => {
                    console.log(res)
                    setIsSubmit(false)
                })
                .catch(err => console.log(err))
        }
    }, [isSubmit])


    return (
        <>
            <table className='table table-borderless'>
                <thead>
                    <tr>
                        <th>Lần 1</th>
                        <th>Lần 2</th>
                        <th>Lần 3</th>
                        <th>Lần 4</th>
                    </tr>
                </thead>
                <tbody>
                    {isEditing ?
                        (<tr>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={essay.first}
                                    onChange={(e) => setEssay({ ...essay, first: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={essay.second}
                                    onChange={(e) => setEssay({ ...essay, second: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={essay.third}
                                    onChange={(e) => setEssay({ ...essay, third: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={essay.fourth}
                                    onChange={(e) => setEssay({ ...essay, fourth: e.target.value })}
                                />
                            </td>
                        </tr>
                        ) : (
                            <tr>
                                <td>{essay.first ? (essay.first) : <span className='fst-italic'>Chưa có</span>}</td>
                                <td>{essay.second ? (essay.second) : <span className='fst-italic'>Chưa có</span>}</td>
                                <td>{essay.third ? (essay.third) : <span className='fst-italic'>Chưa có</span>}</td>
                                <td>{essay.fourth ? (essay.fourth) : <span className='fst-italic'>Chưa có</span>}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table >

        </>
    )
}

export default EssayDetails