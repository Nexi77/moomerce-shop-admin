import logo from '@/assets/images/moomerce-logo.png'
import { Link } from 'react-router-dom';
import { DarkMode, LightMode, MenuOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import topbarStyleModule from './topbar.module.scss';
import Avatar from '../user-avatar/Avatar';

const Topbar = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div className={topbarStyleModule.topbar}>
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
                        >
                            <MenuOutlined fontSize='inherit' />
                        </button>
                        <Avatar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar