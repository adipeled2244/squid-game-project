
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signupLogin.css'

const BASE_URL =  window.location.origin;

export function SignUpLogin({ onSignup,onLogin }) {

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
        shape: 'circle'
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
        await setSignupUser(prevUser => ({ ...prevUser, color: chosenColor }));
        await setCheckBoxInput(e.target.checked);
    }

    const changeMode = (toMode) => {
        toMode == 'login' ? setMode('login') : setMode('signup')
    }

    const notifyError = (txt) => toast.error(txt);

    const checkValidUserName = async () => {

        let isNameExistResponse;
        try{
           isNameExistResponse = await fetch(`${BASE_URL}/api/users/names/${signupUser.userName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            if (isNameExistResponse.status === 400) {
                notifyError('userName is already exist')
                return false;
            }
            return true;
        }catch(err){
                notifyError('server error')
            return false;
        }
    }

    const getNextSignupPage = async () => {
        if(!await checkValidUserName()){
            return;
        }
        if (signupUser.userName && signupUser.password && signupUser.age && signupUser.country) {
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
                    <button className='btn-login-send' onClick={()=>{onLogin(loginUser)}}>Login</button>
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
                            <h2>Sign Up</h2>
                        </div>
                        {signupUser.color == 'blue' && <input type='text' onChange={handleChangeInput} value={signupUser.reasonForPlaying} name="reasonForPlaying" placeholder="Reason For Playing" />}
                        {signupUser.color == 'red' &&
                            <select className='shape-select' onChange={handleChangeInput} name="shape">
                                <option className="value-select" value="circle">&#9711; &nbsp;Circle</option>
                                <option className="value-select" value="triangle">&#9651; &nbsp;Triangle</option>
                                <option className="value-select" value="square">&#9744; &nbsp;Square</option>
                            </select>
                        }
                        <h2>&nbsp;</h2>
                        <button className='btn-login-send' onClick={()=>{onSignup(signupUser)}}>Sign Up</button>
                    </div>
                </div>
            </div>
                <ToastContainer /></>
        }
    }
}
