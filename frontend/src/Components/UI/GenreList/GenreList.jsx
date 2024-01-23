import { Link } from 'react-router-dom'
import classes from './GenreList.module.css'


export default function GenreList({ Genres }) {

    return (
        <>
            <div className={classes['genres-wrapper']}>
                {
                    Genres && Genres.map((el) => {
                        return (
                            <Link key={el.id} to={`/search/${el.slug}/1`}>
                                <button className='btn btn-outline-info rounded-0 d-block w-100 text-start ' >
                                    {el.name}
                                </button >
                            </Link>
                        )
                    })
                }
            </div>


        </>

    )
}
