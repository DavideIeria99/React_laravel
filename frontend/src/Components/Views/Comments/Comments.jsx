/* eslint-disable react-hooks/exhaustive-deps */

import { Link, useNavigate } from "react-router-dom";
import { AutContext } from "../../../Context/Auth";
import { ConfigContext } from "../../../Context/Config/Index";
import { useContext, useEffect, useState } from "react";

export default function Comments() {
    const { user } = useContext(AutContext);
    const { api_urls } = useContext(ConfigContext);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fechtComment()
    }, [])

    const fechtComment = async () => {
        await fetch(`${api_urls.backend}/api/users/comment`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((r) => r.json())
            .then((r) => {
                setComment(r.data.filter((comment) => comment.user_id == user.id));
            })
    }

    const deleteComment = async (id) => {

        fetch(`${api_urls.backend}/api/users/comment/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        }).then(() => {
            fechtComment();
        }
        )
    }




    return (
        <>
            <div className="container-fluid mt-5 min-vh-100">
                <div className="row  pt-5">
                    <div className="col-12">
                        <h1>Views your comments</h1>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-dark table-hover ">
                                <thead>
                                    <tr className="text-main">
                                        <th scope="col">id</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Game</th>
                                        <th scope="col">text</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        comment && comment.map(comment => {
                                            return (
                                                <tr key={comment.id}>
                                                    <td className="pt-3">{comment.id}</td>
                                                    <td className="pt-3">{comment.user}</td>
                                                    <td className="pt-3">{comment.game}</td>
                                                    <td className="pt-3 text-truncate" style={{ maxWidth: "100px" }}>{comment.message}</td>
                                                    <td className="pt-3">{new Date(comment.created_at).toUTCString()}</td>
                                                    <td className="pt-3 d-flex ">
                                                        <Link to={`/updatecomment/${comment.id}`} className="btn btn-warning me-1">update</Link>
                                                        <button type="button" onClick={() => deleteComment(comment.id)} className="btn btn-danger">delete</button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            {
                                comment.length == 0 ? (
                                    <div className="col-12 d-flex justify-content-center align-items-center flex-column  text-info mt-5">
                                        <h1>no comments </h1>
                                        <Link to='/profile'>
                                            <button className="btn btn-info">return the profile</button>
                                        </Link>
                                    </div>
                                ) : (
                                    ""
                                )
                            }
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
