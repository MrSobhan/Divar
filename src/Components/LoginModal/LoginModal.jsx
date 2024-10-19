import React, { useContext, useState } from 'react';
import AuthContext from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import swal from "sweetalert";
import "./LoginModal.css";
const LoginModal = ({ isShow, setIsShow }) => {
    const authContext = useContext(AuthContext)
    const navigator = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [isShowStep2, setIsShowStep2] = useState(false)
    const [errorLogin, setErrorLogin] = useState('')
    const [requestTimer, setRequestTimer] = useState(0)
    const [isEndTimeOtp, setIsEndTimeOtp] = useState(false)
    const [valueOtpCode, setValueOtpCode] = useState('')
    const [isLoader, setIsLoader] = useState(false)


    const submitNumber = async () => {

        const phoneRegex = RegExp(/^(09)[0-9]{9}$/);
        const isValidPhoneNumber = phoneRegex.test(phoneNumber);

        if (isValidPhoneNumber) {
            setIsLoader(true)
            const res = await fetch(`${authContext.baseUrl}/v1/auth/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone: phoneNumber }),
            });

            if (res.status === 200) {
                setErrorLogin('')
                setIsLoader(false)
                setIsShowStep2(true)

                let count = 30;
                setRequestTimer(count)


                let timer = setInterval(() => {
                    count--;
                    setRequestTimer(count)
                    if (count === 0) {
                        clearInterval(timer);
                        setIsEndTimeOtp(true)
                    }
                }, 1000);
            }
        } else {
            setErrorLogin("شماره تماس وارد شده معتبر نیست")
        }
    }

    const verifyOtp = async () => {
        const otpRegex = RegExp(/^\d{4}$/);
        const isValidOtp = otpRegex.test(valueOtpCode);

        if (isValidOtp) {
            setIsLoader(true)
            const res = await fetch(`${authContext.baseUrl}/v1/auth/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone: phoneNumber, otp: valueOtpCode }),
            });

            if (res.status === 200 || res.status === 201) {
                const response = await res.json();
                authContext.setLocalStorage("token", response.data.token);
                setIsLoader(false)
                setErrorLogin('')
                setIsShow(false)
                setIsShowStep2(false)
                swal({
                    title: "لاگین با موفقیت انجام شد",
                    icon: "success",
                    buttons: "ورود به پنل کاربری"
                }).then(() => (navigator('/userPanel')));

            } else if (res.status === 400) {
                setErrorLogin("کد وارد شده نامعتبر هست")
            }
        } else {
            setErrorLogin("کد وارد شده نامعتبر هست")
        }
    }

    return (
        <div className={`login-modal ${isShowStep2 ? 'active_step_2' : ''} ${isShow ? 'login-modal--active' : ''}`} id="login-modal">
            <section className="login_modal_step_1">
                <div className="login-modal__header">
                    <div className="login-modal__header-wrapper">
                        <span className="login-modal__title">ورود به حساب کاربری</span>
                        <button className="login-modal__header-btn" onClick={() => setIsShow(false)}>
                            <i className="login-modal__icon bi bi-x"></i>
                        </button>
                    </div>
                </div>
                <div className="login-modal__main">
                    <span className="login-modal__main-title"
                    >شماره موبایل خود را وارد کنید.</span>
                    <p className="login-modal__main-notic">
                        قبل از ثبت آگهی، لطفاً وارد حساب خود شوید.
                    </p>
                    <p className="login-modal__main-notic">
                        کد تأیید به این شماره پیامک می‌شود.
                    </p>
                    <div className="login-modal__form-wrapper">
                        <form className="login-modal__form" action="#">
                            <input
                                className="login-modal__input phone_Number_input"
                                placeholder="شماره موبایل"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                            <span className="step-1-login-form__error">
                                {errorLogin.length ? errorLogin : ''}
                            </span>
                        </form>
                        <span className="login-modal__form-text">+98</span>
                    </div>
                    <div className="login-modal__condition">
                        <a className="login-modal__condition-link" href="#">شرایط استفاده از خدمات </a>
                        <span className="login-modal__condition-text">و </span>
                        <a className="login-modal__condition-link" href="#">حریم خصوصی </a>
                        <span className="login-modal__condition-text">دیوار را میپذیرم. </span>
                    </div>
                </div>
                <div className="login-modal__footer">
                    <button className="login-modal__footer-btn submit_phone_number_btn" onClick={submitNumber}>
                        {isLoader && <Spinner animation="border" variant="light" />}
                        تایید
                    </button>
                </div>
            </section>
            <section className="login_modal_step_2">
                <div className="login-modal__header">
                    <div className="login-modal__header-wrapper">
                        <span className="login-modal__title">ورود به حساب کاربری</span>
                        <button className="login-modal__header-btn" onClick={() => { setIsShow(false); setIsShowStep2(false) }}>
                            <i className="login-modal__icon bi bi-x"></i>
                        </button>
                    </div>
                </div>
                <div className="login-modal__main">
                    <span className="login-modal__main-title">کد تأیید را وارد کنید</span>
                    <p className="login-modal__main-notic">
                        کد پیامک‌شده به شمارۀ «<span className="user_number_notice"
                        >{phoneNumber}</span>» را وارد کنید.
                    </p>

                    <div className="login-modal__form-wrapper">
                        <form className="login-modal__form" action="#">
                            <input
                                className="login-modal__input code_input"
                                maxLength="4"
                                placeholder="کد تایید 4 رقمی"
                                onChange={(e) => setValueOtpCode(e.target.value)}
                                value={valueOtpCode}
                            />
                            <span className="step-2-login-form__error">
                                {errorLogin.length ? errorLogin : ''}
                            </span>
                        </form>
                    </div>
                    <div className="login-modal__condition">
                        <span className="login-modal__condition-text login-change-number"
                        >تغییر شماره موبایل</span>
                    </div>
                </div>
                <div className="login-modal__footer">
                    <button className="login-modal__footer-btn req_new_code_btn" style={{ display: `${isEndTimeOtp ? 'block' : 'none'}` }}>
                        درخواست کد
                    </button>
                    <div className="request_timer" style={{ display: `${!isEndTimeOtp ? 'block' : 'none'}` }}>
                        <span>درخواست مجدد </span>
                        <span>{requestTimer}</span>
                    </div>
                    <button className="login-modal__footer-btn login_btn" onClick={verifyOtp}>
                        {isLoader && <Spinner animation="border" variant="light" />}
                        ورود
                    </button>
                </div>
            </section>
            <div className="overlay login_modal_overlay"></div>
        </div>
    );
}

export default LoginModal;