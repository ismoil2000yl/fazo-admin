import React from "react";
import menus from "./menus";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      // onBreakpoint={(broken) => {
      //   console.log(broken);
      // }}
      // onCollapse={(collapsed, type) => {
      //   console.log(collapsed, type);
      // }}
    >
      <Menu
        mode="inline"
        theme="dark"
        // theme="light"
        className="h-full"
        defaultSelectedKeys={[location.pathname.replace("/", "")]}
        defaultOpenKeys={[location.pathname.split("/")[1]]}
        onClick={(item) => navigate(`/${item.key}`)}
        items={menus}
      />
    </Sider>
  );
};

export default sidebar;
