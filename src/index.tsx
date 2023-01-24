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
//TODO - use some routing thing instead of this.
const pathname =window.location.pathname.replace('/randumber', '');
render(() => <Layout  page={pathname} children={match(pathname)}/>, document.getElementById('root') as HTMLElement);
