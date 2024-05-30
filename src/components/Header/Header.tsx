import {ChangeEvent, useContext} from "react";
import {ThemeContext} from "../../contexts/ThemeContext";

import './Header.scss';

function Header() {
    const themeContext = useContext(ThemeContext);

    const toggleChangeTheme = () => {
        themeContext.changeValue(themeContext.value === 'dark' ? 'light' : 'dark')
    }
    // ???  ???  ???
    // const toggleChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    //     // TODO: убрать as
    //     const value: 'dark' | 'light' = event.target.value as 'dark' | 'light';
    //     themeContext.changeValue('light')
    // }

    return (
        <div className="container-for-swich">
            <label className="switch">
                <input type="checkbox" name="theme" value={themeContext.value} onChange={toggleChangeTheme}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Header;
