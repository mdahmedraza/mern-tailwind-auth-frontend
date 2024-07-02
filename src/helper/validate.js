import toast from 'react-hot-toast';
import {authenticate} from './helper';

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    if(values.username){
        // check user exists or not...
        const {status} = await authenticate(values.username);
        if(status !== 200){
            errors.exist = toast.error('user does not exist...!')
        }
    }
    return errors;
}
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("password not match....!");
        return errors;
    }
}
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    return errors;
}
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}

function usernameVerify(error={}, values){
    if(!values.username){
        error.username = toast.error('Username required....!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username....!')
    }
    return error;
}
function passwordVerify(errors={}, values){
    const specialChars = /[`!@#%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if(!values.password){
        errors.password = toast.error("password required....");
    }else if(values.password.includes(" ")){
        errors.password = toast.error("wrong password.....");
    }else if(values.password.length<4){
        errors.password = toast.error("password must be four characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("password must have special characters.....")
    }
    return errors;
}
function emailVerify(error={}, values){
    if(!values.email){
        error.email = toast.error("email required....!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("wrong email....")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("invalid email address.....")
    }
    return error;
}