import { Building } from './../../types';
import {getApp} from "firebase/app";
import { User } from 'firebase/auth';
import {addDoc, collection, getFirestore, onSnapshot, query, where} from "firebase/firestore"

export class MapDatabase {
    //Nombre de la coleccion que aloja los edificios en FireStore
    private readonly buildings = "buildings";

    async add(building: Building){
        const app = getApp();
        const dbInstance = getFirestore(app);
        const {lat,lng,userID,name,models}=building;
        const result = await addDoc(collection(dbInstance,this.buildings),{
            lat,
            lng,
            userID,
            name,
            models
        })
        return result.id;
    }

    async getBuildings(user:User){
        const app = getApp();
        const dbInstance = getFirestore(app);
        const q = query(collection(dbInstance,this.buildings),where("userID","==",user.uid));
        return new Promise<Building[]>((resolveFunc)=>{
            const unsuscribe = onSnapshot(q,(snapshot)=>{
                const result:Building[]=[];
                snapshot.docs.forEach((doc)=>{
                    result.push({...(doc.data() as Building),
                    id: doc.id})
                });
                unsuscribe();
                resolveFunc(result)
            });
        })
    }
}