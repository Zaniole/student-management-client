import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ExportExcel from './utils/ExportExcel';

const Class = () => {
  const [classes, setClasses] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/auth/class')
      .then(result => {
        if (result.data.Status) {
          setClasses(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const filteredClass = useMemo(() => {
    return classes.filter(cl => {
      return cl.class_name.toLowerCase().includes(query.toLowerCase())
    })
  }, [classes, query])

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Danh sách lớp</h3>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center mb-3'>
          <Link
            to="/dashboard/addClass"
            className='btn btn-success me-2'
          >
            Thêm lớp
          </Link>
          <ExportExcel
            data={classes}
            fileName="DanhSachLop"
            sheetName="DanhSachLop"
          ></ExportExcel>
        </div>
        <div className='d-flex mb-3'>
          <input
            type='text'
            className='form-control me-2'
            placeholder='Nhập tên lớp...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>


      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Số thứ tự</th>
              <th>Tên lớp</th>
              <th>Số học sinh</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredClass.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{c.class_name}</td>
                  <td>{c.student_count}</td>
                  <td>
                    <Link to={`/dashboard/classDetail/` + c.id + `/` + c.class_name}
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

export default Class