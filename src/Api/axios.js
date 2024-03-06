import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-a1451/us-central1/api"
    // baseURL: "http://localhost:3001" 
    baseURL:"https://amazon-api-deploy-mjx1.onrender.com/"
});


export{axiosInstance}