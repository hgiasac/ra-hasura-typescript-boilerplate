import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { RouteGroup } from "../shared/components/Layout/Menu";

export const ROUTE_USERS = "/users";

export const sidebarRoutes: readonly RouteGroup[] = [{
  name: "users",
  title: "layout.menu.users",
  iconComponent: AccountBoxIcon,
  items: [{
    href: ROUTE_USERS,
    title: "layout.menu.users",
    name: "users-list",
    iconComponent: AccountBoxIcon
  }]
}];
