

import classes from './Message.module.css'



export default function Message({ message }) {

    const date = new Date(message.created_at).toUTCString();

    return (
        <div className={"col-12 " + classes.comment}  >
            <div className="row  my-2 border border-info">
                {/* profilo */}
                <div className="col-4">
                    <div className={"d-flex   " + classes.img}>
                        <img src="https://picsum.photos/200" className="img-fluid" alt="test" />
                        <p className="fs-6 ">{message.user}</p>
                    </div>
                </div>
                {/* messaggio */}
                <div className="col-8 text-wrap">
                    <p className=" ms-1 text-end">
                        {message.message}
                    </p>
                </div>
                <span className='text-end'>{date}</span>
            </div>
        </div >
    )
}
