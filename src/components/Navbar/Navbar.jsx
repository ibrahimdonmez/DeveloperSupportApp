import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useSelector } from 'react-redux';
import { user } from "../../stores/UserSlice";
import { useDispatch } from 'react-redux';

export const Navbar = () => {
    
    const User = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg navbar-custom ">
            <div className="container">
                <Link to='/' className='navbar-brand'>
                    Developer Support 
                    <img src={require("../../styles/images/supportcolored.png")} alt="logo" className='navbar-logo' />
                </Link>
                <div className="collapse navbar-collapse navbar-list">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='add-github-linkedin' >
                                <button className="btn">
                                    Github & Linkedin Ekle
                                </button>
                            </Link>        
                        </li>
                        <li className="nav-item">
                            <Link to='add-linkedin'>
                                <button className="btn">
                                    Linkedin Ekle
                                </button>
                            </Link>        
                        </li>
                    </ul>
                    {User.userName == null &&
                        <ul className="navbar-nav" style={{marginLeft:"auto"}}>
                            <li className="nav-item">
                                <Link to='Login'>
                                    <button className="btn">
                                        Giriş Yap
                                    </button>
                                </Link>        
                            </li>
                            <li className="nav-item">
                                <Link to='Register'>
                                    <button className="btn">
                                        Kayıt Ol
                                    </button>
                                </Link>        
                            </li>
                        </ul>
                    }
                    {User.userName !== null &&
                    <ul className="navbar-nav" style={{marginLeft:"auto"}}>
                        <li className="nav-item">
                            <button className="btn" onClick={() => {localStorage.clear(); dispatch(user())}}>
                                Çıkış Yap
                            </button>
                        </li>
                    </ul>
                    }
                </div>
            </div>
        </nav>
    );
}