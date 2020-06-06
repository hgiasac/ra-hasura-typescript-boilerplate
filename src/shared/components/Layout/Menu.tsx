import { useMediaQuery, Theme } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import * as React from "react";
import { useTranslate, DashboardMenuItem, MenuItemLink } from "react-admin";
import { useSelector } from "react-redux";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { AppState } from "../../store/types";
import SubMenu from "./SubMenu";

export type RouteItem = {
  readonly name: string
  readonly title: string
  readonly href: string
  readonly iconComponent?: OverridableComponent<any>
};

export type RouteGroup = {

  readonly name: string
  readonly title: string
  readonly iconComponent?: OverridableComponent<any>
  readonly items: readonly RouteItem[]
};

type MenuProps = {
  readonly dense: boolean
  readonly logout: VoidFunction
  readonly onMenuClick: VoidFunction
  readonly subMenus: readonly RouteGroup[]
};

const Menu: React.FC<MenuProps> = ({ onMenuClick, dense, logout, subMenus }) => {
  const [state, setState] = React.useState(subMenus.reduce((acc, sm) => ({
    ...acc,
    [sm.name]: false
  }), {}));
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  const open = useSelector((st: AppState) => st.admin.ui.sidebarOpen);
  useSelector((st: AppState) => st.config && st.config.theme); // force rerender on theme change

  const handleToggle = (menu: string): void => {
    setState((st) => ({ ...st, [menu]: !state[menu] }));
  };

  const renderMenuItem = (item: RouteItem): JSX.Element => (
    <MenuItemLink
      key={`menu-${item.title}`}
      to={item.href}
      primaryText={translate(item.title)}
      leftIcon={item.iconComponent ? <item.iconComponent /> : null}
      onClick={onMenuClick}
      sidebarIsOpen={open}
      dense={dense}
    />
  );

  const renderSubMemu = ({ name, title, items, iconComponent: IconComponent }: RouteGroup): JSX.Element => (
    <SubMenu
      handleToggle={() => handleToggle(name)}
      isOpen={state[name]}
      sidebarIsOpen={open}
      name={title}
      icon={IconComponent ? <IconComponent /> : undefined}
      dense={dense}>
      {items.map((r) => renderMenuItem(r))}
    </SubMenu>
  );

  return (
    <div>
      {" "}
      <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
      {subMenus.map((sm) => renderSubMemu(sm))}

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
