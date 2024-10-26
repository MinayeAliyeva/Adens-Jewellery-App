import { InavLinksData, navLinksData } from '../constants'
import NavLink from './NavLink';
import { Content } from 'antd/es/layout/layout';

const renderNavLink = (link:InavLinksData) => <NavLink key={link.path} to={link.path} label={link.label}/>;

export const HeaderMenu = () => {
  return (
    <Content style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {navLinksData?.map(renderNavLink)}
    </Content>
  )
}
