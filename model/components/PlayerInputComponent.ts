import { Component } from "./Component";

export class PlayerInputComponent implements Component {
    type: string = 'PlayerInputComponent';

    constructor(public entityID: number) {

    }
}