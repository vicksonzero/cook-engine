import { Component } from "../components/Component";
import { EntityContainer } from "./EntityContainer";
import { Model } from "../Model";

export interface System {

    init(): void;
    tick(model: Model): void;
}