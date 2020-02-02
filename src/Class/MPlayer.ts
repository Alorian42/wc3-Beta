import { MapPlayer, Unit } from 'w3ts';
export default class MPlayer {
    mapPlayer!: MapPlayer;
    player!: player;
    startHeroesLocation!: location;

    private _isHeroSelected: boolean = false;

    constructor(mapPlayer: MapPlayer, player: player, startHeroesLocation: location) {
        this.mapPlayer = mapPlayer;
        this.player = player;
        this.startHeroesLocation = startHeroesLocation;

        this.init();
    }

    private init() {
        PanCameraToLocForPlayer(this.player, this.startHeroesLocation);
    }

    isHeroSelected(): boolean {
        return this._isHeroSelected;
    }

    selectHero(unit: unit) {
        const newUnit = new Unit(this.mapPlayer, GetUnitTypeId(unit), 0, 0, 270);
        newUnit.nameProper = this.mapPlayer.name;
        newUnit.name = GetUnitName(unit);
        this._isHeroSelected = true;
        PanCameraToLocForPlayer(this.player, Location(0,0));
    }
}