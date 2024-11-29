import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Pets.css';
import { API_URL } from '../config'; // Importa a URL da API

function Pets() {
    const [pets, setPets] = useState([]);
    const [form, setForm] = useState({ id: null, name: '', gender: '', age: '', species: '' });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Função para buscar os pets
    const fetchPets = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await axios.get(`${API_URL}/api/pets`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPets(response.data);
        } catch (error) {
            alert('Erro ao carregar pets: ' + error.response?.data?.message);
        }
    };

    // Função para criar ou editar um pet
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/pets/${form.id}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPets((prevPets) =>
                    prevPets.map((pet) => (pet.id === form.id ? { ...pet, ...form } : pet))
                );
            } else {
                const response = await axios.post(`${API_URL}/api/pets`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPets((prevPets) => [...prevPets, response.data]);
            }

            setForm({ id: null, name: '', gender: '', age: '', species: '' });
            setIsEditing(false);
        } catch (error) {
            alert('Erro ao salvar pet: ' + error.response?.data?.message);
        }
    };

    // Função para carregar os dados do pet no formulário para edição
    const handleEdit = (pet) => {
        setForm(pet);
        setIsEditing(true);
    };

    // Função para excluir um pet
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/api/pets/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
        } catch (error) {
            alert('Erro ao excluir pet: ' + error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    return (
        <div className="pets-container">
            <div className="form-container">
                <h2>{isEditing ? 'Editar Pet' : 'Cadastrar Novo Pet'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <select
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        required
                    >
                        <option value="">Selecione o sexo</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Idade"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Espécie"
                        value={form.species}
                        onChange={(e) => setForm({ ...form, species: e.target.value })}
                        required
                    />
                    <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar'}</button>
                </form>
            </div>

            <div className="list-container">
                <h2>Lista de Pets</h2>
                <ul>
                    {pets.map((pet) => (
                        <li key={pet.id} className="pet-item">
                            <div>
                                <strong>Nome:</strong> {pet.name}
                            </div>
                            <div>
                                <strong>Espécie:</strong> {pet.species}
                            </div>
                            <div>
                                <strong>Sexo:</strong> {pet.gender}
                            </div>
                            <div>
                                <strong>Idade:</strong> {pet.age} anos
                            </div>
                            <div className="actions">
                                <button onClick={() => handleEdit(pet)}>Editar</button>
                                <button onClick={() => handleDelete(pet.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Pets;
