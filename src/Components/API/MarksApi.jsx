import axios from "axios";

export const getMark = (id) => {
    return axios.get("http://localhost:3000/auth/get_marks/" + id)
        .then(result => result.data.Result[0])
        .catch(err => console.log(err));
}

export const getBasicSkills = (id) => {
    return axios.get("http://localhost:3000/auth/get_skills/" + id)
    .then(res => res.data.Result[0])
    .catch(err => console.log(err))
}

export const getMultipleChoice = (id) => {
    return axios.get("http://localhost:3000/auth/get_multiple_choice/" + id)
    .then(res => res.data.Result[0])
    .catch(err => console.log(err))
}

export const getEssay = (id) => {
    return axios.get("http://localhost:3000/auth/get_essay/" + id)
    .then(res => res.data.Result[0])
    .catch(err => console.log(err))
}

export default getMark;