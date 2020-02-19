import { System } from "./System";
import { Component } from "../components/Component";
import { EntityContainer } from "./EntityContainer";
import { b2World } from "box2d.ts";
import { Immutable } from "../utils/ImmutableType";
import { TransformComponent } from "../components/TransformComponent";
import { Model } from "../Model";


export interface PhysicsSystemConfig {
    tickSizeMS: number;
    velocityIterations?: number;
    positionIterations?: number;
    particleIterations?: number;
}

export class PhysicsSystem implements System {
    getComponentReq = () => [TransformComponent];

    private tickSizeMS: number;
    private velocityIterations: number = 10;
    private positionIterations: number = 10;
    private particleIterations: number = 10;

    private _world: b2World;
    public get world(): Immutable<b2World> {
        return this._world;
    }

    constructor(config: PhysicsSystemConfig) {
        this.tickSizeMS = config.tickSizeMS;
        if (config.velocityIterations != null) this.velocityIterations = config.velocityIterations;
        if (config.positionIterations != null) this.positionIterations = config.positionIterations;
        if (config.particleIterations != null) this.particleIterations = config.particleIterations;
    }

    init() {
        this._world = new b2World({ x: 0, y: 0 });
    }
    tick(model: Model): void {
        const components = model.getComponentsByTypes([TransformComponent]);
        this._world.Step(this.tickSizeMS, this.velocityIterations, this.positionIterations, this.particleIterations);
    }
}