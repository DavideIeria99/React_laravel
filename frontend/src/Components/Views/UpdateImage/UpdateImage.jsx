import { useContext, useState } from "react";
import { ConfigContext } from "../../../Context/Config/Index";
import { AutContext } from "../../../Context/Auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        <div className="container mt-5">
            <div className="row py-5 ">
                <div className="col-5 mx-auto">
                    <form onSubmit={UpImage} encType="multipart/form-data" className='Sign-form'>
                        <h1 className="text-center"> update</h1>
                        <div className='Sign-top'></div>
                        <div className='Sign-bottom'></div>
                        <div className='mb-5'>
                            <label className='form-label' htmlFor="img" >
                                img
                            </label>
                            <input className='form-control bg-transparent border-0 border-bottom border-info rounded-0 text-white'
                                placeholder='inserisci la tua img' type="file" accept="image/*" name="img"
                                id="img" onChange={(e) => {
                                    setImg(e.target.files[0]);
                                }} />
                        </div>
                        <div className="mb-5">
                            <button type="submit" className='btn btn-outline-info px-5 rounded-0'>Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
