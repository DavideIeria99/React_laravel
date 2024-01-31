import { useContext, useEffect, useState } from "react"
import { ConfigContext } from "../../../Context/Config/Index";
import Card from "../Card/Card";



export default function Featured() {
    const [data, setData] = useState(null);
    const { api_urls, api_secrets } = useContext(ConfigContext);




    useEffect(() => {
        fetch(`${api_urls.games}games?dates=2023-01-01,2023-12-31&ordering=-added&key=${api_secrets.games}`)
            .then((r) => r.json())
            .then((r) => {
                setData(() => r.results.slice(0, 4));
            });
    }, []);

    // console.log(data);

    return (
        <div className="container-fluid">
            <div className="row">
                {
                    data && data.map(el => {
                        return (
                            <div key={el.id} className="col-12 col-md-6 col-lg-3" >
                                <Card image={el.background_image} name={el.name} slug={el.slug} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
