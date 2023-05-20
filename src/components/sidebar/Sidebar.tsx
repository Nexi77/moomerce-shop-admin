import { AttachMoney, LineStyle, PermIdentity, Report, Storefront, Timeline, TrendingUp, WorkOutline } from '@mui/icons-material';
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
    {
        icon: <Timeline />,
        text: 'Analytics',
        link: '/'
    },
    {
        icon: <TrendingUp />,
        text: 'Sales',
        link: '/'
    }
]},
{
    title: 'Quick Menu',
    children: [
        {
            icon: <PermIdentity />,
            link: '',
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
            text: 'Transactions'
        }
    ]
},
{
    title: 'Staff',
    children: [
        {
            icon: <WorkOutline />,
            link: '',
            text: 'Manage'
        },
        {
            icon: <Timeline />,
            link: '',
            text: 'Analytics',
        },
        {
            icon: <Report />,
            link: '',
            text: 'Reports'
        }
    ],
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
