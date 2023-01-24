import { JSXElement } from "solid-js";
import {base} from './base';

export function Layout({children, page}:{children:JSXElement, page:string}){
    page = page.replace(/^\//, '');
    return (<div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Randumber</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><a href={`${base}/between`} class="nav-link" classList={{active:page == '' || page == 'between'}}>Between</a></li>
        <li class="nav-item"><a href={`${base}/scoreboard`} class="nav-link" classList={{active:page == '' || page == 'scoreboard'}}>Scoreboard</a></li>
        <li class="nav-item"><a href={`${base}/choose`} class="nav-link" classList={{active:page == 'choose'}}>Choose</a></li>
        <li class="nav-item"><a href={`${base}/draft`} class="nav-link" classList={{active:page == 'draft'}} aria-current="page">Pick a number</a></li>
        <li class="nav-item"><a href="#" class="nav-link">About</a></li>
      </ul>
    </header>
    <div class='site-main main'>
        {children}
    </div>
  </div>)
}