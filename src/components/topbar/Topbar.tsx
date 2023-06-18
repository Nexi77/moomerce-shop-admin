import logo from '@/assets/images/moomerce-logo.png'
import { Link } from 'react-router-dom';
import { DarkMode, LightMode, MenuOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { MenuContext } from '@/contexts/MenuContext';
import topbarStyleModule from './topbar.module.scss';
import Account from '../user-avatar/Account';

const Topbar = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const { setMenuState } = useContext(MenuContext)
    const handleMenuClick = () => setMenuState(prev => !prev)

    return (
        <header className={topbarStyleModule.topbar}>
            <div className={topbarStyleModule.topbarWrapper}>
                <div className="topLeft">
                    <Link to="/">
                        <img src={logo} alt='moomerce-shop logo' className={topbarStyleModule.logo} />
                    </Link>
                </div>
                <div className="topRight">
                    <div className={topbarStyleModule.topbarIcons}>
                        <div className={topbarStyleModule.desktopMenu}>
                            <button 
                                type="button" 
                                className={`btn clean ${topbarStyleModule.menuEntry}`}
                                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                            >
                                {theme === 'dark' ? <LightMode fontSize='inherit' /> : <DarkMode fontSize='inherit' /> }
                                Theme
                            </button>
                        </div>
                        <button 
                            type="button" 
                            className={`btn clean ${topbarStyleModule.menuToggle}`}
                            onClick={handleMenuClick} 
                        >
                            <MenuOutlined fontSize='inherit' />
                        </button>
                        <Account />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Topbar