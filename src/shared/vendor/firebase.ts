// tslint:disable no-submodule-imports
import * as firebase from "firebase/app";
import "firebase/auth";
import { Config } from "../config/env";

let firebaseApp: firebase.app.App

export const FirebaseApp = () => {
  if (!firebaseApp) {
    firebaseApp = firebase.initializeApp(Config.firebase);
  }

  return firebaseApp;
}
