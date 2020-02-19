import { System } from "./systems/System";
import { PhysicsSystem } from "./systems/PhysicsSystem";
import { FRAME_SIZE_CLIENT } from "../client-src/constants";
import { KeyboardSystem } from "./systems/KeyboardSystem";

export function systemFactory(): System[] {
    return [
        new KeyboardSystem({

        }),
        // new PhysicsSystem({
        //     tickSizeMS: FRAME_SIZE_CLIENT,
        // }),
    ]
}