import { Box, TextField , Button} from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./building-info-menu.css";

export const BuildingInfoMenu : FC <{
    onToggleMenu : () => void
}> = ({onToggleMenu}) => {
    const [state,dispatch] = useAppContext();
    const {building} = state;

    if(!building){
        throw new Error("No building here!");
    }

    const onUpdateBuilding = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newBuilding = {...building} as any;
        
        newBuilding.name = data.get("building-name");
        newBuilding.lat = data.get("building-lat");
        newBuilding.lng = data.get("building-lng");

        dispatch({type:"UPDATE_BUILDING",payload:newBuilding});
        onToggleMenu();
    }

    return (<Box component="form" onSubmit={onUpdateBuilding}>
        <div className="list-item">
            <TextField
                fullWidth
                id="building-name"
                label="Nombre del proyecto"
                name="building-name"
                autoComplete="building-name"
                defaultValue={building.name}
            />
        </div>
        <div className="list-item">
            <TextField
                fullWidth
                id="building-lat"
                label="Latitud"
                name="building-lat"
                autoComplete="building-lat"
                defaultValue={building.lat}
            />
        </div>
        <div className="list-item">
            <TextField
                fullWidth
                id="building-lng"
                label="Longitud"
                name="building-lng"
                autoComplete="building-lng"
                defaultValue={building.lng}
            />
        </div>
        <div className="list-item">
            <TextField
                fullWidth
                id="building-id"
                label="ID"
                name="building-id"
                autoComplete="building-id"
                defaultValue={building.id}
                disabled={true}
            />
        </div>
        <div className="list-item">
            <Button type="submit">Guardar datos</Button>
        </div>
    </Box>)
}