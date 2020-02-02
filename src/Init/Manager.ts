import { MapPlayer, Unit } from 'w3ts';
import MPlayer from '../Class/MPlayer';
import MGame from '../Class/MGame';

export default class InitManager {
    private game!: MGame;
    private startHeroes: Array<Unit> = [];

    private goodAI: MapPlayer = MapPlayer.fromIndex(8);
    constructor() {
        
    }

    public run() {
        this.initGame();
        this.heroesToChose();
    }

    private initGame() {

        const players = [
            new MPlayer(MapPlayer.fromIndex(0), Player(0), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(1), Player(1), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(2), Player(2), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(3), Player(3), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(4), Player(4), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(5), Player(5), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(6), Player(6), Location(-6663, 8650)),
            new MPlayer(MapPlayer.fromIndex(7), Player(7), Location(-6663, 8650)),
        ]
        this.game = new MGame(players);
    }

    private heroesToChose(): void {
        const archer = new Unit(this.goodAI, FourCC('Nbrn'), -7183, 7690, 20);
        archer.nameProper = 'Alita';
        archer.name = 'Archer';
        this.startHeroes.push(archer);
        
        const warrior = new Unit(this.goodAI, FourCC('Npbm'), -6657, 7690, 20);
        warrior.nameProper = 'Horok';
        warrior.name = 'Warrior';
        this.startHeroes.push(warrior);

        const mage = new Unit(this.goodAI, FourCC('Nfir'), -6154, 7690, 20);
        mage.nameProper = 'Merlin';
        mage.name = 'Mage';
        this.startHeroes.push(mage);

        this.heroesToChoseTriggers();
    }

    private heroesToChoseTriggers(): void {
        const trigger = CreateTrigger();
        
        this.game.players.forEach(player => {
            TriggerRegisterPlayerSelectionEventBJ(trigger, player.player, true);
        });
        TriggerAddCondition(trigger, Condition(() => {
            const startUnits = this.startHeroes.map(hero => {
                return hero.handle;
            });

            const player = this.game.getTriggerMPlayer();
            const isHeroSelected = player && player.isHeroSelected();

            return startUnits.indexOf(GetTriggerUnit()) !== -1 && !isHeroSelected;
        }));
        TriggerAddAction(trigger, () => {
            print(`You picked ${GetHeroProperName(GetTriggerUnit())}`);

            const unit = this.startHeroes
                .map(hero => {
                    return hero.handle;
                })
                .find(hero => {
                    return hero === GetTriggerUnit();
                });
            
            if (unit) {
                const player = this.game.getTriggerMPlayer();
                if (player) {
                    player.selectHero(unit);
                }
            }
        });
    }
}