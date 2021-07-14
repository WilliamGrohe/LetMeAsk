import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import darkIllustrationImg from '../assets/images/dark-theme/Dark-Illustration.svg'
import logoImg from '../assets/images/logo.svg'
import darkLogoImg from '../assets/images/dark-theme/Dark-Logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import darkGoogleIcoImg from '../assets/images/dark-theme/Google.svg'

import { ToggleThemeButton } from '../components/ToggleThemeButton'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

import { database } from '../services/firebase'

import '../styles/auth.scss'

export function Home() {
    const history = useHistory();
    const theme = useTheme();

    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');


    async function handleCreateRoom(){
        if(!user) {
            await signInWithGoogle()
        }

        //redirecionamento para pagina de criação de sala
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Essa sala não existe.');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Essa sala já foi encerrada.');
            return;
        }

        history.push(`/rooms/${roomCode}`)
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
                <nav className="navTheme">
            
                    <span id="btnTheme">
                        <span id="hint" >Alterar tema</span>
                        <ToggleThemeButton />
                    </span>
                </nav>
                <div className={`main-content`}>                
                    <img src={theme.theme === 'light' ?
                        logoImg : darkLogoImg} 
                        alt="Letmeask"
                    />                    

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={theme.theme === 'light' ?
                            googleIconImg : darkGoogleIcoImg} 
                            alt="Logo do Google"
                        />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}