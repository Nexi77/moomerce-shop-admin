import { Link } from 'react-router-dom';
import { generateUniqueId } from '@/helpers/utils';
import sidebarStyleModule from './sidebar.module.scss';

interface MenuSectionChildrenModel {
    icon: React.ReactNode;
    text: string;
    link: string;
}

export interface MenuSectionModel {
    title: string;
    children: MenuSectionChildrenModel[]
}

interface Props {
    menu: MenuSectionModel[]
}

const MenuLink = ({ child }: { child: MenuSectionChildrenModel }) => (
    <li className={sidebarStyleModule.sidebarListItem}>
        <Link to={child.link}>
            { child.icon }
            { child.text }
        </Link>
    </li>
)

const SingleMenu = ({ menu }: Props) => (
    <>
        { menu.map((entry) => (
            <div className={sidebarStyleModule.sidebarMenu} key={`${entry.title}-${generateUniqueId()}`}>
                <h3 className={sidebarStyleModule.sidebarTitle}>{ entry.title }</h3>
                <ul className={sidebarStyleModule.sidebarList}>
                    { entry.children.map((child) => (
                        <MenuLink child={child} key={`${child.text}-${generateUniqueId()}`} />
                    ))}
                </ul>
            </div>
        )) }
    </>
);

export default SingleMenu;