import MPlayer from './MPlayer';
export default class MGame {
    players!: Array<MPlayer>;

    constructor(players: Array<MPlayer>) {
        this.players = players;
    }

    getTriggerMPlayer(): MPlayer|undefined {
        const player = GetTriggerPlayer();

        return this.players.find(mPlayer => {
            return mPlayer.player === player;
        });
    }
}