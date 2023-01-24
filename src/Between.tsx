import { tween } from "shifty";
import { createSignal, onCleanup } from "solid-js";


export function Between() {
    const [min, setMin] = createSignal(0)
    const [max, setMax] = createSignal(10);
    const [val, setVal] = createSignal<null|number>(null);
    const run = ()=>tween({
        render: ({ scale, x }) => {
          setVal(()=>(Math.round(Math.random() * (max()-min())) + min()))
        },
        easing: 'easeInOutQuad',
        duration: 1500,

        from: { x: min() },
        to: { x: max() },
      }).tween();

    return     <div class="container-fluid bg-body">

<div class='row'>
        <div class='container-fluid text-center'>
        <h1 class='display-1 center'>{val == null ? 'Click' :val}</h1>
       </div>
        <button  class="btn btn-primary btn-lg" onClick={run}>Pick!</button>
        <div class="container-fluid column">
          <span>Min Value {min}</span><input name="min" type="range" min={0} value={min()} onInput={e=>{
        const m = Number(e.currentTarget.value);
        if (m < max())
          setMin(m);
         else
          e.preventDefault()
        }}/>
        </div>
        <div class="container-fluid column">
          
          <span>Max Value {max}</span>
        <input name="max" type="range" min={0} value={max()} onInput={e=>{
          const m = Number(e.currentTarget.value);
          if ( m > min())
             setMax(m);
             else
             e.preventDefault()
        }}/>
        </div>
        </div>
    </div>

}