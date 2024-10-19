import React , {useState , useContext , useEffect} from 'react';
import '../HeaderMain/HeaderMain.css'
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
const HeaderDefault = () => {
    const navigetor = useNavigate()
    const authContext = useContext(AuthContext)
    const [theme, setTheme] = useState(authContext.getLocalStorage('theme'))

    useEffect(() => {
        if (theme == 'light') {
            document.documentElement.style.setProperty('--white-color', '#f4f4f4');
            document.documentElement.style.setProperty('--text-color', 'rgba(0, 0, 0, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#242424');
            document.documentElement.style.setProperty('--border', '1px solid rgba(0, 0, 0, 0.2)');
        } else {
            document.documentElement.style.setProperty('--white-color', '#242424');
            document.documentElement.style.setProperty('--text-color', 'rgba(255, 255, 255, 0.56)');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--border', '1px solid rgba(255, 255, 255, 0.2)');
        }
    }, [theme])
    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header__wrapper">
                    <div className="header__right">
                        <a className="header__logo-link" href="#" onClick={() => navigetor('/main')}>
                            <img className="header__logo-img" src="../images/header/logo.svg" alt="logo" />
                        </a>
                    </div>
                    <div className="header__left">

                        <div className="header__left-dropdown">
                            <ul className="header__left-dropdown-list">
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-box-arrow-in-left"></i>
                                        ورود
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-bookmark"></i>
                                        نشان ها
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-journal"></i>
                                        یادداشت ها
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-clock-history"></i>
                                        بازدید های اخیر
                                    </a>
                                </li>
                                <li className="header__left-dropdown-item">
                                    <a className="header__left-dropdown-link" href="#">
                                        <i className="header__left-dropdown-icon bi bi-shop"></i>
                                        دیوار برای کسب و کارها
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <a className="header__left-link" href="#">
                            <i className="header__left-icon bi bi-chat"></i>
                            چت
                        </a>
                        <Link className="header__left-link" to="/support">
                            پشتیبانی
                        </Link>
                        <Link to="/new">
                            <button className="header__left-btn">
                                ثبت آگهی
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default HeaderDefault;