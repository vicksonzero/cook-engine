import { PlayerControllerComponent } from "../components/PlayerControllerComponent";
import { PlayerInputComponent } from "../components/PlayerInputComponent";
import { Model } from "../Model";
import { System } from "./System";


export interface KeyboardSystemConfig {
}

export class KeyboardSystem implements System {

    constructor(config: KeyboardSystemConfig) {
    }

    init() {
    }
    tick(model: Model): void {
        const components = model.getComponentsByTypes([PlayerInputComponent, PlayerControllerComponent]);
    }
}