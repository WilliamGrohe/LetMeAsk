import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import darkIllustrationImg from '../assets/images/dark-theme/Dark-Illustration.svg'
import logoImg from '../assets/images/logo.svg'
import darkLogoImg from '../assets/images/dark-theme/Dark-Logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { database } from '../services/firebase'

import '../styles/auth.scss'

export function NewRoom() {
    const { user } = useAuth();
    const theme = useTheme()

    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        
        // history.replace(`admin/rooms/${firebaseRoom.key}`)
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth" className={theme.theme}>
            <aside className={theme.theme}>
                <img src={theme.theme === 'light' ?
                        illustrationImg : darkIllustrationImg} 
                    alt="Ilustração simbolizando perguntas e respostas"
                />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </aside>
            <main className={theme.theme}>
                <div className="main-content">
                    <img src={theme.theme === 'light' ?
                            logoImg : darkLogoImg} 
                        alt="Letmeask"
                    />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}