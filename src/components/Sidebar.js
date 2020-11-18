import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

const Sidebar = () => {
  return (
    <ProSidebar collapsed={false}>
      <SidebarHeader>Travel Tracker</SidebarHeader>
      <Menu iconShape="square">
        <MenuItem icon="🎇">Home</MenuItem>
        <SubMenu title="Components" icon="🧨">
          <MenuItem>Component 1</MenuItem>
          <MenuItem>Component 2</MenuItem>
        </SubMenu>
      </Menu>
      <SidebarFooter>By Iurii Kogan</SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
