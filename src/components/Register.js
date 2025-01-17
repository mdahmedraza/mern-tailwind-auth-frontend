import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from '../styles/Username.module.css';
import avtar from '../assets/profile.png';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import {registerUser} from '../helper/helper';

export default function Register(){
    const navigate = useNavigate();
    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues:{
            email: 'ahmed@test.com',
            username: 'lonelyboy23',
            password: 'admin@123'
        },
        validate:registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, {profile : file || ''})
            // console.log(values)
            let registerPromise = registerUser(values)
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: <b>Register Successfully...</b>,
                error: <b>Could not Register..</b>
            })
            registerPromise.then(function(){navigate('/')});
        }
    })
    //formik don't support file upload...
    const onUpload = async e =>{
        const base64= await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
    return(
        <div className="container mx-auto">
           <Toaster position='top-center' reverseOrder={false}></Toaster>
           <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Register</h4>
                        <span className="py-1 text-xl w-2/3 text-center text-gray-500">
                            Happy to join you!
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-1'>
                            <label htmlFor='profile'>
                                <img src={file || avtar} className={styles.profile_img} alt="avtar" />
                            </label>
                            <input onChange={onUpload} type="file" id='profile' name='profile' />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder="email*" />
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="username*" />
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="password*" />
                            <button className={styles.btn} type='submit'>Register</button>
                        </div>
                        <div className="text-center py-1">
                            <span className='text-gray-500'>Already Register? <Link className='text-red-500' to='/'>Login now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}