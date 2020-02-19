import { EventQueue } from "./EventQueue";
import { System } from "./systems/System";
import { Component, ComponentConstructor } from "./components/Component";
import { Immutable } from "./utils/ImmutableType";
import { EntityContainer } from "./systems/EntityContainer";


export interface ModelConfig {
    tickSizeMS: number;
    systems?: System[];
}

export class Model {

    public tickSizeMS: number;
    public eventQ: EventQueue;
    /**
     * Getter systems
     * @return {System[]}
     */
    public get systems(): Immutable<System[]> {
        return this._systems;
    }

    /**
     * Getter components
     * @return {Component[]}
     */
    public get components(): Immutable<Component[]> {
        return this._components;
    }

    private _systems: System[];
    private _components: Component[];


    /**
     * Getter $lastUpdateFrameID
     * @return {number}
     */
    public get $lastUpdateFrameID(): number {
        return this.nextUpdateFrameID;
    }
    private nextUpdateFrameID: number = 0;

    constructor(config: ModelConfig) {
        this.tickSizeMS = config.tickSizeMS;
        if (config.systems) {
            this._systems = [...config.systems];
        }
    }

    update(gameTimeMS: number) {
        this.updateToFrame(Math.floor(gameTimeMS / this.tickSizeMS));
    }

    updateToFrame(frameID: number) {
        const framesToUpdate = frameID - this.nextUpdateFrameID;
        for (let i = 0; i < framesToUpdate; i++) {
            this.tick(this.nextUpdateFrameID + framesToUpdate);
        }
        this.nextUpdateFrameID = frameID;
    }

    tick(frameID: number) {
        this.systems.forEach((sys) => {
            sys.tick(this);
        });
    }

    getComponentsByTypes(requiredTypes: ComponentConstructor[], optionalTypes: ComponentConstructor[] = []): EntityContainer[] {
        const filteredEntities: EntityContainer[] = [];
        let entityContainer: EntityContainer | null = null;
        const types = [...requiredTypes, ...optionalTypes];

        // ALGORITHM: assume component.entityID is sorted
        for (let i = 0; i < this._components.length; i++) {
            const component = this._components[i];
            const isNeeded = types.some((t) => component instanceof t);
            if (isNeeded) {
                // create entity container or make new one
                if (entityContainer) {
                    if (entityContainer.entityID !== component.entityID) {
                        filteredEntities.push(entityContainer);
                        entityContainer = new EntityContainer(component.entityID);
                    }
                } else {
                    entityContainer = new EntityContainer(component.entityID);
                }
                // entity container is ready here
                entityContainer.components.push(component);
            }
        }
        if (entityContainer) {
            filteredEntities.push(entityContainer);
        }

        const result = filteredEntities.filter((entity) => {
            return requiredTypes.every((type) => {
                const isFound = entity.components.some((c) => c instanceof type);
                return isFound;
            });
        });
        return result;
    }
}