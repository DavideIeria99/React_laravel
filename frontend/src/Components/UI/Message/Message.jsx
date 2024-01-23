
import classes from './Message.module.css'
export default function Message() {
    return (
        <div className="col-12 my-2 ">
            <div className="row justify-content-between ">
                {/* profilo */}
                <div className="col-3">
                    <div className={"d-flex justify-content-between  " + classes.img}>
                        <img src="https://picsum.photos/200" className="img-fluid" alt="test" />
                        <p className="fs-5 align-bottom">test</p>
                    </div>
                </div>
                {/* messaggio */}
                <div className="col-8 text-wrap">
                    <p className=" ms-2  ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, eum deleniti ex aliquid optio distinctio culpa ullam eaque recusandae in. Eum laboriosam beatae error voluptates sequi odit dolores aperiam vel nesciunt at est quos, atque eius. Eum magni quas, sed at earum harum delectus corporis omnis unde sit enim nam?
                    </p>
                </div>
            </div>
        </div>
    )
}
