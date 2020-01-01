import { makeStyles, Button, Card, CardContent } from "@material-ui/core";
import React from "react";
import { useLocale, useSetLocale, useTranslate, Title } from "react-admin";
import { useDispatch, useSelector } from "react-redux";
import { Locale } from "../shared/i18n";
import { changeTheme } from "../shared/store/action";
import { IAppState, Theme } from "../shared/store/types";

const useStyles = makeStyles({
  label: {
    width: "10em",
    display: "inline-block",
  },
  button: { margin: "1em" },
});

const Configuration = (props) => {
  const translate = useTranslate();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const classes = useStyles(props);
  const theme = useSelector((state: IAppState) => state.config ? state.config.theme : Theme.Light);
  const dispatch = useDispatch();

  const cbChangeTheme = (value: Theme) => () => dispatch(changeTheme(value));
  const cbSetLocale = (lc: Locale) => () => setLocale(lc);

  return (
    <Card>
        <Title title={translate("resources.configuration.name")} />
        <CardContent>
            <div className={classes.label}>
                {translate("layout.theme.name")}
            </div>
            <Button
                variant="contained"
                className={classes.button}
                color={theme === Theme.Light ? "primary" : "default"}
                onClick={cbChangeTheme(Theme.Light)}
            >
                {translate("layout.theme.light")}
            </Button>
            <Button
                variant="contained"
                className={classes.button}
                color={theme === Theme.Dark ? "primary" : "default"}
                onClick={cbChangeTheme(Theme.Dark)}
            >
                {translate("layout.theme.dark")}
            </Button>
        </CardContent>
        <CardContent>
            <div className={classes.label}>{translate("common.language")}</div>
            <Button
                variant="contained"
                className={classes.button}
                color={locale === "en" ? "primary" : "default"}
                onClick={cbSetLocale(Locale.English)}
            >
                en
            </Button>
            <Button
                variant="contained"
                className={classes.button}
                color={locale === "vi" ? "primary" : "default"}
                onClick={cbSetLocale(Locale.Vietnamese)}
            >
                fr
            </Button>
        </CardContent>
    </Card>
  );
};

export default Configuration;
