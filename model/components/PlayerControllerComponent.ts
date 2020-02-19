import { Component } from "./Component";

export class PlayerControllerComponent implements Component {
    type: string = 'PlayerControllerComponent';
    constructor(public entityID: number) {

    }
}