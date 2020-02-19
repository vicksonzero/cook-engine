import * as Debug from 'debug';
import "phaser";
import { MainScene } from "./scenes/MainScene";
import '../model/utils/window';
import { WORLD_WIDTH, WORLD_HEIGHT, GAME_NAMESPACE } from './constants';
import { b2World } from 'box2d.ts';
import { Model } from '../model/Model';
import { systemFactory } from '../model/systemFactory';

window._Debug = Debug;
const verbose = Debug(`${GAME_NAMESPACE}:client:verbose `);
// const log = Debug(`${GAME_NAME}:client:log`);
// const warn = Debug(`${GAME_NAME}:client:warn`);
// warn.log = console.warn.bind(console);

// main game configuration
const gameModel = new Model({
    tickSizeMS: Math.floor(1000 / 60),
    systems: systemFactory(),
})
const phaserConfig: Phaser.Types.Core.GameConfig = {
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    disableContextMenu: true,
    type: Phaser.AUTO,
    parent: "game",
    scene: new MainScene(),
    zoom: 1,
    backgroundColor: 0xAAAAAA,
    // physics: {
    //     default: "matter",
    //     matter: {
    //         // debug: true,
    //     }
    // },
};

// game class
export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    var game = new Game({ ...phaserConfig });

    // setTimeout(() => {
    // }, 100);
    function handleSizeUpdate(event?: Event) {
        const ww = window.innerWidth / Number(phaserConfig.width);
        const hh = window.innerHeight / Number(phaserConfig.height);

        const min = Math.min(ww, hh);
        verbose(`handleSizeUpdate\n window: ${window.innerWidth}, ${window.innerHeight}\n ratio: ${ww}, ${hh}\n min: ${min}`);

        game.canvas.style.width = `${min * Number(phaserConfig.width)}px`;
        game.canvas.style.height = `${min * Number(phaserConfig.height)}px`;
    }

    if (!window.location.search.includes('video')) {
        window.addEventListener('resize', handleSizeUpdate);

        verbose('init handleSizeUpdate');
        handleSizeUpdate();
    }
};
