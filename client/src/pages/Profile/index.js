import React, { useEffect, useState } from 'react'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import { FiPower } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function Logon() {
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    async function handleDeletIncident(id) {

        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }

    }

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])
    return (
        <div className="profile-container">
            <header>
              <img src={logoImage} alt="be the hero"/>  
              <span>Bem vinda, {ongName}</span>
            
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower size={18} color="E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeletIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}