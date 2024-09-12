import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './studentStyle.css'
import ExportExcel from './utils/ExportExcel';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/auth/student')
      .then(result => {
        if (result.data.Status) {
          setStudents(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      return student.name.toLowerCase().includes(query.toLowerCase())
    })
  }, [students, query])

  return (
    <div className='px-5 mt-3 content-container'>
      <div className='d-flex justify-content-center'>
        <h3>Danh sách học sinh</h3>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center mb-3'>
          <Link
            to="/dashboard/addStudent"
            className='btn btn-success me-2'
          >
            Thêm học sinh
          </Link>
          <ExportExcel
            data={students}
            fileName="DanhSachHocSinh"
            sheetName="DanhSachHocSinh"
          ></ExportExcel>
        </div>
        <div>
          <input
            type='text'
            className='form-control me-2'
            placeholder='Nhập tên học sinh...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          >
          </input>
        </div>
      </div>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID học sinh</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
              <th>Thông tin học tập</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.class_name}</td>
                  <td>
                    <Link to={`/dashboard/studentDetail/` + student.id}
                      className='btn btn-primary btn-sm me-2'
                    >
                      Xem chi tiết
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Student