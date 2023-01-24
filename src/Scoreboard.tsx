import {
    createMemo,
    createSignal,
    createComputed,
    onCleanup,
    For
} from "solid-js";
import { createStore } from "solid-js/store";
import style from './Scoreboard.module.css';
import { createLocalStore } from "./utils";
interface Player {
    score: number;
    name: string;
}
export const Scoreboard = () => {
    let newName;
    let prevPlayers: Player[] = [];
    const [busy, setBusy] = createSignal(false);
    const [state, setState] = createLocalStore<{ players: Player[] }>("scoreboard", {
        players: [
        ]
    }),


        run = () => {
            setBusy(true);
            const it = setInterval(() => {
                setState("players", p => {
                    prevPlayers = p;
                    return shuffle(p)
                });
            }, 300);

            setTimeout((v) => {
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
                setState("players", (p) => p.filter((v, i) => i != idx));
        },

        createStyles = (player: Player) => {
            const [style, setStyle] = createSignal<Record<string, string>>({});
            createComputed(() => {

                const offset = Math.max(prevPlayers.indexOf(player), 0) * 18 - Math.max(state.players.indexOf(player), 0) * 18;
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
                        const style = createStyles(player);
                        return (<li class={`player list-group-item  d-flex justify-content-between align-items-start ${style.item}`} style={style()}>
                            <div class="name">{player.name}</div>
                            <button type="button" class={`btn-close btn-xs ${style.close}`} aria-label="Remove" onClick={
                                () => handleDeleteClick(player)
                            } />
                        </li>)
                    }}

                </For>
            </ul>
            <div class='container d-flex align-items-center justify-content-center p-3'>
            {busy() ? <div class={`spinner-border text-primary ${style.spinner}`} role="status">
                <span class="visually-hidden">Shuffling...</span>
            </div> :
                state.players.length > 1 ? <button disabled={busy()} class={`btn btn-lg btn-primary btn-circle ${style.shuffleButton}`} classList={{ [style.busyButton]: busy() }} onClick={run}>
                    Shuffle
                </button> : <></>
            }
            </div>
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
function shuffle<T>(arr: T[], algo = () => Math.random() - 0.5): T[] {
    return arr.slice().sort(algo);
}