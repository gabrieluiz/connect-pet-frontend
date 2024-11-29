import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token); // Salva o token no localStorage

            // Aguarda a atualização do token e navega para a página de Pets
            navigate('/pets', { replace: true });
        } catch (error) {
            alert('Erro ao fazer login: ' + error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Entrar</button>
        </form>
    );
}

export default Login;
