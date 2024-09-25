import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authContext';
import { Link } from 'react-router-dom';

const Social = () => {
    const authContext = useContext(AuthContext)
    const [social, setSocial] = useState([])
    useEffect(() => {
        fetch(`${authContext.baseUrl}/v1/social`)
            .then(res => res.json()).then(social => {
                setSocial(social.data.socials);
                // console.log(social.data.socials);
            })
    }, [])
    return (
        <>

            {
                social.map((social) => (
                    <Link to={social.link} className="sidebar__icon-link" key={social._id}>
                        <img width="18px" height="18px" alt={social.name} src={authContext.baseUrl+'/'+social.icon.path} className="sidebar__icon bi bi-twitter" />
                    </Link>
                ))
            }
        </>
    );
}

export default Social;