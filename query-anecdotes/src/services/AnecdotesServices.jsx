import axios from "axios";
const baseURL = "http://localhost:3000/anecdotes/"

export const getAnecdotes = () =>{
    return axios.get(baseURL).then(res => res.data)
 
}

export const postAnecdotes = (data) =>{
    return axios.post(baseURL,data).then(res => res.data)
}

export const putAnecdotes = (data) =>{
    return axios.put(baseURL+data.id,data)
}