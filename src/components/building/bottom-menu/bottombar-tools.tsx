import { Tool } from "../../../types";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import StraightenIcon from "@mui/icons-material/Straighten";
import NorthWestIcon from '@mui/icons-material/NorthWest';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export function getBottombarTools(): Tool[] {
  const tools = [
    {
      name: "Navegación",
      active: false,
      icon: <NorthWestIcon />,
      action: (dispatch:any) => {
        console.log("Navegación modelo");
        const tool = findTool("Navegación");
        deactiveAllTools(dispatch,"Navegación");
        tool.active = !tool.active;
      }
    },
    {
      name: "Mediciones",
      active: false,
      icon: <StraightenIcon />,
      action: (dispatch:any) => {
        console.log("Tomar medidas del modelo");
        const tool = findTool("Mediciones");
        deactiveAllTools(dispatch,"Mediciones");
        tool.active = !tool.active;
        dispatch({type:"TOGGLE_DIMENSIONS",payload:tool.active});
      },
    },
    {
      name: "Corte por planos",
      active: false,
      icon: <ContentCutIcon />,
      action: (dispatch:any) => {
        console.log("Corte de planos");
        const tool = findTool("Corte por planos");
        deactiveAllTools(dispatch,"Corte por planos");
        tool.active = !tool.active;
        dispatch({type: "TOGGLE_CLIPPER", payload: tool.active});
      },
    },
    {
      name: "Explotar",
      active: false,
      icon: <ImportExportIcon />,
      action: (dispatch: any) => {
        console.log("Separar el modelo");
        const tool = findTool("Explotar");
        deactiveAllTools(dispatch,"Explotar");
        tool.active = !tool.active;
        dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
      },
    },
  ];

  const findTool = (name: string) => {
    const tool = tools.find((tool) => tool.name === name);
    if (!tool) {
        throw new Error("No existe la herramienta");
    }
    return tool;
  };

  const deactiveAllTools = (dispatch: any, name: string) => {
    for (const tool of tools) {
      if (tool.active && tool.name !== name) {
        tool.action(dispatch);
      }
    }
  };

  return tools;
}
