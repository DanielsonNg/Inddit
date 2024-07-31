import { useEffect, useRef, useState } from "react"
import axios from "../src/axios"

const USER_REGEX = /^[a-zA-z][a-zA-Z-09-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = '/register'

export default function RegisterPage() {

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, { user, pwd, matchPwd })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }
        try {
            const response = await axios.post(REGISTER_URL, 
                {
                    user: user,
                    password: pwd
                }
                // JSON.stringify({ user, pwd }),
                // {
                //     headers: { 'Content-Type': 'application/json' },
                //     withCredentials: true
                // }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

    }



    return (
        <>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Register Page</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            required
                            autoComplete="off"
                            style={{ height: '50px' }}
                            name="username"
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onChange={(e) => setUser(e.target.value)}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            style={{ height: '50px' }}
                        />

                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            style={{ height: '50px' }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field.
                    </p>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        style={{ height: '50px' }}
                       >Sign Up</button>
                </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="/login">Sign In</a>
                    </span>
                </p>
            </div>
        </>
    )
}