/* eslint-disable react/no-unescaped-entities */
import classes from './Info.module.css'

export default function Info() {
    return (
        <div className={"container-fluid my-5 " + classes["bg-info"]}>
            <div className="container">
                <div className={"row px-3 pt-5 " + classes.info}>
                    <div className="col-12 col-lg-4 my-5 px-3 ">
                        <h3 className={"text-main " + classes['info-title']}>
                            register now
                        </h3>
                        <p className='pt-2'>register now, it's totallly free </p>
                    </div>
                    <div className="col-12 col-lg-4 my-5 px-3 ">
                        <h3 className={'text-main ' + classes['info-title']}>
                            chose game...
                        </h3>
                        <p className='pt-2'>chose a game you posseses and start playing. </p>
                    </div>
                    <div className="col-12 col-lg-4 my-5 px-3 ">
                        <h3 className={'text-main ' + classes['info-title']}>
                            ... start your steam!
                        </h3>
                        <p className='pt-2'>share your game experience with your friends</p>
                    </div>
                </div>
            </div>
            <div className="row px-md-5">
                <div className="col-6 col-md-4 my-5 text-center text-md-start">
                    <i className='fa-solid fa-gamepad fa-2x text-main'></i>
                    <p className='h1 my-2'>583097</p>
                    <p>Games</p>
                </div>
                <div className="col-6 col-md-4 my-5 text-center">
                    <i className="fa-solid fa-bars-staggered fa-2x text-main"></i>
                    <p className='h1 my-2'>19</p>
                    <p>Categories</p>
                </div>
                <div className="col-6 col-md-4 my-5 text-center text-md-end">
                    <i className='fa-solid fa-gamepad fa-2x text-main'></i>
                    <p className='h1 my-2'>51</p>
                    <p>Platforms</p>
                </div>
                <div className="col-6 col-md-4 my-5 text-center text-md-start">
                    <i className='fa-solid fa-users fa-2x text-main'></i>
                    <p className='h1 my-2'>48674</p>
                    <p>Publishers</p>
                </div>
                <div className="col-6 col-md-4 my-5 text-center">
                    <i className='fa-solid fa-tag fa-2x text-main'></i>
                    <p className='h1 my-2'>7363</p>
                    <p>Tags</p>
                </div>
                <div className="col-6 col-md-4 my-5 text-center text-md-end">
                    <i className='fa-solid fa-handshake-angle fa-2x text-main'></i>
                    <p className='h1 my-2'>24935</p>
                    <p>Creators</p>
                </div>
            </div>
        </div>
    )
}
