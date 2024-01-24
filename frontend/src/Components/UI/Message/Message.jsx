
import { useContext, useEffect, useState } from 'react'
import classes from './Message.module.css'
import { ConfigContext } from '../../../Context/Config/Index';


export default function Message({ slug }) {
    const { api_urls } = useContext(ConfigContext);
    const [message, setMessage] = useState("");


    useEffect(() => {
        fetch(`${api_urls.backend}/api/users/comment`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((r) => r.json())
            .then((r) => {
                setMessage(r.data.filter((comment) => comment.game == slug))

            })
    }, [message])


    console.log(message);
    return (
        <>
            {
                message.length >= 1 ? (
                    <div className={"row overflow-auto  " + classes.comment}>
                        {
                            message && message.map((text) => (
                                <>
                                    <div className="col-12  " >
                                        <div className="row justify-content-between my-2 ">
                                            {/* profilo */}
                                            <div className="col-3">
                                                <div className={"d-flex justify-content-between  " + classes.img}>
                                                    <img src="https://picsum.photos/200" className="img-fluid" alt="test" />
                                                    <p className="fs-5 align-bottom">{text.user_name}</p>
                                                </div>
                                            </div>
                                            {/* messaggio */}
                                            <div className="col-8 text-wrap">
                                                <p className=" ms-2  ">{text.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div >
                                </>
                            ))
                        }
                    </div>
                ) : (
                    <p>sii il primo a commentare!!</p>
                )
            }
        </>



    )
}
