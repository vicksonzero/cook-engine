import { Component } from "../components/Component";
import { PlayerInputComponent } from "../components/PlayerInputComponent";

export function playerFactory(entityID: number): Component[] {
    const result: Component[] = [
        new PlayerInputComponent(entityID),
    ];

    return result;
}