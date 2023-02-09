import React from 'react'
import {useRef, useState, useEffect} from 'react'
//import axios from '../api/axios'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import '../App.css'
import axios from '../api/axios'
const LOGIN_URL = '/login'

const Login = () => {
  const navigate = useNavigate()
  const userRef = useRef();
  const errRef = useRef();

  const [name, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(JSON.stringify({name,password}))
    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({ name, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log("we done");
        setUser('');
        setPwd('');
        setSuccess(true);
        navigate(`/${name}`, { replace: true}) //replaces success page 
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
    
}
  
  return (
  <>
   <section>
      <h1>PCT Assassins</h1>
      <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={name}
              required
            />

            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
            />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?<br />
        <span className="line">
        {/*put router link here*/}
        <a href="/register">Register</a>
        </span>
      </p>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
    </section>
  </>
  )
}

export default Login;