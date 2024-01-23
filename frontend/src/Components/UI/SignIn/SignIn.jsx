import useInput from "../../../Hooks/useInput";
import { ConfigContext } from "../../../Context/Config/Index";

import { useContext } from "react";
import { AutContext } from "../../../Context/Auth";
import { useNavigate } from "react-router-dom";



export default function SignIn() {

    //crea user
    const navigate = useNavigate();
    let { login } = useContext(AutContext);
    let { api_urls } = useContext(ConfigContext);
    const email = useInput("");
    const password = useInput("");

    const signUp = (event) => {
        event.preventDefault();
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
                    method: "GET",
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

    }

    return (
        <form onSubmit={signUp} className='Sign-form'>
            <h1 className="text-center"> Login</h1>
            <div className='Sign-top'></div>
            <div className='Sign-bottom'></div>
            <div className='mb-5'>
                <label className='form-label' htmlFor="userMail" >
                    Email
                </label>
                <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                    placeholder='inserisci la tua email'
                    type="email"
                    name="email"
                    id="userMail"
                    {...email} />
            </div>
            <div className='mb-5'>
                <label className='form-label' htmlFor="userMail" >
                    Password
                </label>
                <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                    placeholder='inserisci la tua password' type="password" name="password"
                    id="userPassword" {...password} />
            </div>
            <div className="mb-5">
                <button type="submit" className='btn btn-outline-info px-5 rounded-0'>Login</button>
            </div>
        </form>
    )
}
