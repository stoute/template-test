import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { injectGlobal } from 'styled-components';
import { applyPolyfills } from '@bsmp/webcomponents/dist/loader';
import { defineCustomElements as defineBsmElements } from '@bsmp/webcomponents/dist/loader';
import { defineCustomElements as defineIoniconsElements } from 'ionicons/dist/loader';
import regeneratorRuntime from "regenerator-runtime";
import "./i18n";

import { App } from './app/app';

ReactDOM.render(
        <App />
    , document.querySelector('app-root')
);

applyPolyfills().then(() => {
  defineBsmElements(window);
  defineIoniconsElements(window);
});


// Global style
// eslint-disable-next-line
// injectGlobal`
//   body {
//     background-color: ghostwhite;
//     padding: 0;
//     margin: 0;
//     font-family: cursive;
//   }
// `
