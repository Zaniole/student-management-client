import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getClassDetail from '../API/ClassDetailApi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Student from '../Student';

const ClassDetail = () => {
  const { id, className } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getClassDetail(id)
      .then(res => setStudents(res))
      .catch(err => console.log(err))

  }, [])

  return (
    <div className='px-4 mt-3'>
      <div>
        <h4>
          Chi tiết lớp: <strong>{className}</strong>
        </h4>
      </div>
      <div>
        <table className='table table-bordered container table-hover'>
          <thead className='table table-success'>
            <tr>
              <th rowSpan={2} className='text-center align-middle col-sm-1'>STT</th>
              <th rowSpan={2} className='text-center align-middle col-sm-1'>ID</th>
              <th rowSpan={2} className='text-center align-middle col-sm-4'>Họ và tên</th>
              <th colSpan={3} className='text-center align-middle col-sm-3'>Điểm</th>
              <th rowSpan={2} className='text-center align-middle col-sm-3'>Nhận xét các kĩ năng</th>
            </tr>
            <tr>
              <th className='text-center'>Đầu vào</th>
              <th className='text-center'>Học kì I</th>
              <th className='text-center'>Cả năm</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.entrance_mark ? (student.entrance_mark) : (<p className='fst-italic'>Chưa có</p>)}</td>
                <td>{student.semester_1_mark ? (student.semester_1_mark) : (<p className='fst-italic'>Chưa có</p>)}</td>
                <td>{student.year_mark ? (student.year_mark) : (<p className='fst-italic'>Chưa có</p>)}</td>
                <td className='text-center'>
                  <Link to={`/dashboard/studentDetail/` + student.id  }
                    className='btn btn-primary btn-sm me-2'
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table></div>

    </div>
  );
};


export default ClassDetail