import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Home = () => {
  const [classes, setClasses] = useState([]);

  const data = {
    labels: classes.map(cl => cl.class_name),
    datasets: [
      {
        label: 'Số Học Sinh',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: classes.map(cl => cl.student_count), 
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true, 
  };

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
      
    console.log(classes)
    }, [])


  return (
    <div className='mt-2 ms-2'>
      <div>
        <h4>Thống kê số học sinh</h4>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};


export default Home