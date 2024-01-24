import { useContext, useEffect, useState } from "react";
import { AutContext } from "../../../Context/Auth";
import { ConfigContext } from "../../../Context/Config/Index";
import Message from "../Message/Message";




export default function Comment({ slug }) {
    const { user } = useContext(AutContext);
    const { api_urls } = useContext(ConfigContext);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        fetchComment();
    })

    const fetchComment = async () => {
        await fetch(`${api_urls.backend}/api/users/comment`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((r) => r.json())
            .then((r) => {
                setMessage(r.data.filter((comment) => comment.game == slug))

            })
    }

    const sendComment = async (event) => {
        event.preventDefault();
        await fetch(`${api_urls.backend}/api/users/comment/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: user.username,
                game: slug,
                message: comment
            })
        })
            .then((r) => {
                r.json();
                setComment("");
                fetchComment();

            })
    };


    return (
        <>
            <Message message={message} />
            {user ?
                <form onSubmit={sendComment}>
                    <div className="col-12">
                        <textarea name="description"
                            id="description"
                            className="form-control "
                            rows="5"
                            maxLength="100"
                            placeholder="comment..."
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        />
                        <p>{comment.length} / 100</p>
                    </div>
                    <div className="mt-2 d-flex justify-content-end ">
                        <button type="submit" className='btn btn-info  rounded'>send!</button>
                    </div>
                </form>
                :
                (
                    <p>per commentare iscriviti!!</p>
                )}
        </>
    )
}
