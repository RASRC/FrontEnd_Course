import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./properties-menu.css"


export const PropertiesMenu : FC = () => {
    const [state, dispatch] = useAppContext();
    return <div>PropertiesMenu</div>
}