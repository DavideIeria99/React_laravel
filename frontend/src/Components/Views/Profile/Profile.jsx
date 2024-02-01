import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AutContext } from "../../../Context/Auth"
import { ConfigContext } from "../../../Context/Config/Index";
import Message from "../../UI/Message/Message";
import Loader from "../../UI/Loader/Loader";
import TitleName from "../../../utilities/TitleName";


export default function Profile() {
    const { user } = useContext(AutContext);
    const { api_urls } = useContext(ConfigContext);
    const [comment, setComment] = useState('');
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(true);



    const profileDetails = async () => {
        await fetch(`${api_urls.backend}/api/users/view-profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProfile(data.data);
            });
    }

    useEffect(() => {
        //profile
        profileDetails();
        //comment
        fetch(`${api_urls.backend}/api/users/comment`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((r) => r.json())
            .then((r) => {
                setComment(r.data.filter((comment) => comment.user_id == user.id))
                setLoading(false)
            });
    }, []);


    // useEffect(() => {

    // }, []);



    return (
        <div className="container mt-5 min-vh-100 ">
            <TitleName title='profile' />
            {
                loading ? <Loader />
                    : (
                        <div className="row min-vh-100 pt-5">
                            <div className="col-12">
                                <h3>welcome {profile.name}</h3>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div >{
                                            profile.img ? (
                                                <img width={300} src={`${api_urls.backend + "/storage/media/" + profile.img}`} className="img-fluid border border-info p-3 m-3 h-10" alt="profile" />
                                            ) : (
                                                <img width={300} src={`${api_urls.image}`} className="img-fluid border border-info p-3 m-3 h-10" alt="profile" />
                                            )
                                        }
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="text-info border border-primary p-3 rounded-1">
                                            <h1>Name:<span className="fs-4 ms-5 text-white">{profile.name}</span></h1>
                                            <h2>Email<span className="fs-4 ms-5 text-white">{profile.email}</span></h2>
                                            <h2>N°comments:<span className="fs-4 ms-5 text-white">{comment.length}</span></h2>
                                            <div className="d-flex justify-content-around gap-1">
                                                <Link className="btn btn-info" to='/updateProfile'>
                                                    update profile
                                                </Link>
                                                <Link className="btn btn-info " to='/updateImage'>
                                                    update image
                                                </Link>
                                                {
                                                    comment.length >= 1 &&
                                                    <Link className="btn btn-info " to='/comments'>
                                                        update comment
                                                    </Link>
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col-12">
                                <h1>your comment</h1>
                                <div className="row overflow-auto gap-2 w-100  " >
                                    {
                                        comment.length >= 1 ? comment.map((text) => (

                                            <div key={text.id} className="col-6 col-md-4">
                                                <Link className="text-decoration-none text-white " to={`/details/${text.game}`}>
                                                    <h6>{text.game}</h6>
                                                    <Message message={text} />
                                                </Link>
                                            </div>
                                        )) : (
                                            <p>there are no comments create one..</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
            }


        </div>
    )
}



