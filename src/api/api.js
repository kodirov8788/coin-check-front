import axios from "axios";


// const instance = axios.create({
//     baseURL: 'http://localhost:5000'
// });
// const instance = axios.create({
//     baseURL: 'https://coin-project.onrender.com'
// });
const Api = axios.create({
    baseURL: 'https://coin21.uz'
    // baseURL: 'http://localhost:5000'
});

export default Api

