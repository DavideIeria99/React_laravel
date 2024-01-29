import { useContext, useState } from "react";
import { ConfigContext } from "../../../Context/Config/Index";
import { AutContext } from "../../../Context/Auth";
import { useNavigate } from "react-router-dom";


export default function Update() {

    const navigate = useNavigate();
    const { user, Update } = useContext(AutContext);
    let { api_urls } = useContext(ConfigContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const UpProfile = async (event) => {
        event.preventDefault();

        await fetch(`${api_urls.backend}/api/users/updateProfile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        }).then(
            Update(name, user.token, user.id),
            navigate('/profile')
        )
    }


    return (
        <div className="container mt-5">
            <div className="row py-5 ">
                <div className="col-5 mx-auto">
                    <form onSubmit={UpProfile} encType="multipart/form-data" className='Sign-form'>
                        <h1 className="text-center"> update</h1>
                        <div className='Sign-top'></div>
                        <div className='Sign-bottom'></div>
                        <div className='mb-5'>
                            <label className='form-label' htmlFor="user" >
                                name
                            </label>
                            <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                                placeholder='inserisci il tuo nome'
                                type="text"
                                name="user"
                                id="user"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} />
                        </div>
                        <div className='mb-5'>
                            <label className='form-label' htmlFor="userMail" >
                                email
                            </label>
                            <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                                placeholder='inserisci la tua email'
                                type="email"
                                name="email"
                                id="userMail"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                        </div>

                        <div className="mb-5">
                            <button type="submit" className='btn btn-outline-info px-5 rounded-0'>Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
