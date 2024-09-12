import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExportExcel from './utils/ExportExcel';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/auth/absent')
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
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Quản lý điểm danh - Vắng</h3>
      </div>
      
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <ExportExcel data={students} fileName="DanhSachVang" sheetName="DanhSachVang"></ExportExcel>
        <div className='d-flex'>
          <input
            type='text'
            className='form-control me-2'
            placeholder='Nhập tên học sinh...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID học sinh</th>
              <th>Họ và tên</th>
              <th>Lớp</th>
              <th>Số buổi vắng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class_name}</td>
                <td>{student.absent_count}</td>
                <td>
                  <Link to={`/dashboard/absentDetail/`+ student.id}
                        className='btn btn-primary btn-sm me-2'
                  >
                    Xem chi tiết
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Attendance