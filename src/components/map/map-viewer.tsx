import { FC, useRef, useEffect, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Apartment , Lock, NavigateNextSharp } from "@mui/icons-material";
import "../../App.css";
import "./map-viewer.css";

export const MapViewer: FC = () => {
  const [state, dispatch] = useAppContext();
  const { user , building} = state;

  const containerRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);

  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  };

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
    }
    setIsCreating(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      dispatch({ type: "START_MAP", payload: { container, user } });
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if(building){
    const url = `/building?id=${building.id}`;
    return <Navigate to={url} />
  }

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <div
        onContextMenu={onCreate}
        className="full-screen"
        ref={containerRef}
      ></div>
      {isCreating && (
        <div className="overlay">
          <p>Crea un nuevo edificio o </p>
          <Button color="inherit" onClick={onToggleCreate}>
            Cancela
          </Button>
        </div>
      )}
      <div className="button-container">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<Apartment />}
          onClick={onToggleCreate}
        >
          Crear edificio
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Lock />}
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
};
