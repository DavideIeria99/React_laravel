import { useContext, useState } from "react";
import { ConfigContext } from "../../../Context/Config/Index";
import { AutContext } from "../../../Context/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import TitleName from "../../../utilities/TitleName";

export default function Update() {

    const navigate = useNavigate();
    const { user } = useContext(AutContext);
    let { api_urls } = useContext(ConfigContext);
    const [img, setImg] = useState('');
    const config = {
        headers: {
            "Content-type": "multipart/form-data",
            "Authorization": `Bearer ${user.token}`,
        }
    }

    const UpImage = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('img', img);
            formData.append('_method', 'put');
            await axios.post(`${api_urls.backend}/api/users/updateImage`, formData, config);
            navigate('/profile')
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="container">
            <TitleName title='update image' />

            <div className="row  min-vh-100  align-content-center">
                <div className="col-12 col-md-5 mx-auto ">
                    <form onSubmit={UpImage} encType="multipart/form-data" className='Sign-form'>
                        <h1 className="text-center"> update Image</h1>
                        <div className='Sign-top'></div>
                        <div className='Sign-bottom'></div>
                        <div className='mb-5'>
                            <label className='form-label' htmlFor="img" >
                                img
                            </label>
                            <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                                placeholder='inserisci la tua img' type="file" accept="image/*" name="img" lang="en-GB"
                                id="img" onChange={(e) => {
                                    setImg(e.target.files[0]);
                                }} />
                        </div>
                        <div className="mb-5 d-flex justify-content-around">
                            <button type="submit" className='btn btn-outline-info px-5 rounded-0'>Update</button>
                            <Link to='/profile'>
                                <button type="submit" className='btn btn-outline-info px-5 rounded-0'>back end</button>
                            </Link>
                        </div>
                        <div className="mb-5 ">
                            <span>update profile the your profile <Link to='/update'>check in</Link></span>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
