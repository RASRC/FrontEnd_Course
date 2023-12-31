import { User } from "firebase/auth";
import { MapScene } from "./map-scene";
import { Events } from "../../middleware/event-handler";

export const mapHandler = {
    viewer: null as MapScene | null,
    async start(container:HTMLDivElement,user:User,events:Events) {
        if(!this.viewer){
            console.log("Logica para cargar el mapa");
            this.viewer = new MapScene(container,events);
            await this.viewer.getAllBuildings(user);
        }
    },
    remove() {
        if(this.viewer){
            console.log("Logica para eliminar el mapa");
            this.viewer.dispose();
            this.viewer = null;
        }
    },

    addBuilding(user: User){
        if(this.viewer){
            this.viewer.addBuilding(user);
        }
    }
}