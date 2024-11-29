import React from 'react';
import './Home.css'; // Vamos criar um arquivo CSS específico para a Home
import homeImage from '../assets/cachorro.png';

function Home() {
    return (
        <div className="home-container">
            <div className="home-banner">
                <h1>Bem-vindo ao Connect Pet!</h1>
                <p>
                    A plataforma que conecta pessoas e pets em busca de um lar cheio de amor. Aqui você pode gerenciar pets para adoção ou encontrar um novo amigo para sua família.
                </p>
            </div>
            <div className="home-image">
            <img src={homeImage} alt="Pets felizes" />
            </div>
        </div>
    );
}

export default Home;
