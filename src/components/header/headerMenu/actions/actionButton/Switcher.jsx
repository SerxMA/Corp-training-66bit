import { useEffect } from 'react';
import useTheme from '../../../../../customHooks/useTheme';
import Moon from './icons/Moon'

const Switcher = () => {

    const [theme, setTheme] = useTheme();

    const toggleTheme = () => {
        setTheme((cv) => cv === 'light' ? 'dark' : 'light')
    }

    useEffect( () => theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark'), [theme] );

    return (
        <button onClick={toggleTheme}>
            <Moon />
        </button>
    );
};

export default Switcher;