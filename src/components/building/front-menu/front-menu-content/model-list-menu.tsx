import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./model-list-menu.css";
import { IconButton, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export const ModelListMenu: FC = () => {
  const [{ building, user }, dispatch] = useAppContext();

  if (!building || !user) {
    throw new Error("No existe el modelo");
  }

  const onUploadModel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);

    input.onchange = () => {
      if (input.files && input.files.length) {
        const file = input.files[0];
        const id = `${file.name}-${performance.now()}`;
        const model = { name: file.name, id };
        const newBuilding = { ...building };
        newBuilding.models.push(model);
        dispatch({ type: "UPLOAD_MODEL", payload: {model,file,building: newBuilding} });
      }
      input.remove();
    };

    input.click();
  };

  const onDeleteModel = (id:string) => {
    const newBuilding = {...building};
    
    const model = newBuilding.models.find(model => model.id === id);
    if(!model){
        throw new Error("No se encuentra el modelo en el listado"); 
    }

    newBuilding.models = newBuilding.models.filter(model=>model.id !== id);
    dispatch({type:"DELETE_MODEL",payload:{model,building: newBuilding}});
  }

  return (
    <div>
      {building.models.length ? (
        building.models.map((model) => {
          return (
            <div className="list-item" key={model.id}>
              <IconButton onClick={()=> onDeleteModel(model.id)}>
                <ClearIcon />
              </IconButton>
              <span className="margin-left">{model.name}</span>
            </div>
          );
        })
      ) : (
        <p>No existen modelos cargados</p>
      )}
      <div className="list-item">
        <Button onClick={onUploadModel}>Cargar modelo</Button>
      </div>
    </div>
  );
};
