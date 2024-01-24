

import classes from './Message.module.css'



export default function Message({ message }) {
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
                                                    <p className="fs-5 align-bottom">{text.user}</p>
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
