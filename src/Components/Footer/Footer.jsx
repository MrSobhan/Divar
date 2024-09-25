import React from 'react';
import './Footer.css'
import Social from '../Social/Social';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__section-first">
                <div className="footer__imgs">
                    <a className="footer__img-link" href="#">
                        <img className="footer__img" src="../images/main/enamad.png" alt="" />
                    </a>
                    <a className="footer__img-link" href="#">
                        <img
                            className="footer__img"
                            src="../images/main/etehadie.png"
                            alt=""
                        />
                    </a>
                    <a className="footer__img-link" href="#">
                        <img className="footer__img" src="../images/main/neshan.png" alt="" />
                    </a>
                </div>
            </div>
            {/* <div className="footer__section-second">
                <ul className="footer__list">
                    <li className="footer__item">
                        <a className="footer__link" href="#">
                            <i className="footer__icon bi-instagram"></i>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="#">
                            <i className="footer__icon bi-twitter"></i>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="#">
                            <i className="footer__icon bi-linkedin"></i>
                        </a>
                    </li>
                    <li className="footer__item">
                        <a className="footer__link" href="#">
                            <i className="footer__icon bi-telegram"></i>
                        </a>
                    </li>
                </ul>
            </div> */}
            <div id='footer__social-media'>
                <Social/>
            </div>
        </footer>
    );
}

export default Footer;