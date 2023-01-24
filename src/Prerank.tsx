import { createStore } from "solid-js/store";


interface Ranker {
    name:string;
}
interface Player {
    name:string;
}
interface Rank {
    round:number;
    team:Ranker;
    player:Player;
}

interface Draft {
    rankers:Ranker[];
    players:Player[];
}

export function PreRank(){
    const rankMap = new Map<string, number>;

    const [state, setState] = createStore<Draft>({
        players: [
            { name: "Mark" },
            { name: "Troy" },
            { name: "Jenny" },
            { name: "David" }
        ],
        rankers:[
            {name:'Team A'},
            {name:'Team B'},
            {name:'Team C'},
            {name:'Team D'},
            {name:'Player Agent'}
        ]
    });
    function score(v:Player){
        return 1;
    }
    const changeRank = (e:InputEvent )=>{
        const ele =  (e.currentTarget as HTMLInputElement)
        const ranker = ele.dataset.ranker;
        const player = ele.dataset.player;
        rankMap.set(`${ranker}-${player}`, Number(ele.value));
    }
    return <div>
        <table class='table'>
            
            <thead class='table-head'>
                <tr>
                <th>Player</th>
                {state.rankers.map(v=><th>{v.name}</th>)}
                <th>Round</th>
                </tr>
            </thead>
            <tbody>
                {state.players.map(v=><tr>{[<td>{v.name}</td>, ...state.rankers.map(rank=><td>
                    <input data-player={v.name} data-ranker={rank.name} onInput={changeRank} value={rankMap.get(`${rank.name}-${v.name}`) ?? ''}/>
                </td>)]}<td>{score(v)}</td></tr>)}
            </tbody>
        </table>
    </div>
}

function Input(){
    return <input type='number' min={1} max={12}></input>
}