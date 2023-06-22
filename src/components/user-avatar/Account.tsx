import Popover from '@mui/material/Popover';
import { useState, useContext } from 'react';
import { Person, Logout, LightMode, DarkMode } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { ThemeContext } from '@/contexts/ThemeContext';
import useSwr from 'swr';
import fetcher from '@/utils/fetcher';
import { UserModel } from '@/types/app';
import axiosInstance from '@/config/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';
import { cache } from 'swr/_internal';
import topbarStyleModule from '../topbar/topbar.module.scss';
import avatarStyleModule from './avatar.module.scss';

const Avatar = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const { setIsAuthenticated } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClose = () => setAnchorEl(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const open = Boolean(anchorEl);
    const id = open ? 'account-popover' : undefined;
    const { data } = useSwr<UserModel | null>('users/current', fetcher)
    const handleLogout = async () => {
        try {
            await axiosInstance.delete('sessions')
            cache.delete('users/current');
            setIsAuthenticated(false);
        }
        catch (e) {
            cache.delete('users/current');
            setIsAuthenticated(false);
            toast.error('Error while logging out')
        }
    }
    return (
        <>
            <button 
                type='button' 
                aria-describedby={id}
                className={`btn clean ${avatarStyleModule.avatar}`} 
                onClick={handleClick}
            >
                <Person fontSize='inherit' />
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                style={{
                    transform: `translateY(10px)`
                }}
            >
                <div className={avatarStyleModule.avatarPopover}>
                    <div className={`${avatarStyleModule.avatar} ${avatarStyleModule.alignSelf}`}>
                        <Person fontSize='inherit' />
                    </div>
                    <div className={avatarStyleModule.popoverEntry}>
                        <span className={avatarStyleModule.labelSpan}>Username:</span>
                        <span>{ data?.name }</span>
                    </div>
                    <Divider />
                    <div className={avatarStyleModule.buttonsList}>
                        {/* <Link
                            to="/" 
                            className={`${topbarStyleModule.menuEntry} popover-button`}
                        >
                            <Settings fontSize='inherit' />
                            Settings
                        </Link> */}
                        <button 
                                type="button" 
                                className={`${topbarStyleModule.menuEntry} popover-button ${avatarStyleModule.themeSwitcher}`}
                                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                            >
                                {theme === 'dark' ? <LightMode fontSize='inherit' /> : <DarkMode fontSize='inherit' /> }
                                Theme
                        </button>
                        <button type='button' className={`${topbarStyleModule.menuEntry} popover-button`} onClick={handleLogout}>
                            <Logout fontSize='inherit' />
                            Logout
                        </button>
                    </div>
                </div>
            </Popover>
        </>
    )
}

export default Avatar;