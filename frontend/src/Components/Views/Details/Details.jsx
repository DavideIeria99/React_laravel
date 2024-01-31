import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ConfigContext } from "../../../Context/Config/Index";
import Comment from "../../UI/Comment/Comment";

export default function Details() {
    const { slug } = useParams();
    const [detail, setDetail] = useState(null);
    const { api_urls, api_secrets } = useContext(ConfigContext);

    useEffect(() => {
        fetch(`${api_urls.games}games/${slug}?&key=${api_secrets.games}`)
            .then((r) => r.json())
            .then((r) => setDetail(() => r));
    }, []);

    return (
        <>
            {
                detail &&
                <div className="container-fluid min-vh-100 py-5" style={{
                    background: `linear-gradient(rgba(18, 55, 55, .4), rgba(18, 55, 55, .5)), url("${detail.background_image}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"

                }}>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-12">
                                <h1>{detail.name}</h1>
                                <p className="small">Developed by {detail.developers[0].name}</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 col-md-6">{detail.description_raw}</div>
                            <div className="col-12 col-md-6 my-3 my-md-0">
                                <img src={detail.background_image} alt={detail.name} className="img-fluid" />
                            </div>
                        </div>
                        <div className="row ">
                            <h3>Genres</h3>
                            <div className="col-6">
                                {detail.genres.map((el) => (
                                    <Link className="mx-2" key={el.id} to={`/search/${el.slug}/1`}>
                                        <button className="btn btn-outline-info">{el.name}</button>
                                    </Link>
                                )
                                )}

                            </div>
                        </div>
                        <div className="row mt-3 font-fira text-main">
                            {/* informations */}
                            <div className="col-12 col-md-3">
                                <h2>informations</h2>
                                <div className="row flex-column justify-content-center align-items-center text-white g-2">
                                    <div className="col ">
                                        <h5>WEBSITE</h5>

                                        <a href={detail.website} className=" text-decoration-none">
                                            <i className="fa-solid fa-chevron-right me-2"></i>
                                            Go to site
                                        </a>
                                    </div>
                                    <div className="col ">
                                        <h5>RELEASED</h5>
                                        <p className="small">
                                            <i className="fa-solid fa-chevron-right me-2"></i>
                                            {detail.released
                                            }</p>
                                    </div>
                                </div>

                            </div>
                            {/* Ratings */}
                            <div className="col-12 col-md-3">
                                <h2>Ratings</h2>
                                <div className="row flex-column justify-content-center align-items-center text-white g-2">
                                    {
                                        detail.ratings.slice(0, 2).map((el) => (
                                            <div key={el.id} className="col d-flex justify-content-between">
                                                <h5>{el.title}</h5>
                                                <p>{el.percent}%</p>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            {/* comment */}
                            <div className="col-12 col-md-6">
                                <h2>Comments</h2>
                                <div className="container-fluid ">

                                    <Comment slug={slug} />
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            }
        </>
    )
}
