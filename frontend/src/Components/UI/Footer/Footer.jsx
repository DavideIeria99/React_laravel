import classes from './Footer.module.css';

export default function Footer() {
    return (
        <div className={"container-fluid pb-2 position-relative bg-cyan " + classes.borderGrapTop}>
            <div className="row py-3 mt-3 px-md-5 justify-content-between align-items-center">
                <div className="col-12">
                    <div className="font-fira text-main">
                        <i className='fa-brands fa-react me-3'></i>
                        rehactor</div>
                </div>
            </div>
            <div className="row px-md-5 justify-content-evenly mx-auto">
                <div className="col-12  py-3 ">
                    <div className=' text-center text-dark me-3 fs-6'>
                        photos RAWG
                    </div>
                </div>
            </div>
        </div>
    )
}
