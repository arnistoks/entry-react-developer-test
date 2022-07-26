import React from 'react';
import {useNavigate} from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <section className="sectionPage404">
                <h1 className="titlePage404">Page not found</h1>
                <button className="buttonPage404" onClick={() => navigate('/')}>Back to Home</button>
        </section>
    );
};

export default Page404;