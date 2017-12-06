import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import RootApp from './RootApp';
import configureStore from './config/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';



ReactDOM.render(<Provider store={configureStore()}><LocaleProvider locale={enUS}><RootApp/></LocaleProvider></Provider>, document.getElementById('root'));
registerServiceWorker();
