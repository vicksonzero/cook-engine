
export type ComponentConstructor = { new(entityID: number): Component };
export class Component {
    type: string;

    constructor(public entityID: number) {

    }
}