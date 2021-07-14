import { useTheme } from '../hooks/useTheme'
import lampadaImg from '../assets/images/lightbulb-solid.svg'
import lampadaBrkImg from '../assets/images/lightbulb.svg'

import '../styles/toggle-theme-button.scss'

export function logoImg(){
   return("../assets/images/delete.svg")
}

export function ToggleThemeButton() {
    
    const { toggleTheme, theme } = useTheme();

    return(
        // <button 
        //     className="switch_container"
        //     onClick={toggleTheme}
        // >
        //     <input id="switch-shadow" className="switch switch--shadow" type="checkbox"/>
        //     <label htmlFor="switch-shadow"></label>
        //     <span>{theme}</span>
        // </button>

        <>
        <button className="toggleThemeBtn" onClick={toggleTheme}>
            <img src={theme === 'light' ? lampadaImg : lampadaBrkImg} />
            </button>
        </>
    )
}