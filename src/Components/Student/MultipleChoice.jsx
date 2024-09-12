import React, { useState, useEffect } from 'react'
import { getMultipleChoice } from '../API/MarksApi'
import axios from 'axios';

const MultipleChoice = ({ id, isEditing, isSubmit, setIsSubmit }) => {
    const [multi, setMulti] = useState([]);

    useEffect(() => {
        getMultipleChoice(id)
            .then(res => setMulti(res))
            .catch(err => console.log(err))
    }, [])

    //call update api
    useEffect(() => {
        if (isSubmit === true) {
          axios.put("http://localhost:3000/auth/update_multiple_choice/" + id, multi)
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
                                    defaultValue={multi.first}
                                    onChange={(e) => setMulti({...multi, first: e.target.value})}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={multi.second}
                                    onChange={(e) => setMulti({...multi, second: e.target.value})}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={multi.third}
                                    onChange={(e) => setMulti({...multi, third: e.target.value})}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={multi.fourth}
                                    onChange={(e) => setMulti({...multi, fourth: e.target.value})}
                                />
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td>{multi.first ? (multi.first) : <span className='fst-italic'>Chưa có</span>}</td>
                            <td>{multi.second ? (multi.second) : <span className='fst-italic'>Chưa có</span>}</td>
                            <td>{multi.third ? (multi.third) : <span className='fst-italic'>Chưa có</span>}</td>
                            <td>{multi.fourth ? (multi.fourth) : <span className='fst-italic'>Chưa có</span>}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MultipleChoice