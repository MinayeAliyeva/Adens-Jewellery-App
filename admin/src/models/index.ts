import { Location as ReactLocation, RouteObject } from "react-router-dom";

export type TypeRouteObject = RouteObject & { auth?: boolean };
export type LocationState = { url: string };
export interface Location<State> extends Omit<ReactLocation, "state"> { state: State }