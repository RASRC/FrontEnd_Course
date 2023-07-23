import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Building, Model } from "../../types";
import { Events } from "../../middleware/event-handler";
import { deleteDoc, doc, getFirestore, updateDoc} from "firebase/firestore";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage"
import { getApp } from "firebase/app";
import { buildingHandler } from "../building/building-handler";

export const databaseHandler = {
    login: () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    },
    logout: () =>{
        const auth = getAuth();
        signOut(auth);
    },
    deletBuilding : async (building:Building,events:Events)=>{
        const dbInstance = getFirestore(getApp());
        await deleteDoc(doc(dbInstance,"buildings",building.id));
        const storageInstance = getStorage(getApp());
        const ids : string[] = [];
        for (const model of building.models){
            const fileRef = ref(storageInstance,model.id);
            await deleteObject(fileRef);
            ids.push(model.id);
        }
        await buildingHandler.deleteModels(ids);
        events.trigger({type:"CLOSE_BUILDING"})
    },
    updateBuilding : async (building:Building) => {
        const dbInstance = getFirestore(getApp());
        await updateDoc(doc(dbInstance,"buildings",building.id),{...building});
    },
    uploadModel : async (model:Model,file:File,building:Building,events:Events) => {
        const storageInstance = getStorage(getApp());
        const fileName = model.id;
        const fileRef = ref(storageInstance,fileName);
        await uploadBytes(fileRef,file);
        await buildingHandler.refreshModels(building,events);
        events.trigger({type:"UPDATE_BUILDING",payload:building})
    },
    deleteModel : async (model:Model,building:Building,events:Events) => {
        const storageInstance = getStorage(getApp());
        const fileName = model.id;
        const fileRef = ref(storageInstance,fileName);
        await deleteObject(fileRef);
        await buildingHandler.deleteModels([model.id]);
        await buildingHandler.refreshModels(building,events);
        events.trigger({type:"UPDATE_BUILDING",payload:building});
    }
}