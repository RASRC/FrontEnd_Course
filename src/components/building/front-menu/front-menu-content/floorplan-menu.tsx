import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./floorplan-menu.css";
import { Floorplan } from "../../../../types";
import { Button } from "@mui/material";

export const FloorplanMenu: FC = () => {
  const [state, dispatch] = useAppContext();
  const onFloorplanSelected = (active: boolean, floorplan?: Floorplan) => {
    dispatch({ type: "TOGGLE_FLOORPLAN", payload: { active, floorplan } });
  };
  return (
    <div className="large-list">
      {state.floorplans.map((plan) => {
        return (
          <div key={plan.name} className="list-item">
            <Button
              onClick={() => onFloorplanSelected(true, plan)}
              className="wide-button"
            >
              {plan.name}
            </Button>
          </div>
        );
      })}
      <div key="Exit" className="list-item">
        <Button
          onClick={() => onFloorplanSelected(false)}
          className="wide-button"
        >
          Volver
        </Button>
      </div>
    </div>
  );
};
