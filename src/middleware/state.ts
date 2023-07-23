import {User} from "firebase/auth";
import { Building, Floorplan } from "../types";

export interface State {
    user: User | null;
    building: Building | null;
    floorplans: Floorplan[];
}

export const initialState : State = {
    user: null,
    building: null,
    floorplans: [] 
}