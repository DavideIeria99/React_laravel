import classes from './Call.module.css'
import Video from './../../../assets/Video/video_2.mp4'

export default function Call() {
    return (
        <div className="my-5">
            <header className={classes.header}>
                <div className={classes.overlay}></div>

                <video playsInline autoPlay muted loop >
                    <source src={Video} type="video/mp4" />
                </video>

                <div className='wrapper h-100'>
                    <div className="row h-100 justify-content-center align-items-end pb-5">
                        <div className={'col-12 text-center ' + classes.links}>
                            <button className='btn btn-info'>Explore now</button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
