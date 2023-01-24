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
import { JSXElement } from 'solid-js';
import { PreRank } from './Prerank';
import { Layout } from './Layout';

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
render(() => <Layout  page={window.location.pathname} children={match(window.location.pathname)}/>, document.getElementById('root') as HTMLElement);
