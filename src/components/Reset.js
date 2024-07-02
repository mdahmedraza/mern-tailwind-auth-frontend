import React from 'react';
import styles from '../styles/Username.module.css';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { resetPasswordValidation } from '../helper/validate';
import {resetPassword} from '../helper/helper';
import {useAuthStore} from '../store/store';
import {useNavigate} from 'react-router-dom';

export default function Reset(){
    const {username} = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            password: 'admin@123',
            confirm_pwd: 'admin@123'
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            // console.log(values)
            let resetPromise = resetPassword({username, password: values.password})
            toast.promise(resetPromise, {
                loading: 'Updating...',
                success: <b>Reset Successfully...</b>,
                error: <b>Could not Reset...</b>
            })
            resetPromise.then(function(){navigate('/password')})
        }
    })
    return(
        <div className="container mx-auto">
           <Toaster position='top-center' reverseOrder={false}></Toaster>
           <div className="flex justify-center items-center h-screen">
                <div className={styles.glass} style={{width: "50%"}}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Reset</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter new Password.
                        </span>
                    </div>
                    <form className="py-20" onSubmit={formik.handleSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder="new password" />
                            <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder="repeat password" />
                            <button className={styles.btn} type='submit'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}