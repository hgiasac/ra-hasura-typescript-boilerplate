import PropTypes from "prop-types";
import React, { useState } from "react";
import { withTypes, Field } from "react-final-form";

import { createMuiTheme, makeStyles, Avatar, Button, Card, CardActions, CircularProgress, TextField } from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/styles";
import { Location } from "history";
import { useLogin, useNotify, useTranslate } from "ra-core";
import { Notification } from "react-admin";
import { lightTheme } from "../Layout/themes";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "url(https://source.unsplash.com/random/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  card: {
    minWidth: 300,
    marginTop: "6em",
  },
  avatar: {
    margin: "1em",
    display: "flex",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  hint: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.grey[500],
  },
  form: {
    padding: "0 1em 1em 1em",
  },
  input: {
    marginTop: "1em",
  },
  actions: {
    padding: "0 1em 1em 1em",
  },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth={true}
    />
);

interface IFormValues {
  username?: string;
  password?: string;
}

const { Form } = withTypes<IFormValues>();

const Login = (props: { location: Location }) => {
  const { location } = props;
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();
  const classes = useStyles(props);
  const notify = useNotify();
  const login = useLogin();

  const handleSubmitFn = (auth: IFormValues) => {
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

  const validate = (values: IFormValues) => {
    const errors: IFormValues = {};
    if (!values.username) {
      errors.username = translate("ra.validation.required");
    }
    if (!values.password) {
      errors.password = translate("ra.validation.required");
    }

    return errors;
  };

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

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props: any) => (
    <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
