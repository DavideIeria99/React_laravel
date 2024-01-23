import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { joinStreaming } from "../../../utilities/twilio";
import Loader from "../../UI/Loader/Loader";
import { ConfigContext } from "../../../Context/Config/Index";
import classes from "./Join.module.css";




export default function Join() {

    const { room_id } = useParams();
    const StreamerVideo = useRef("video");
    const StreamerFace = useRef("face");
    const [loading, streaming, closed, full] = ["loading", "streaming", "closed", "full"];

    const [status, setSatus] = useState(loading);

    const [info, setInfo] = useState();

    let { api_urls } = useContext(ConfigContext);

    const token = JSON.parse(localStorage.getItem("user")).token;

    useEffect(() => {

        fetch(`${api_urls.backend}/api/users/room/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ room_id }),
        })

            .then((res) => res.json())
            .then((data) => {

                console.log("data ", data);
                if (data === "room closed") {
                    setSatus(closed)
                    return;
                }
                if (data === "no more seat available") {
                    setSatus(full)
                    return;
                }
                console.log(data, "DATA");
                setSatus(streaming);

                joinStreaming(data.jwt,
                    data.room_name,
                    (track) => {
                        StreamerVideo.current.appendChild(track.attach());
                    },
                    (track) => {
                        StreamerFace.current.appendChild(track.attach())
                    },
                    () => setSatus(closed)
                );
            })
            .then(() => {
                fetch(`${api_urls.backend}/api/users/room/streamer/${room_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                })
                    .then((res) => res.json())
                    .then((data) => setInfo(data));
            })


    }, []);

    const showLoading = () => {
        if (status === loading) return <Loader />
    };

    const showFull = () => {
        if (status === full) {
            return (
                <div className="col-12">
                    <p>Stanza Piena!</p>
                    <Link to="/streamers">Torna alla lista</Link>
                </div>
            )
        }
    };

    const showTransmissionInterrupted = () => {
        if (status === closed) {
            return (
                <div className="col-12">
                    <p>lo streamer ha interrotto la trasmissione</p>
                    <Link to="/streamers">Torna alla lista</Link>
                </div>
            )
        }
    }


    return (
        <div className="container min-vh-100 mt-5">
            <div className="row mt-5">
                <div className="col-12 position-relative mt-5 pt-5">
                    <div className={classes.wrapperTracks}>
                        <div className={classes.streamer} ref={StreamerVideo}></div>
                        <div className={classes.streamerBlock} >
                            <div className={classes.viewer} ref={StreamerFace}></div>
                            {info && <div className={classes.label}>{info.streamer}</div>}
                        </div>
                    </div>
                </div>
                {showLoading()}
                {showFull()}
                {showTransmissionInterrupted()}
            </div>
        </div>

    )
}
