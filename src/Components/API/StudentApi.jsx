import axios from "axios";

const getStudent = (id) => {
    return axios.get('http://localhost:3000/auth/student/'+id)
      .then(result => {
        if (result.data.Status) {
          return (result.data.Result[0]);
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
}

export default getStudent;