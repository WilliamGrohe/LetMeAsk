import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import darkLogoImg from '../assets/images/dark-theme/Dark-Logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { ToggleThemeButton } from '../components/ToggleThemeButton'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

// import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { useTheme } from '../hooks/useTheme'

import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    // const { user } = useAuth();
    const history = useHistory()
    const theme = useTheme();

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { questions, title} = useRoom(roomId)

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja remover a pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
    }

    return (
        <div id="page-room" className={theme.theme}>
            <header>
                <div className="content">
                    <img src={theme.theme === 'light' ?
                            logoImg : darkLogoImg} 
                        alt="Letmeask" 
                    />
                    <div>
                        <nav className="navTheme">
                            <span id="btnTheme">
                                <span id="hint" >Alterar tema</span>
                                <ToggleThemeButton />
                            </span>
                        </nav>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} className={`button ${theme.theme} isOutlined`}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main className={theme.theme}>
                <div className={`room-title ${theme.theme}`}>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span> }
                </div>

                <div className={`question-list ${theme.theme}`}>
                    {questions.map(question => {
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        className="btn-check"
                                    >
                                        <img src={checkImg} alt="Marcar como respondida"/>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(question.id)}
                                        className="btn-highlighted"
                                    >
                                        <img src={answerImg} alt="Dar destaque à pergunta"/>
                                    </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                    className="btn-delete"
                                >
                                    <img src={deleteImg} alt="Deletar pergunta"/>
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}