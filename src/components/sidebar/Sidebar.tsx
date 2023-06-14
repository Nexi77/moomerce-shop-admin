import { AttachMoney, LineStyle, PermIdentity, Storefront } from '@mui/icons-material';
import { useContext } from 'react';
import { MenuContext } from '@/contexts/MenuContext';
import sidebarStyleModule from './sidebar.module.scss';
import SingleMenu, { MenuSectionModel } from './SingleMenu';

const menu: MenuSectionModel[] = [
{ title: 'Dashboard', 
children: [
    {
        icon: <LineStyle />,
        text: 'Home',
        link: '/'
    },
]},
{
    title: 'Quick Menu',
    children: [
        {
            icon: <PermIdentity />,
            link: 'users',
            text: 'Users'
        },
        {
            icon: <Storefront />,
            link: '',
            text: 'Products'
        },
        {
            icon: <AttachMoney />,
            link: '',
            text: 'Orders'
        }
    ]
}]

const Sidebar = () => {
    const { menuOpen } = useContext(MenuContext);
    return (
        <div className={`${sidebarStyleModule.sidebar} ${menuOpen ? sidebarStyleModule.sidebarOpened : ''}`}>
            <div className="sidebarWrapper">
                <SingleMenu menu={menu}/>
            </div>
        </div>
    )
}

export default Sidebar;
