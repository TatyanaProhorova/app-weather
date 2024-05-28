import {ChangeEvent, useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";

import './Header.css';

function Header() {
    const themeContext = useContext(ThemeContext);
    
    const handleChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
        // TODO: убрать as
        const value: 'dark' | 'light' = event.target.value as 'dark' | 'light';
        themeContext.changeValue('light')
    }

    // TODO: написать компонент ToggleButton
    return (
        <div>
            <label className="switch">
                <input type="checkbox" name="theme" value={themeContext.value} onChange={handleChangeTheme}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Header;
