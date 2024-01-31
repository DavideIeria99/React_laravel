import classes from './Header.module.css';
import Video from './../../../assets/Video/video_1.mp4';

export default function Header() {
    return (
        <header>
            <div className={classes.overlay}>

            </div>

            <video playsInline autoPlay muted loop >
                <source src={Video} type="video/mp4" />
            </video>

            <div className={classes.container + " h-100"}>
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                        <h1 className="display-3">PlayLibrary</h1>
                        <p className="lead mb-0">the library where comment e wiew the game </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
