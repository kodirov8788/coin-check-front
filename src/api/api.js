import axios from "axios";

const Api = axios.create({
    // baseURL: 'https://coin21.uz'
    // baseURL: 'http://localhost:5001'
    baseURL: 'https://coin-project.onrender.com'

});

export default Api

