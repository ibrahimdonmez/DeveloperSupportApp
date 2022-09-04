import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useSelector } from 'react-redux';
import { user } from "../../stores/UserSlice";
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

export const Navbar = () => {
    const { t } = useTranslation();

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
                                    {t("HeaderAddGithubLinkedinText")}
                                </button>
                            </Link>        
                        </li>
                        <li className="nav-item">
                            <Link to='add-linkedin'>
                                <button className="btn">
                                    {t("HeaderAddLinkedinText")}
                                </button>
                            </Link>        
                        </li>
                    </ul>
                    {User.userName == null &&
                        <ul className="navbar-nav" style={{marginLeft:"auto"}}>
                            <li className="nav-item">
                                <Link to='Login'>
                                    <button className="btn">
                                        {t("HeaderLoginText")}
                                    </button>
                                </Link>        
                            </li>
                            <li className="nav-item">
                                <Link to='Register'>
                                    <button className="btn">
                                        {t("HeaderRegisterText")}
                                    </button>
                                </Link>        
                            </li>
                        </ul>
                    }
                    {User.userName !== null &&
                    <ul className="navbar-nav" style={{marginLeft:"auto"}}>
                       
                        <li className="nav-item">
                            <span>{t("HomePageWelcomeText")} <b>{User.userName}</b>, <b>{User.starRemaining}</b> {t("HomePageRemainingPointsText")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <button className="btn" onClick={() => {localStorage.clear(); dispatch(user())}}>
                                {t("HomePageLogoutText")}
                            </button>
                        </li>
                    </ul>
                    }
                </div>
            </div>
        </nav>
    );
}