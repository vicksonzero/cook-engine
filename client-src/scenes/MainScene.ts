
import * as Debug from 'debug';
import "phaser";
import { Immutable } from '../../model/utils/ImmutableType';
import { GAME_NAMESPACE } from '../constants';

type Key = Phaser.Input.Keyboard.Key;

const log = Debug(`${GAME_NAMESPACE}:MainScene:log`);
// const warn = Debug(`${GAME_NAME}:MainScene:warn`);
// warn.log = console.warn.bind(console);

export class MainScene extends Phaser.Scene {

    arrowKeys: { up: Key, down: Key, left: Key, right: Key };
    scrollSpeed = 10;

    get mainCamera() { return this.sys.cameras.main; }

    constructor() {
        super({
            key: "MainScene",
        })
    }

    preload() {
        // _preload.call(this);
    }

    create(): void {

        this.setUpKeyboard();

    }

    update(time: number, dt: number) {
        let xx = 0;
        let yy = 0;
        if (this.arrowKeys.up.isDown) yy += this.scrollSpeed;
        if (this.arrowKeys.down.isDown) yy -= this.scrollSpeed;
        if (this.arrowKeys.left.isDown) xx += this.scrollSpeed;
        if (this.arrowKeys.right.isDown) xx -= this.scrollSpeed;
    }

    setUpKeyboard() {
        this.arrowKeys = {
            up: this.input.keyboard.addKey('W'),
            down: this.input.keyboard.addKey('S'),
            left: this.input.keyboard.addKey('A'),
            right: this.input.keyboard.addKey('D'),
        }

    }
}
