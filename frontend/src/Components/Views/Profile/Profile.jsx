import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import classes from './Profile.module.css;'

import { AutContext } from "../../../Context/Auth"
import { ConfigContext } from "../../../Context/Config/Index";

import Message from "../../UI/Message/Message";


export default function Profile() {
    const { user } = useContext(AutContext);
    const { api_urls } = useContext(ConfigContext);
    const [comment, setComment] = useState('');
    const [profile, setProfile] = useState('');

    //comment
    useEffect(() => {
        fetch(`${api_urls.backend}/api/users/comment`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((r) => r.json())
            .then((r) => {
                setComment(r.data.filter((comment) => comment.user_id == user.id))
            })
    }, []);

    //profile
    useEffect(() => {
        fetch(`${api_urls.backend}/api/users/view-profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProfile(data.data);
            });
    }, []);


    return (
        <div className="container mt-5 min-vh-100">
            <div className="row min-vh-100 pt-5">
                <div className="col-12">
                    <h3>bentornato {profile.name}</h3>
                    <div className="row">
                        <div className="col-6">
                            <div >
                                <img src="https://picsum.photos/200" className="img-fluid border border-info p-3 m-3" alt="test" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="text-info border border-primary p-3 rounded-1">
                                <h1>nome:<span className="fs-4 ms-5 text-white">{profile.name}</span></h1>
                                <h2>email<span className="fs-4 ms-5 text-white">{profile.email}</span></h2>
                                <h2>N°commenti:<span className="fs-4 ms-5 text-white">{comment.length}</span></h2>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-12">
                    <h1>i tuoi commenti</h1>
                    <div className="row overflow-auto gap-2 w-100  " >
                        {
                            comment && comment.map((text) => (

                                <div key={text.id} className="col-3">
                                    <Link className="text-decoration-none text-white" to={`/details/${text.game}`}>
                                        <h6>{text.game}</h6>

                                        <Message message={text} />
                                    </Link>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
