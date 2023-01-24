/* @refresh reload */
import 'bootstrap/scss/bootstrap.scss';

import { render } from 'solid-js/web';

/**
 * This file was taken from the cheatsheet example of bootstrap.
 * You will most likely remove it if using this template.
 */
//import './cheatsheet.scss';

import Example from './App';
import { Between, Between as Index } from './Between';
import { Choose } from './Choose'
import { Scoreboard } from './Scoreboard';
import { JSX } from 'solid-js/jsx-runtime';
import { JSXElement } from 'solid-js';
import { PreRank } from './Prerank';

function match(path):JSXElement {
    switch (path) {
        case '/scoreboard':
            return <Scoreboard/>;
        case '/choose':
            return <Choose />;
        case '/example':
            return <Example />;
            case '/prerank':
                return <PreRank/>;
                
        case '':
        case '/between':
        default:
            return <Between />
    }
}
function Layout({children}:{children:JSX.Element}){
  return  <div class="container-fluid bg-body">
        {children}
    </div>
}
render(() => <Layout children={match(window.location.pathname)}/>, document.getElementById('root') as HTMLElement);
