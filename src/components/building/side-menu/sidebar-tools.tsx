import { Tool } from "../../../types";
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import ApartmentIcon from '@mui/icons-material/Apartment';
import QuizIcon from '@mui/icons-material/Quiz';
import LayersIcon from '@mui/icons-material/Layers';

export function getSidebarTools(): Tool[] {
    return [
        {
            name: "Info",
            active: false,
            icon: <InfoIcon/>,
            action: ({onToggleMenu}) => {
                onToggleMenu(true,"BuildingInfo");
            }
        },
        {
            name: "Modelos",
            active: false,
            icon: <ApartmentIcon/>,
            action: ({onToggleMenu}) => {
                onToggleMenu(true,"ModelList");
            }
        },
        {
            name: "Propiedades",
            active: false,
            icon: <QuizIcon />,
            action: ({onToggleMenu}) => {
                onToggleMenu(true,"Properties");
            }
        },
        {
            name: "Plantas",
            active: false,
            icon: <LayersIcon />,
            action: ({onToggleMenu}) => {
                onToggleMenu(true,"Floorplans");
            }
        },
        {
            name: "Volver al mapa",
            active: false,
            icon: <MapIcon/>,
            action: ({dispatch}) => {
                dispatch({type:"CLOSE_BUILDING"});
            }
        },
        {
            name: "Eliminar edificio",
            active: false,
            icon: <DeleteIcon/>,
            action: ({dispatch,state}) => {
                dispatch({type:"DELETE_BUILDING", payload: state.building});
            }
        },
        {
            name: "Cerrar sesión",
            active: false,
            icon: <LogoutIcon/>,
            action: ({dispatch}) => {
                dispatch({type:"LOGOUT"});
            }
        },
    ]
}