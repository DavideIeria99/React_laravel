import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AutContext } from '../../../Context/Auth';
import { ConfigContext } from '../../../Context/Config/Index';

export default function UpdateComment() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AutContext);
    let { api_urls } = useContext(ConfigContext);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        fetch(`${api_urls.backend}/api/users/comment/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            }
        }).then((r) => r.json())
            .then((data) => {
                setComment(data.data);
            })
    }, [])
    const UpComment = async (event) => {
        event.preventDefault();

        await fetch(`${api_urls.backend}/api/users/comment/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                'id': comment.id,
                'message': message
            }),
        }).then(

            navigate('/comments')
        )
    }

    return (
        <div className="container mt-5">
            {
                comment && (
                    <div className="row py-5 " key={1}>
                        <div className="col-5 mx-auto">
                            <form onSubmit={UpComment} className='Sign-form'>
                                <h1 className="text-center"> update comment</h1>
                                <div className='Sign-top'></div>
                                <div className='Sign-bottom'></div>
                                <div className='mb-5'>
                                    <label className='form-label' htmlFor="user" >
                                        Comment
                                    </label>
                                    <textarea name="description"
                                        id="description"
                                        className="form-control "
                                        rows="5"
                                        maxLength="100"
                                        placeholder="comment..."
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                        }}
                                    >
                                        {comment.message}
                                    </textarea>
                                </div>


                                <div className="mb-5 d-flex e justify-content-evenly">
                                    <button type="submit" className='btn btn-outline-info px-5 rounded-0'>Update</button>
                                    <Link to='/comments'>
                                        <button type="submit" className='btn btn-outline-info px-5 rounded-0'>torna indietro</button>
                                    </Link>
                                </div>
                            </form>

                        </div>
                    </div>
                )
            }

        </div>
    )
}

