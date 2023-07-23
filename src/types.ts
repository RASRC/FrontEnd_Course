export interface GisParameters {
    container: HTMLDivElement;
    accessToken: string;
    zoom: number;
    pitch: number;
    bearing: number;
    center: [number,number];
    buildings: Building[];
}

export interface Building {
    id: string;
    userID: string;
    lat: number;
    lng: number;
    name: string;
    models: Model[]
}

export interface Model {
    name: string,
    id: string
}

export interface LngLat {
    lng: number;
    lat: number;
}

export interface Tool {
    name: string;
    active: boolean;
    icon: any;
    action: (...args:any)=> void;
}

export interface Floorplan {
    name: string;
    id: string
}