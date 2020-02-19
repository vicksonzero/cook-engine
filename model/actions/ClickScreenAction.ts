import { Action } from "./Action";

export class ClickScreenAction implements Action {
    type = 'ClickScreenAction';
    x: number; // kilo-pixel
    y: number; // kilo-pixel
    isDown: boolean;
    isDrag: boolean;
    isUp: boolean;
}