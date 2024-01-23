import useInput from "../../../Hooks/useInput";
import { ConfigContext } from "../../../Context/Config/Index";

import { useContext } from "react";
import { AutContext } from "../../../Context/Auth";
import { useNavigate } from "react-router-dom";


export default function SignUp() {

    const navigate = useNavigate();
    let { login } = useContext(AutContext);
    let { api_urls } = useContext(ConfigContext);

    const username = useInput("");
    const email = useInput("");
    const password = useInput("");
    const passwordConfirm = useInput("");


    const signIn = (event) => {
        event.preventDefault();
        if (password.value == passwordConfirm.value) {
            //prosegui

            //fetch=> register
            //fetch=> login
            //fetch=> view-profile
            fetch(`${api_urls.backend}/api/users/register`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    name: username.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: passwordConfirm.value
                })
            })
                .then((r) => {
                    if (r.ok) {
                        return r.json()
                    } else {
                        alert("ops...");
                    }
                })
                .then(() => {
                    fetch(`${api_urls.backend}/api/users/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email.value, password: password.value })
                    })
                        .then((r) => r.json())
                        .then((r) => {
                            const token = r.token;

                            //una volta ricevuto il token possiamo chieedere le informazioni dello user , come name e id per esempio
                            //alla rotta wiews-profile

                            fetch(`${api_urls.backend}/api/users/view-profile`, {
                                method: "POST",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    login(data.data.name, token, data.data.id);
                                    navigate("/");
                                });
                        });

                })
        } else {
            alert('le password non coincidono');
        }
    };



    return (
        <form onSubmit={signIn} className='Sign-form'>
            <h1 className="text-center"> Register</h1>

            <div className='Sign-top'></div>
            <div className='Sign-bottom'></div>
            <div className='mb-5'>
                <label className='form-label' htmlFor="userName" >
                    name
                </label>
                <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                    placeholder='inserisci la tua name'
                    type="name"
                    name="name"
                    id="userName"
                    {...username} />
            </div>
            <div className='mb-5'>
                <label className='form-label' htmlFor="userMail" >
                    Email
                </label>
                <input className=' text-white form-control bg-transparent border-0 border-bottom border-info rounded-0' placeholder='inserisci la tua email' type="email" name="email" id="userMail" {...email}
                />
            </div>
            <div className='mb-5'>
                <label className='form-label' htmlFor="userPassword" >
                    Password
                </label>
                <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                    placeholder='inserisci la tua password'
                    type="password"
                    name="password"
                    id="userPassword"
                    {...password} />
            </div>
            <div className='mb-5'>
                <label className='form-label' htmlFor="userConfirmPassword" >
                    Confirm Password
                </label>
                <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                    placeholder='conferma la tua password'
                    type="password"
                    name="confirm_password"
                    id="userConfirmPassword"
                    {...passwordConfirm} />
            </div>
            <div className="mb-5">
                <button type="submit" className='btn btn-outline-info px-5 rounded-0'>Register now!</button>
            </div>
        </form>
    )
}
