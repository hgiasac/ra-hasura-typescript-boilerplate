import { useMediaQuery, Theme } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React, { useState, FC } from "react";
import { useTranslate, DashboardMenuItem, MenuItemLink } from "react-admin";
import { useSelector } from "react-redux";
import { IAppState } from "../../store/types";
import SubMenu from "./SubMenu";

type MenuName = "menuCatalog" | "menuSales" | "menuCustomers";

interface IProps {
  dense: boolean;
  logout: () => void;
  onMenuClick: () => void;
}

const Menu: FC<IProps> = ({ onMenuClick, dense, logout }) => {
  const [state, setState] = useState({
    menuCatalog: false,
    menuSales: false,
    menuCustomers: false,
  });
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("xs")
    );
  const open = useSelector((st: IAppState) => st.admin.ui.sidebarOpen);
  useSelector((st: IAppState) => st.config && st.config.theme); // force rerender on theme change

  const handleToggle = (menu: MenuName) => {
    setState((st) => ({ ...st, [menu]: !state[menu] }));
  };

  return (
        <div>
            {" "}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle("menuCatalog")}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="layout.menu.catalog"
                icon={<Settings />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/users`}
                    primaryText={translate(`resources.users.name`, {
                      smart_count: 2,
                    })}
                    // leftIcon={<products.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>

            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate("resources.configuration.name")}
                    leftIcon={<Settings />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
  );
};

export default Menu;
