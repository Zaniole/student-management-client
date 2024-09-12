import React, { useEffect, useState } from 'react'
import getMark from '../API/MarksApi'
import axios from 'axios';

const MarkDetails = ({ id, isEditing, isSubmit, setIsSubmit }) => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    getMark(id)
      .then(res => setMarks(res))
      .catch(err => console.log(err))
  }, [])

  // call update api
  useEffect(() => {
    if (isSubmit === true) {
      axios.put("http://localhost:3000/auth/update_marks/" + id, marks)
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
            <th>Điểm đầu vào</th>
            <th>Điểm học kì 1</th>
            <th>Điểm cả năm</th>
          </tr>
        </thead>
        <tbody>
          {isEditing ?
            (<tr>
              <td>
                <input
                  type="text"
                  defaultValue={marks.entrance_mark}
                  onChange={(e) => setMarks({ ...marks, entrance_mark: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={marks.semester_1_mark}
                  onChange={(e) => setMarks({ ...marks, semester_1_mark: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={marks.year_mark}
                  onChange={(e) => setMarks({ ...marks, year_mark: e.target.value })}
                />
              </td>
            </tr>
            ) : (
              <tr>
                <td>{marks.entrance_mark ? (marks.entrance_mark) : <span className='fst-italic'>Chưa có</span>}</td>
                <td>{marks.semester_1_mark ? (marks.semester_1_mark) : <span className='fst-italic'>Chưa có</span>}</td>
                <td>{marks.year_mark ? (marks.year_mark) : <span className='fst-italic'>Chưa có</span>}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default MarkDetails