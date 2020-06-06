import { makeStyles, Typography } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import * as React from "react";
import { useTranslate, AppBar, MenuItemLink, UserMenu } from "react-admin";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  spacer: {
    flex: 1
  }
});

const ConfigurationMenu = React.forwardRef<any, any>((props, ref) => {
  const translate = useTranslate();

  return (
    <MenuItemLink
      ref={ref}
      to="/configuration"
      primaryText={translate("configuration")}
      leftIcon={<Settings />}
      onClick={props.onClick}
    />
  );
});

const CustomUserMenu = (props: any): JSX.Element => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
);

type CustomAppBarProps = {

};
const CustomAppBar = (props: CustomAppBarProps): JSX.Element => {
  const classes = useStyles(props);

  return (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
      <span className={classes.spacer} />
    </AppBar>
  );
};

export default CustomAppBar;
