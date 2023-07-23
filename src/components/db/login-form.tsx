import { FC } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

export const LoginForm: FC = () => {
  const [state, dispatch] = useAppContext();

  const onLogin = () => {
    dispatch({ type: "LOGIN" });
  };

  if (state.user) {
    return <Navigate to="/map" />;
  }

  return (
    <h1>
      <Button
        variant="contained"
        color="primary"
        endIcon={<LockOpen />}
        onClick={onLogin}
      >
        Login
      </Button>
    </h1>
  );
};
