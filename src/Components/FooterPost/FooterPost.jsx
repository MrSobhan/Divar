import React from 'react';
import Social from '../Social/Social';
import './FooterPost.css'
const FooterPost = () => {
    return (
        <footer className='main'> 
            <div className="container-fluid">
                <div className="footer__wrapper">
                    <div className="footer__right">
                        <a className="footer__logo-link" href="#">
                            <img className="footer__logo" src="/public/images/header/logo.svg" />
                        </a>
                        <div className="footer__links">
                            <a className="footer__link" href="#">درباره دیوار</a>
                            <a className="footer__link" href="#">پشتیبانی و قوانین</a>
                            <a className="footer__link" href="#">بلاگ دیوار</a>
                        </div>
                    </div>
                    <div className="footer__left">
                        <div className="footer__social-media" id="footer__social-media">
                            <Social/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterPost;