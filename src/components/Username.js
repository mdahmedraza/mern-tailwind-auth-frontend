import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avtar from '../assets/profile.png';
import styles from '../styles/Username.module.css';

import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { usernameValidate } from '../helper/validate';
import {useAuthStore} from '../store/store';

export default function Username(){
    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername);

    const formik = useFormik({
        initialValues:{
            username: ''
        },
        validate:usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            setUsername(values.username)
            // console.log(values)
            navigate('/password');
        }
    })
    return(
        <div className="container mx-auto">
           <Toaster position='top-center' reverseOrder={false}></Toaster>
           <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold">hello agian...</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore more of connecting with us.
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img src={avtar} className={styles.profile_img} alt="avtar" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder="username" />
                            <button className={styles.btn} type='submit'>Let's go</button>
                        </div>
                        <div className="text-center py-4">
                            <span className='text-gray-500'>Not a Member <Link className='text-red-500' to='/register'>Register now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}