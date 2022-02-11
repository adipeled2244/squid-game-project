
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './signupLogin.css'

export function SignUpLogin({ user, funcToUpdate }) {

    const [mode, setMode] = useState('login');
    const [loginUser, setLoginUser] = useState({ userName: '', password: '' });
    const [nextSignup, setNextSignup] = useState(false);
    const [checkBoxInput, setCheckBoxInput] = useState(true);
    const [signupUser, setSignupUser] = useState({
        userName: '',
        password: '',
        age: '',
        country: '',
        color: 'blue',
        reasonForPlaying: '',
        shape: ''
    });

    const handleChangeInput = ({ target }) => {

        const field = target.name;
        const value = target.value;
        if (mode == 'signup') {
            setSignupUser(prevUser => ({ ...prevUser, [field]: value }));
        }
        if (mode == 'login') {
            setLoginUser(prevUser => ({ ...prevUser, [field]: value }))
        }
    }

    const handleChangeInputCheckBox = async (e) => {
        let chosenColor = e.target.checked ? 'blue' : 'red';
        console.log(chosenColor)
        await setSignupUser(prevUser => ({ ...prevUser, color: chosenColor }));
        await setCheckBoxInput(e.target.checked);
        console.log('blaaaaaaaaaaaaaa')
        console.log(signupUser);
    }

    const changeMode = (toMode) => {
        toMode == 'login' ? setMode('login') : setMode('signup')
    }

    const notifyError = (txt) => toast.error(txt);

    const getNextSignupPage = () => {
        if (signupUser.userName && signupUser.password && signupUser.age && signupUser.country) {
            console.log('next page', signupUser);
            setNextSignup(true);
        }
        else {
            if (!signupUser.userName) { notifyError('User name is required') }
            else if (!signupUser.password) { notifyError('Password is required') }
            else if (!signupUser.age) { notifyError('Age is required') }
            else if (!signupUser.country) { notifyError('Country is required') }
        }
    }

    if (mode == 'login') {
        return <><div className='signup-login'>
            <div className="container">
                <div className="top"></div>
                <div className="bottom"></div>
                <div className="center">
                    <div className="title">
                        <h2>Login</h2>
                        <button onClick={() => { changeMode('signup') }} className='btn-signup'>Sign Up</button>
                    </div>
                    <input type="text" onChange={handleChangeInput} value={loginUser.userName} name='userName' placeholder="username" />
                    <input type="password" onChange={handleChangeInput} value={loginUser.password} name='password' placeholder="password" />
                    <h2>&nbsp;</h2>
                    <button className='btn-login-send'>Login</button>
                </div>
            </div>

        </div>
            <ToastContainer /></>
    }
    else if (mode == 'signup') {
        if (!nextSignup) {
            return <><div className='signup-login'>
                <div className="container" >
                    <div className="top"></div>
                    <div className="bottom"></div>
                    <div className="center">
                        <div className="title">
                            <button onClick={() => { changeMode('login') }} className='btn-signup'>Login </button>
                            <h2>Sign Up</h2>
                        </div>
                        <input type="text" onChange={handleChangeInput} value={signupUser.userName} name='userName' placeholder="username" />
                        <input type="password" onChange={handleChangeInput} value={signupUser.password} name='password' placeholder="password" />
                        <input type="number" onChange={handleChangeInput} value={signupUser.age} name='age' min='18' placeholder="age" />
                        <input type="text" onChange={handleChangeInput} value={signupUser.country} name='country' placeholder="country" />
                        <label className={`onoffbtn ${checkBoxInput ? ' active' : ''}`}><input type="checkbox" onChange={handleChangeInputCheckBox} /></label>
                        <h2>&nbsp;</h2>
                        <button className='btn-login-send' onClick={getNextSignupPage}>Next&nbsp; &#10148; </button>
                    </div>
                </div>
            </div>
                <ToastContainer /></>
        }

        else {
            return <><div className='signup-login'>
                <div className="container" >
                    <div className="top"></div>
                    <div className="bottom"></div>
                    <div className="center">
                        <div className="title">
                            {/* <button onClick={() => { changeMode('login') }} className='btn-signup'>Login </button> */}
                            <h2>Sign Up</h2>
                        </div>
                        {signupUser.color == 'blue' && <input type='text' onChange={handleChangeInput} value={signupUser.reasonForPlaying} name="reasonForPlaying" placeholder="Reason For Playing" />}
                        {signupUser.color == 'red' &&
                            <select className='shape-select' onChange={handleChangeInput} name="shape">
                                <option className="value-select"value="circle">&#9711; &nbsp;Circle</option>
                                <option className="value-select"value="rectangel">&#9744; &nbsp;Rectangle</option>
                                <option className="value-select"value="triangle">&#9651; &nbsp;Triangle</option>
                            </select>
                        }
                        <h2>&nbsp;</h2>
                        <button className='btn-login-send'>Sign Up</button>
                    </div>
                </div>
            </div>
                <ToastContainer /></>

        }
    }
}


// 
{/* <input type="text" placeholder="Reason for Playing" />
<input type="text" placeholder="shape" />
 */}
