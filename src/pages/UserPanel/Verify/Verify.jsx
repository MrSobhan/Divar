import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/authContext';

import './Verify.css'

const Verify = () => {
    const authContext = useContext(AuthContext)
    const [isUserVerify, setIsUserVerify] = useState(false)
    const [verifyError, setVerifyError] = useState(false)
    const [userNationalCode, setUserNationalCode] = useState('')

    const token = authContext.getLocalStorage('token')

    useEffect(() => {
        authContext.getMe().then((user) => {
            // console.log("User ->", user);
            setIsUserVerify(user.verified)
        });
    }, [])

    const VerifyUserHandler = () => {
        const nationalCodeRegex = RegExp(/^[0-9]{10}$/);
        const nationalCodeTestResult = nationalCodeRegex.test(userNationalCode);

        if (nationalCodeTestResult) {
            fetch(`${authContext.baseUrl}/v1/user/identity`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nationalCode: userNationalCode }),
            }).then((res) => {
                if (res.status === 200) {
                    setVerifyError(false)
                    setIsUserVerify(true)

                } else {
                    setVerifyError(true)
                }
            });
        } else {
            setVerifyError(true)
        }
    }
    return (
        <div className="verify" id="verify-container">
            {
                isUserVerify ? (
                    <div className="verified">
                        <p>تأیید هویت شده</p>
                        <span>تأیید هویت شما در فروردین ۱۴۰۳ از طریق کد ملی انجام شد.</span>
                        <img
                            width="100"
                            height="100"
                            src="https://cdn-icons-png.flaticon.com/512/8622/8622624.png"
                            alt="approval--v1"
                        />
                    </div>
                ) : (
                    <>
                        <div className="verify__notics">
                            <p className="verify__notic">
                                تأیید هویت برای افزایش اعتماد کاربران و سلامت تعاملات انجام
                                می‌شود. اطلاعات شناسایی شما در هیچ صفحه‌ای نمایش داده نمی‌شود.
                            </p>
                            <div className="verify__notic">
                                <p>
                                    حساب شما در دیوار با شمارهٔ
                                    <span id="phone-number"></span> فعال است.
                                </p>
                            </div>
                        </div>
                        <div className="verify__nationality">
                            <span className="verify__nationality-title">ملیت</span>
                            <span className="verify__nationality-subtitle">ملیت خود را انتخاب کنید.</span>
                            <div className="verify__nationality-select">
                                <div className="verify__nationality-select-wrapper">
                                    <select>
                                        <option value="ایرانی">ایرانی</option>
                                        <option value="اتباع خارجی">اتباع خارجی</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="verify__national-code">
                            <span className="verify__national-code-title">کد ملی</span>
                            <span className="verify__national-code-subtitle">لطفا کد ملی خود را وارد کنید.</span>
                            <form className="verify__national-code-form" action="#">
                                <input
                                    className="verify__national-input"
                                    type="text"
                                    id="verify-input"
                                    placeholder="مثال : 127777777"
                                    onChange={(e) => setUserNationalCode(e.target.value)}
                                    value={userNationalCode}
                                />
                                <span id="verify-error" className="error" style={{display : `${verifyError ? 'flex' : 'none'}`}}>
                                    کد ملی وارد شده اشتباه است
                                    <i className="bi bi-x-circle"></i>
                                </span>
                                <button
                                    className="verify__national-btn"
                                    id="verify-btn"
                                    type="button"
                                    onClick={VerifyUserHandler}>
                                    ثبت
                                </button>
                            </form>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default Verify;