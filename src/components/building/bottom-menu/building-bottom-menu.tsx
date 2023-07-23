import { Card } from "@material-ui/core";
import { FC } from "react";
import "./building-bottom-menu.css";
import { useAppContext } from "../../../middleware/context-provider";
import { getBottombarTools } from "./bottombar-tools";
import { IconButton } from "@mui/material";

const tools = getBottombarTools();

export const BuildingBottomMenu: FC = () => {
  const dispatch = useAppContext()[1];

  return (
    <Card className="bottom-menu">
      {tools.map((tool) => (
        <IconButton
          color={tool.active ? "primary" : "default"}
          onClick={() => tool.action(dispatch)}
          key={tool.name}
        >
          {tool.icon}
        </IconButton>
      ))}
    </Card>
  );
};
