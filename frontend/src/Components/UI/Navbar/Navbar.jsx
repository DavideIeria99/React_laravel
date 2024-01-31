import { Link } from 'react-router-dom'
import classes from './Navbar.module.css'
import { AutContext } from '../../../Context/Auth'

import { useContext, useState } from 'react'
import Modal from '../Modal/Modal';
export default function Navbar() {

    const { user, logout } = useContext(AutContext);

    const [modal, setModal] = useState(false);

    const closeModal = () => setModal(false);
    return (
        <nav className={"navbar navbar-expand-lg navbar-dark shadow fixed-top " + classes.navbar}>
            <div className="container-fluid">

                <a className="text-decoration-none font-fira text-main" href="/">
                    <i className='fa-brands fa-react me-3'></i>
                    PlayLibrary
                </a>

                <div className={classes.navlogo}></div>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/search/action/1">Search</Link>
                        </li>
                        {
                            user ? (
                                <>
                                    {modal &&
                                        <Modal title="oh no..." message="vuoi lasciarci?"
                                            declineMessage="rimani" ConfirmMessage="esci"
                                            action={logout} closeModal={closeModal} />
                                    }

                                    <li className="nav-item">
                                        <Link to="/profile" className='nav-link text-white'>
                                            <i className="fa-regular fa-circle-user me-2"></i>
                                            {user.username}

                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <button className='btn' onClick={() => setModal(true)}>
                                            <i className="fa-solid fa-arrow-right-from-bracket text-main"></i>
                                        </button>
                                    </li>
                                </>
                            )
                                :
                                (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Sign">Sign</a>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
