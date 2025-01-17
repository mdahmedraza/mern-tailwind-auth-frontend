import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// make api request...

// to get username from token...
// in client terminal 'npm i jwt-decode'...
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("cannot find token")
    let decode = jwt_decode(token);
    // console.log(decode);
    return decode;
}

// authenticate function...
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate', {username})
    }catch(error){
        return {error: "username doesn't exist...."}
    }
}

// get user details...
export async function getUser({username}){
    try{
        const {data} = await axios.get(`/api/user/${username}`);
        return {data};
    }catch(error){
        return {error: "password doesn't match..."}
    }
}

// register user function....
export async function registerUser(credentials){
    try{
        const { data : {msg}, status} = await axios.post(`/api/register`, credentials);
        let {username, email} = credentials;
        // send mail
        if(status === 201){
            await axios.post('/api/registerMail', {username, userEmail: email, text: msg})
        }
        return Promise.resolve(msg)
    }catch(error){
        return Promise.reject({error})
    }
}

// login function...
export async function verifyPassword({username, password}){
    try{
        if(username){
            const {data} = await axios.post('/api/login', {username, password})
            return Promise.resolve({data});
        }
    }catch(error){
        return Promise.reject({error: "password doesn't match"})
    }
}

// update user profile function...
export async function updateUser(response){
    try{
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, {headers:{"Authorization": `Bearer ${token}`}})
        return Promise.resolve({data})
    }catch(error){
        return Promise.reject({error: "couldn't update profile..."})
    }
}

// generate otp....
export async function generateOTP(username){
    try{
        const {data:{code}, status} = await axios.get('/api/generateOTP', {params: {username}})
        // send mail with the OTP
        if(status === 201){
            let {data:{email}} = await getUser({username});
            let text = `your password recovery otp is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail',{username, userEmail:email, text, subject: "password recovery otp"})
        }
        return Promise.resolve(code);
    }catch(error){
        return Promise.reject({error});
    }
}

// verify otp...
export async function verifyOTP({username, code}){
    try{
        const {data, status} = await axios.get('/api/verifyOTP', {params:{username, code}})
        return {data, status}
    }catch(error){
        return Promise.reject(error)
    }
}

// reset password...
export async function resetPassword({username, password}){
    try{
        const {data, status}=await axios.put('/api/resetPassword', {username, password});
        return Promise.resolve({data, status})
    }catch(error){
        return Promise.reject({error})
    }
}