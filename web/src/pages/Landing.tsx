import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../images/logo.svg';

import { Container, ContentWrapper } from '../styles/pages/landing';

const Landing = () => {
    return (
        <Container>
            <ContentWrapper>
                <img src={logoImg} alt="Happy" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div className="location">
                    <strong>Jandira</strong>
                    <span>São Paulo</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </ContentWrapper>
        </Container>
    )
}

export default Landing;