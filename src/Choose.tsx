import { tween } from "shifty";
import { batch, createSignal, For, onCleanup } from "solid-js";
import { createLocalStore, removeIndex } from "./utils";
import style from './Choose.module.css';

interface Choice {
  label:string;
  selected?:boolean;
}

export function Choose() {
  const [choice, setChoice] = createSignal("");
  const [choices, setChoices] = createLocalStore<Choice[]>("choices", []);
  const [highlight, setHighlight] = createSignal<number|null>(null);
  const addChoice = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setChoices(choices.length, {label:choice()});
      setChoice("");
    });
  };
  const removeChoice = (e:MouseEvent)=>{
    e.preventDefault();
    const pos = Number((e.currentTarget as HTMLElement).dataset?.index);
    batch(() => {
      setChoices(choices.filter((v,i)=>i != pos));
    });
  }
  const run = ()=>tween({
    render: ({ x }) =>{
      const v = Math.floor(Math.random() * choices.length)
      console.log('render',v);
      setHighlight(v);
    },
    easing: 'easeInOutQuad',
    duration: 1500,

    from: { x: 0 },
    to: { x: choices.length },
  }).tween();

  return <div class="container-fluid bg-body">

    <div class='row'>
      <div class='container-fluid text-center'>
      {choices.length == 0 ? <p>Add Choice</p> : 
      <ul class="list-group"><For each={choices}>
      {(c, i) => (<ChoiceItem index={i()} highlight={highlight()===i()} choice={c} onRemove={removeChoice}/>)}</For></ul>}
      </div>
      <button class="btn btn-primary btn-lg" onClick={run}>Pick!</button>

      <form onSubmit={addChoice}>
        <input name="choice" value={choice()} onInput={e => setChoice(e.currentTarget.value)}/>
        <button class="btn btn-primary btn-xs" type="submit">Add Choice</button>
      </form>
    </div>
  </div>

}

function ChoiceItem ({choice,index,  highlight, onRemove}:{choice:Choice, index:number, onRemove(e:MouseEvent):void, highlight:boolean}){
return (<li class={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${style.listItem}`} classList={{[style.active]:highlight, disabled:choice.selected}}>
  <span>{choice.label}</span>
  <button type="button" data-index={index} class="btn-close btn-xs" aria-label="Remove" onClick={onRemove}></button>


</li>)
}