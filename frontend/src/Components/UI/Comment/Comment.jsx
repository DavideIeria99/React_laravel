import { useContext, useState } from "react";
import { AutContext } from "../../../Context/Auth";
import { ConfigContext } from "../../../Context/Config/Index";
import Message from "../Message/Message";



export default function Comment({ slug }) {
    const { user } = useContext(AutContext);
    const { api_urls } = useContext(ConfigContext);
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(false);


    const sendComment = async (event) => {
        event.preventDefault();
        await fetch(`${api_urls.backend}/api/users/comment/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                game: slug,
                message: message
            })
        })
            .then((r) => r.json())
            .then((r) => {
                setMessage("");
                setCount(true);
                console.log("successo", count)
            })
    };
    return (
        <>
            <Message slug={slug} />
            {user ?
                <form onSubmit={sendComment}>
                    <div className="col-12">
                        <textarea name="description"
                            id="description"
                            className="form-control "
                            rows="5"
                            maxLength="100"
                            placeholder="comment..."
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />
                        <p>{message.length} / 100</p>
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
