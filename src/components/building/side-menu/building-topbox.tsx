import { FC } from "react";
import { getAppBar } from "./mui-utils";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import { useAppContext } from "../../../middleware/context-provider";

export const BuildingTopBar: FC<{
  open: boolean;
  onOpen: () => void;
  width: number;
}> = ({ open, onOpen, width }) => {
  const [state] = useAppContext();
  const { building } = state;

  const saceemTheme = createTheme({
    palette: {
      primary: orange,
      secondary: orange,
    },
  });

  const AppBar = getAppBar(width);

  return (
    <>
      <ThemeProvider theme={saceemTheme}>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Visor BIM {building && building.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};
