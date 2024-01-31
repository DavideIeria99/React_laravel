import classes from './Message.module.css'

export default function Message({ message }) {

    const date = new Date(message.created_at).toUTCString();

    return (
        <div className={"col-12 " + classes.comment}  >
            <div className="row  my-2 border border-info  rounded ">
                {/* profilo */}
                <div className="col-4">
                    <p className="fs-6 ">{message.user}</p>
                </div>
                {/* messaggio */}
                <div className="col-8 text-wrap">
                    <p className=" mx-auto  text-break">
                        {message.message}
                    </p>
                </div>
                <span className='text-end'>{date}</span>
            </div>
        </div >
    )
}
