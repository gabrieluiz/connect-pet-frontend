import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            {/* Logo no canto esquerdo */}
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <img src="logo.svg" alt="Connect Pet Logo" />
                <span>Connect Pet</span>
            </div>

            {/* Links de navegação */}
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/pets">Pets</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Cadastro</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
