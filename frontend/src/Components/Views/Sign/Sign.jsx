import { useState } from 'react';
import classes from './Sign.module.css';
import SignUp from '../../UI/SignUp/SignUp';
import SignIn from '../../UI/SignIn/SignIn';

export default function Sign() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className={"container-fluid mt-5 py-5 " + classes.bg}>
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-12 col-md-8 col-lg-6">
                    {
                        isLogin ?
                            <SignIn />
                            :
                            <SignUp />
                    }
                    {
                        isLogin ?
                            <p className='small mt-5'>Not a user? <button onClick={() => setIsLogin(!isLogin)} className='btn btn-outline-info'>
                                register now!</button>
                            </p> :
                            <p className='small mt-5'>already a user? <button onClick={() => setIsLogin(!isLogin)} className='btn btn-outline-info'>
                                login now!</button>
                            </p>
                    }

                </div>
            </div>
        </div>
    )
}
