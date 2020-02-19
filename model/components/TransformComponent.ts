import { Component } from "./Component";


export interface TransformComponentConfig {
    position?: { x: number, y: number };
    rotation?: number;
    scale?: { x: number, y: number };
    skew?: { x: number, y: number };
}
export class TransformComponent implements Component, TransformComponentConfig {
    type: string = 'TransformComponent';
    position: { x: number, y: number };
    rotation: number;
    scale: { x: number, y: number };
    skew: { x: number, y: number };

    constructor(public entityID: number) {

    }

    init(config: TransformComponentConfig) {
        if (config.position) this.position = config.position;
        if (config.rotation) this.rotation = config.rotation;
        if (config.scale) this.scale = config.scale;
        if (config.skew) this.skew = config.skew;
    }
}