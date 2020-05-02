/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { withTypes, Field } from "react-final-form";
import {
  createMuiTheme,
  makeStyles,
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
  TextField
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/styles";
import { useLogin, useNotify, useTranslate } from "ra-core";
import { Notification } from "react-admin";
import { lightTheme } from "../Layout/themes";
import { AppLocation } from "../../types";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "url(https://source.unsplash.com/random/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  card: {
    minWidth: 300,
    marginTop: "6em"
  },
  avatar: {
    margin: "1em",
    display: "flex",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: theme.palette.secondary.main
  },
  hint: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.grey[500]
  },
  form: {
    padding: "0 1em 1em 1em"
  },
  input: {
    marginTop: "1em"
  },
  actions: {
    padding: "0 1em 1em 1em"
  }
}));

const renderInput = ({
  meta: { touched, error } = { touched: false, error: null },
  input: { ...inputProps },
  ...props
}): JSX.Element =>
  (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      {...inputProps}
      {...props}
      fullWidth={true}
    />
  );

type FormValues = {
  readonly username?: string
  readonly password?: string
};

const { Form } = withTypes<FormValues>();

const Login = (props: { readonly location: AppLocation }): JSX.Element => {
  const { location } = props;
  const [loading, setLoading] = React.useState(false);
  const translate = useTranslate();
  const classes = useStyles(props);
  const notify = useNotify();
  const login = useLogin();

  const handleSubmitFn = (auth: FormValues): void => {
    setLoading(true);
    login(auth, location.state ? location.state.nextPathname : "/").catch(
      (error: Error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
              ? "ra.auth.sign_in_error"
              : error.message,
          "warning"
        );
      }
    );
  };

  const validate = (values: FormValues): FormValues => Object.keys(values).reduce((acc, k) => values[k] ? acc : ({
    ...acc,
    [k]: translate("ra.validation.required")
  }), {});

  return (
    <Form
      onSubmit={handleSubmitFn}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate={true}>
          <div className={classes.main}>
            <Card className={classes.card}>
              <div className={classes.avatar}>
                <Avatar className={classes.icon}>
                  <Lock />
                </Avatar>
              </div>
              <div className={classes.hint}>
                Hint: demo / demo
              </div>
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    autoFocus={true}
                    name="username"
                    // @ts-ignore
                    component={renderInput}
                    label={translate("ra.auth.username")}
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="password"
                    // @ts-ignore
                    component={renderInput}
                    label={translate("ra.auth.password")}
                    type="password"
                    disabled={loading}
                  />
                </div>
              </div>
              <CardActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  fullWidth={true}
                >
                  {loading && (
                    <CircularProgress
                      size={25}
                      thickness={2}
                    />
                  )}
                  {translate("ra.auth.sign_in")}
                </Button>
              </CardActions>
            </Card>
            <Notification />
          </div>
        </form>
      )}
    />
  );
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props: any): JSX.Element => (
  <ThemeProvider theme={createMuiTheme(lightTheme)}>
    <Login {...props} />
  </ThemeProvider>
);

export default LoginWithTheme;
