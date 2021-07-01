import { ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme';

import '../styles/toggle-theme-button.scss'

export function logoImg(){
   return("../assets/images/delete.svg")
}

export function ToggleThemeButton() {
    
    const { theme, toggleTheme } = useTheme();
    
    console.log(theme)

    return(
        // <button 
        //     className="switch_container"
        //     onClick={toggleTheme}
        // >
        //     <input id="switch-shadow" className="switch switch--shadow" type="checkbox"/>
        //     <label htmlFor="switch-shadow"></label>
        //     <span>{theme}</span>
        // </button>

        <button className="" onClick={toggleTheme}>Dark Theme On/Off</button>
    )
}