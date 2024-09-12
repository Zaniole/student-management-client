import axios from "axios";

const getClassDetail = (id) => {
    return axios.get('http://localhost:3000/auth/class/' + id)
        .then(result => {
            if (result.data.Status) {
                return (result.data.Result)
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
}

export default getClassDetail