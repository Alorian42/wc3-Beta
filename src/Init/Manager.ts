import { MapPlayer, Unit } from 'w3ts';

export default class InitManager {
    private startHeroes: Array<Unit> = [];
    private startHeroesLocation: location = Location(-6663, 8650);

    private players: Array<player> = [];
    private mapPlayers: Array<MapPlayer> = [];
    private goodAI: MapPlayer = MapPlayer.fromIndex(8);
    constructor() {
        
    }

    public run() {
        this.setupPlayers();
        this.heroesToChose();
    }

    private setupPlayers() {
        this.players = [
            Player(0),
            Player(1),
            Player(2),
            Player(3),
            Player(4),
            Player(5),
            Player(6),
            Player(7),
        ];

        this.mapPlayers = [
            MapPlayer.fromIndex(0),
            MapPlayer.fromIndex(1),
            MapPlayer.fromIndex(2),
            MapPlayer.fromIndex(3),
            MapPlayer.fromIndex(4),
            MapPlayer.fromIndex(5),
            MapPlayer.fromIndex(6),
            MapPlayer.fromIndex(7),
        ]

        this.players.forEach(player => {
            PanCameraToLocForPlayer(player, this.startHeroesLocation);
        });
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
        
        this.players.forEach(player => {
            TriggerRegisterPlayerSelectionEventBJ(trigger, player, true);
        });
        TriggerAddCondition(trigger, Condition(() => {
            const startUnits = this.startHeroes.map(hero => {
                return hero.handle;
            });
            return startUnits.indexOf(GetTriggerUnit()) !== -1;
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
                const player = MapPlayer.fromHandle(GetTriggerPlayer());;
                const newUnit = new Unit(player, GetUnitTypeId(unit), 0, 0, 270);
                newUnit.nameProper = player.name;
                newUnit.name = GetUnitName(unit);
            }
        });
    }
}