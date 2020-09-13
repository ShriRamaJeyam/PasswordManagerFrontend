import React from 'react';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

import { Toaster } from '@blueprintjs/core'
import MainApp from './PasswordManager/MainApp';
import AdminPage from './PasswordManager/AdminPage';
import UserPage from './PasswordManager/UserPage';


window.toaster = Toaster.create({});
window.toast = {};
window.toast.error = (message) => {
  window.toaster.show({
    message,
    intent:'danger',
    icon:'issue'
  });
}

window.toast.success = (message) => {
  window.toaster.show({
    message,
    intent:'success',
    icon:'thumbs-up'
  });
}

function App() {
  //return (<MainApp />);
  return (<UserPage authHash={"7f3bb00a6c93373c6cf055c4f7975388a99df5da9a53a52f709b6414499b769d"} loginID={5} username="niranjan" logoutHandler={() => null} />);
  //return (<AdminPage authHash={'SriRama108!)*'} logoutHandler={()=>null} />);
}

export default App;
