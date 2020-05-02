// tslint:disable no-submodule-imports
import * as firebase from "firebase/app";
import "firebase/auth";
import { Config } from "../config";

// eslint-disable-next-line functional/no-let
let firebaseApp: firebase.app.App;

export const FirebaseApp = (): firebase.app.App => {
  if (!firebaseApp) {
    firebaseApp = firebase.initializeApp(Config.firebase);
  }

  return firebaseApp;
};
