/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import classes from './Search.module.css'
import { ConfigContext } from '../../../Context/Config/Index';
import GenreList from '../../UI/GenreList/GenreList';
import Card from '../../UI/Card/Card';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';
import TitleName from '../../../utilities/TitleName';


export default function Search() {
    const [genres, setGenres] = useState(null);
    const { api_urls, api_secrets } = useContext(ConfigContext);
    const [games, setGames] = useState(null);
    const [searched, setSearched] = useState('');

    let { genre } = useParams();
    let { num } = useParams();

    useEffect(() => {
        fetch(`${api_urls.games}genres?&key=${api_secrets.games}`)
            .then((r) => r.json())
            .then((r) => {
                setGenres(r.results)
            });
    }, []);

    useEffect(() => {
        setGames(null);
        fetch(`${api_urls.games}games?&key=${api_secrets.games}&genres=${genre}&page=${num}&page_size=12`)
            .then((r) => r.json())
            .then((r) => {
                setGames(r.results);
            });
    }, [genre, num]);

    useEffect(() => {
        if (searched.length > 4) {
            fetch(`${api_urls.games}games?&key=${api_secrets.games}&page_size=24&search=${searched}&search_precise=true`)
                .then((r) => r.json())
                .then((r) => {
                    console.log(r);
                    setGames(r.results)
                });
        }
    }, [searched])
    return (
        <div className={"container-fluid min-vh-100 py-5 my-5 " + classes["bg-info"]}>
            <TitleName title='search' />
            <div className="row my-5 ">
                {/* lista generi */}
                <div className="col-12 col-md-3 col-lg-2">
                    {
                        genres && <GenreList Genres={genres} />
                    }
                </div>
                {/* lista giochi */}
                <div className="col-12 col-md-9 col-lg-10">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3 my-5">
                            <div className="input-group mb-3">
                                <input type="text" className='form-control bg-transparent border-0 border-bottom border-info  text-white'
                                    onChange={(ev) => setSearched(ev.target.value)}
                                    placeholder="search..." />
                                <button className='btn btn-outline-info border-0 border-bottom border-info' type='button'
                                    value={searched}>
                                    search
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* paginate */}
                    {
                        !searched &&

                        <div className="row  Page  justify-content-evenly mb-5">
                            <div className="col-2">
                                {
                                    num > 1 ? (
                                        <Link className='btn btn-info' to={`/search/${genre}/${+num - 1}`}>
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </Link>
                                    ) : (
                                        ""
                                    )
                                }
                            </div>
                            <div className="col-2 page-item ">
                                <span className='btn btn-info'>
                                    {num}
                                </span>
                            </div>
                            <div className="col-2">
                                <Link className='btn btn-info' to={`/search/${genre}/${+num + 1}`}>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </Link>
                            </div>
                        </div>


                    }

                    {/* Games */}
                    <div className="row justify-c">
                        {
                            games ? games.map((game) => {
                                return (
                                    <div key={game.id} className='col-12 d-flex justify-content-center justify-content-md-center col-md-6 col-lg-4 mb-5'>
                                        <Card image={game.background_image} name={game.name} slug={game.slug} />
                                    </div>

                                )
                            }) : <Loader />
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}
