import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { Person, Settings, Logout } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import avatarStyleModule from './avatar.module.scss';
import topbarStyleModule from '../topbar/topbar.module.scss';

const Avatar = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClose = () => setAnchorEl(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const open = Boolean(anchorEl);
    const id = open ? 'account-popover' : undefined;
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
                    <div className={avatarStyleModule.popoverEntry}>
                        <span className={avatarStyleModule.labelSpan}>Username:</span>
                        <span>User</span>
                    </div>
                    <Divider />
                    <div className={avatarStyleModule.buttonsList}>
                        <Link
                            to="/" 
                            className={`${topbarStyleModule.menuEntry} popover-button`}
                        >
                            <Settings fontSize='inherit' />
                            Settings
                        </Link>
                        <button type='button' className={`${topbarStyleModule.menuEntry} popover-button`}>
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