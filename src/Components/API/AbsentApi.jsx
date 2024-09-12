import axios from "axios"

export const deleteAbsent = (id) => {
    axios.delete("http://localhost:3000/auth/delete_absent/" + id)
        .then(result => {
            if (result.data.Status) {
                window.location.reload()
            } else {
                alert(result.data.Error)
            }
        });
}

export const getAbsent = (id) => {
    return axios.get('http://localhost:3000/auth/absent/' + id)
        .then(res => res.data.Result)
        .catch(err => console.log(err))
}

export const addAbsent = ({newAbsent}) => {
    try {
        axios.post("http://localhost:3000/auth/add_absent/", newAbsent)
        .then(result => {
            if (result.data.Status) {
                alert("Thêm thành công");
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => alert(err))
    } catch (error) {
        alert(error)
    }
    
}

export default deleteAbsent;