import axios from "axios";

export default axios.create({
    baseURL: 'http://10.168.1.200:8080',
})