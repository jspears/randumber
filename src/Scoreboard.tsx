import {
    createMemo,
    createSignal,
    createComputed,
    onCleanup,
    For
} from "solid-js";
import { createStore } from "solid-js/store";
import style from './Scoreboard.module.css';
interface Player {
    score: number;
    name: string;
}
export const Scoreboard = () => {
    let newName;
    const [busy, setBusy] =createSignal(false);
    const [state, setState] = createStore<{ players: Player[] }>({
        players: [
            { name: "Mark", score: 3 },
            { name: "Troy", score: 2 },
            { name: "Jenny", score: 1 },
            { name: "David", score: 8 }
        ]
    }),
        lastPos = new WeakMap(),
        curPos = new WeakMap(),
      
        run = ()=>{
            setBusy(true);
            const it = setInterval(()=>{
                setState("players", p=>{
                    return shuffle(p)
                });
            }, 300);

            setTimeout( (v)=>{
                clearInterval(v);
                setBusy(false);
            }, 3000, it);
        },
        handleSubmit = (e: SubmitEvent) => {
            e.preventDefault();
            const name = newName.value;
            if (!name.length) return;
            setState("players", (p) => [...p, { name: name, score: 0 }]);
            newName.value = "";
        },
        handleDeleteClick = (player: Player) => {
            const idx = state.players.indexOf(player);
            if (idx != -1)
                setState("players", (p) => [...p.slice(0, idx), ...p.slice(idx + 1)]);
        },

        createStyles = (player: Player) => {
            const [style, setStyle] = createSignal<Record<string, string>>({});
            createComputed(() => {
                
                const offset = lastPos.get(player) * 18 - curPos.get(player) * 18;
                const t = setTimeout(() =>
                    setStyle({ transition: "250ms", transform: null })
                );
                setStyle({
                    transform: `translateY(${offset}px)`,
                    transition: null
                });
                onCleanup(() => clearTimeout(t));
            });
            return style;
        };

    return (
        <div id="scoreboard" class="row">
            <ul class="list-group">
                <For each={state.players}>
                    {(player) => {
                        const getStyles = createStyles(player),
                            { name } = player;
                        return (
                            <div class={`player list-group-item  d-flex justify-content-between align-items-start ${style.item}`} style={getStyles()}>
                                <div class="name">{name}</div>
                                <button type="button" class={`btn-close btn-xs ${style.close}`} aria-label="Remove" onClick={
                                    () => handleDeleteClick(player)
                                } />
                            </div>
                        );
                    }}
                </For>
            </ul>
            <button disabled={busy()} class={`btn btn-lg btn-primary btn-circle ${style.shuffleButton}`} classList={{[style.busyButton]:busy()}} onClick={run}>Shuffle</button>
            <form class="admin form" onSubmit={handleSubmit}>
                <div class="player input-group">
                    <input
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Add choice..."
                        ref={newName}
                    />
                    <button type="submit" class="input-group-text">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

/** yes its not fast, but its short, and that counts for something. */
function shuffle<T>(arr: T[], algo = () => Math.random() - 0.5):T[] {
    return arr.slice().sort(algo);
}