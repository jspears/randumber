import { JSXElement } from "solid-js";

export function Layout({children, page}:{children:JSXElement, page:string}){
    return (<div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Randumber</span>
      </a>

      <ul class="nav nav-pills">
        <NavItem path='/between' active={page == '' || page == '/' || page == '/between'} current={page}>Between</NavItem>
        <NavItem path='/scoreboard'  current={page}>Scoreboard</NavItem>
        <NavItem path='/choose'  current={page}>Choose</NavItem>
        <NavItem path='/draft'  current={page}>Draft</NavItem>
        <NavItem path='/prerank'  current={page}>Prerank</NavItem>
        <NavItem path='/about'  current={page}>About</NavItem>
        
      </ul>
    </header>
    <div class='site-main main'>
        {children}
    </div>
  </div>)
}

function NavItem({path, children, current, active = current == path}:{path:string, active?:boolean; current:string, children:JSXElement}){
    return   <li class="nav-item"><a href={`?path=${path}`} class="nav-link" classList={{active}}>{children}</a></li>
}