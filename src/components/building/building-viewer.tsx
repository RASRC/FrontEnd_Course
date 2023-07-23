import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import { BuildingTopBar } from "./side-menu/building-topbox";
import { BuildingDrawer } from "./side-menu/building-drawer";
import { getDrawerHeader } from "./side-menu/mui-utils";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import { FrontMenuMode } from "./types";
import { BuildingViewport } from "./viewport/building-viewport";
import { BuildingBottomMenu } from "./bottom-menu/building-bottom-menu";

export const BuildingViewer: FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [frontMenu,setFrontMenu] = useState<FrontMenuMode>("BuildingInfo")
  const [width] = useState(240); //Valor de ancho definido por Material UI para el Menu

  const [{ user, building }] = useAppContext();

  if (!building) {
    return <Navigate to={"/map"} />;
  }

  if (!user) {
    return <Navigate to={"/login"}/>
  }

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const toggleFrontMenu = (active: boolean, mode?: FrontMenuMode) => {
    if(mode){
      setFrontMenu(mode);
    }
    
    setFrontOpen(active);
  }

  const DrawerHeader = getDrawerHeader();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <BuildingTopBar
          width={width}
          open={sideOpen}
          onOpen={() => toggleDrawer(true)}
        />
        <BuildingDrawer
          width={width}
          open={sideOpen}
          onClose={()=>{toggleDrawer(false)}}
          onToggleMenu={toggleFrontMenu}
          />
        <Box component="main" sx={{flexGrow:1,p:3}}>
          <DrawerHeader/>
          <BuildingViewport/>
          <BuildingFrontMenu open={frontOpen} mode={frontMenu} onToggleMenu={() => toggleFrontMenu (false)}/>
          <BuildingBottomMenu/>
        </Box>
      </Box>
    </>
  );
};
