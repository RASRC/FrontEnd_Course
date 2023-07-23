import * as OBC from "openbim-components";
import { MAPBOX_KEY } from "../../config";
import { GisParameters , Building, LngLat} from "../../types";
import * as MAPBOX from "mapbox-gl";
import * as THREE from "three";
import {User} from "firebase/auth";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { MapDatabase } from "./map-database";
import { Events } from "../../middleware/event-handler";

export class MapScene {
    private components = new OBC.Components();
    private readonly style = "mapbox://styles/mapbox/light-v10";
    private map : MAPBOX.Map;
    private center : LngLat = {
        lng:0,
        lat: 0
    }
    private clickedCoordinates : LngLat = {
        lng:0,
        lat: 0
    }
    private labels : {[id:string]:CSS2DObject} = {};
    private database = new MapDatabase();
    private events : Events;

    constructor(container: HTMLDivElement,events:Events){
        const configuration = this.getConfig(container);
        this.map=this.createMap(configuration);  
        this.initializeComponents(configuration);
        this.setupScene();
        this.events = events
    }

    dispose() {
        this.components.dispose();
        (this.map as any) = null;
        (this.components as any) = null;
        for (let id in this.labels){
            const label = this.labels[id];
            label.removeFromParent();
            label.element.remove();
        }
        this.labels = {};
    }

    async addBuilding(user: User){
        const {lng,lat} = this.clickedCoordinates;
        const userID = user.uid;
        const building = {
            id: "",
            userID,
            lat,
            lng,
            name: "",
            models: []
        }
        building.id= await this.database.add(building)
        this.addToScene([building])
    }

    async getAllBuildings(user:User){
        const buildings = await this.database.getBuildings(user);
        if(this.components){
            this.addToScene(buildings)
        }
    }

    private addToScene(buildings : Building[]){
        for (let building of buildings){
            const {id, lat, lng} = building;
            const htmlElement = this.createHTMLElement(building);
            const label = new CSS2DObject(htmlElement);
            //Obtener ubicacion del centro del mapa y el edificio
            const center = MAPBOX.MercatorCoordinate.fromLngLat(
                {... this.center},
                0
            );
            const units = center.meterInMercatorCoordinateUnits();
            const model = MAPBOX.MercatorCoordinate.fromLngLat({lng,lat},0);
            model.x /= units;
            model.y /= units;
            center.x /= units;
            center.y /= units;
            //Ubicacion del edificio en la escena
            label.position.set(model.x-center.x,0,model.y-center.y);
            this.components.scene.get().add(label)
            this.labels[id]=label;
        }
    }

    private createHTMLElement(building:Building) {
        const div = document.createElement("div");
        div.textContent = "🏢";
        div.classList.add("thumbnail");
        div.onclick = () => {
            this.events.trigger({type:"OPEN_BUILDING",payload:building})
        }
        return div;
    }

    private setupScene() {
        const scene = this.components.scene.get();
        scene.background = null;

        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(0,-70,100).normalize();
        const dirLight2 = new THREE.DirectionalLight(0xffffff);
        dirLight2.position.set(0,70,100).normalize();

        scene.add(dirLight1);
        scene.add(dirLight2);
    }

    private initializeComponents(config: GisParameters){
        this.components.camera = new OBC.MapboxCamera();
        this.components.scene = new OBC.SimpleScene(this.components);
        this.components.renderer = this.createRenderer(config);
        this.components.init();
    }

    private createRenderer(config: GisParameters){
        const coordinates = this.getCoordinates(config);
        return new OBC.MapboxRenderer(this.components,this.map,coordinates);
    }

    private getCoordinates(config: GisParameters){
        const merc = MAPBOX.MercatorCoordinate;
        return merc.fromLngLat(config.center,0);
    }

    private createMap(config: GisParameters){
        const map = new MAPBOX.Map({
            ...config,
            style: this.style,
            antialias: true
        })
        map.on("contextmenu",this.storeMouseEvent);
        return map;
    }

    private storeMouseEvent = (event: MAPBOX.MapMouseEvent) => {
        this.clickedCoordinates = {...event.lngLat};
    }
    private getConfig(container: HTMLDivElement){
        const center = [-54.94487285403626 ,-34.96315495974406] as [number,number];
        this.center = {
            lng: center[0],
            lat: center[1],
        }
        return {
            container,
            accessToken: MAPBOX_KEY,
            zoom: 15,
            pitch:60,
            bearing: -40,
            center,
            buildings: [],
        }
    }

}