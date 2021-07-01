import { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme'

import '../styles/question.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered ?: boolean;
    isHighlighted ?: boolean;
}

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children
}: QuestionProps) {

    const theme = useTheme();

    return(
        <div 
            className={`
                question 
                ${isAnswered ? 'answered' : ''} 
                ${isHighlighted && !isAnswered ? 'highlighted' : '' }
                ${theme.theme}
            `}
        >
            <p>{content}</p>
            <footer className={theme.theme}>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>
                <div className={theme.theme}>
                    {children}
                </div>
            </footer>
        </div>
    );
}