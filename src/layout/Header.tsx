import { AppBar, Switch, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

function Header({ darkMode, handleThemeChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} ml={20}>
        SKI STORE
      </Typography>
      <Switch checked={darkMode} onChange={handleThemeChange} />
    </AppBar>
  );
}

export default Header;
