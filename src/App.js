import React from 'react';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/select/lib/css/blueprint-select.css";

import { Toaster } from '@blueprintjs/core'
import MainApp from './PasswordManager/MainApp';
import apiConsumer from './Utils/apiConsumer'


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

apiConsumer('');

function App() {
  return (<MainApp />);
}

export default App;
