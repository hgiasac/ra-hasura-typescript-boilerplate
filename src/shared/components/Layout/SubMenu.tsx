import { makeStyles, Collapse, Divider, List, ListItemIcon, MenuItem, Tooltip, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { Fragment, FC, ReactElement } from "react";
import { useTranslate } from "react-admin";

const useStyles = makeStyles((theme) => ({
  icon: { minWidth: theme.spacing(5) },
  sidebarIsOpen: {
    paddingLeft: 25,
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
  },
  sidebarIsClosed: {
    paddingLeft: 0,
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
  },
}));

interface IProps {
  dense: boolean;
  handleToggle: () => void;
  icon: ReactElement;
  isOpen: boolean;
  name: string;
  sidebarIsOpen: boolean;
}

const SubMenu: FC<IProps> = (props) => {
  const {
    handleToggle,
    sidebarIsOpen,
    isOpen,
    name,
    icon,
    children,
    dense,
  } = props;
  const translate = useTranslate();
  const classes = useStyles(props);

  const header = (
        <MenuItem dense={dense} button={true} onClick={handleToggle}>
            <ListItemIcon className={classes.icon}>
                {isOpen ? <ExpandMore /> : icon}
            </ListItemIcon>
            <Typography variant="inherit" color="textSecondary">
                {translate(name)}
            </Typography>
        </MenuItem>
    );

  return (
        <Fragment>
            {sidebarIsOpen || isOpen ? (
                header
            ) : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit={true}>
                <List
                    dense={dense}
                    component="div"
                    disablePadding={true}
                    className={
                        sidebarIsOpen
                            ? classes.sidebarIsOpen
                            : classes.sidebarIsClosed
                    }
                >
                    {children}
                </List>
                <Divider />
            </Collapse>
        </Fragment>
  );
};

export default SubMenu;
