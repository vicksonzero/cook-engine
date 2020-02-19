import { System } from "./System";
import { Component } from "../components/Component";
import { EntityContainer } from "./EntityContainer";
import { b2World } from "box2d.ts";
import { Immutable } from "../utils/ImmutableType";
import { TransformComponent } from "../components/TransformComponent";
import { Model } from "../Model";
import { PlayerControllerComponent } from "../components/PlayerControllerComponent";


export interface MovementSystemConfig {
    tickSizeMS: number;
}

export class MovementSystem implements System {
    private tickSizeMS: number;

    constructor(config: MovementSystemConfig) {
        this.tickSizeMS = config.tickSizeMS;
    }

    init() {
    }
    tick(model: Model): void {
        const components = model.getComponentsByTypes([TransformComponent, PlayerControllerComponent]);
    }
}