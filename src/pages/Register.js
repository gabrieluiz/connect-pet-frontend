import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/users/register', form);
            alert('Usuário cadastrado com sucesso!');
            navigate('/login'); // Redireciona para a tela de login
        } catch (error) {
            alert('Erro ao cadastrar usuário: ' + error.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            <input
                type="text"
                placeholder="Nome"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />
            <button type="submit">Cadastrar</button>
        </form>
    );
}

export default Register;
