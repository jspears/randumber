import { tween } from "shifty";
import { batch, createComputed, createSignal, For, onCleanup } from "solid-js";
import { createLocalStore, removeIndex } from "./utils";
import style from './Choose.module.css';
import { PushButton } from "./PushButton";

interface Choice {
  label:string;
  selected?:boolean;
}

export function Choose() {
  let choiceRef;
  const [busy, setBusy] = createSignal(false);
  const [choices, setChoices] = createLocalStore<Choice[]>("choices", []);
  const [highlight, setHighlight] = createSignal<number|null>(null);
  const addChoice = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setChoices(choices.length, {label:choiceRef.value});
      choiceRef.value = '';
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
      setBusy(true);
      const v = Math.floor(Math.random() * choices.length)
      console.log('render',v);
      setHighlight(v);
    },
    easing: 'easeInOutQuad',
    duration: 1500,

    from: { x: 0 },
    to: { x: choices.length },
  }).tween().then(v=>setBusy(false));
  const createStyles = (player:Choice) => {
    const [style, setStyle] = createSignal<Record<string, string>>({});
    createComputed(() => {

        const t = setTimeout(() =>
            setStyle({ transition: "250ms", transform: null })
        );
        setStyle({
            transform: `background-color: red`,
            transition: null
        });
        onCleanup(() => clearTimeout(t));
    });
    return style;
};
  return <div class="container-fluid bg-body">

    <div class='row'>
      <div class='container-fluid text-center'>
      {choices.length == 0 ? <p>Add Choice</p> : 
      <ul class="list-group"><For each={choices}>
      {(c, i) =>{
        const style = createStyles(c);
        return (<ChoiceItem index={i()} style={style()} choice={c} onRemove={removeChoice}/>)}
      
      }</For></ul>}
      </div>
      <div class='container d-flex align-items-center justify-content-center p-3'>
               <PushButton onClick={run} busy={busy()} label={'Pick One!'}/>
       </div>      
      <form onSubmit={addChoice}>
        <div class="player input-group">
                    <input
                        type="text"
                        name="choice"
                        class="form-control"
                        placeholder="Add choice..."
                        ref={choiceRef}
                    />
                    <button type="submit" class="input-group-text">
                        Add
                    </button>
                </div>
      </form>
      </div>
    </div>

}
type Style = Record<string,string>;

function ChoiceItem ({choice,index, style, onRemove}:{choice:Choice, style:Style, index:number, onRemove(e:MouseEvent):void, highlight:boolean}){
return (<li class={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${style.listItem}`} style={style} classList={{disabled:choice.selected}}>
  <span>{choice.label}</span>
  <button type="button" data-index={index} class="btn-close btn-xs" aria-label="Remove" onClick={onRemove}></button>


</li>)
}