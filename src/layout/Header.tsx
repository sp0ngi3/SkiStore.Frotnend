import { AppBar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} ml={20}>
        SKI STORE
      </Typography>
    </AppBar>
  );
}

export default Header;
