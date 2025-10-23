// Import Material UI components for the navbar
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/apiSlice";
import { clearToken } from "../../utils/tokenStorage";

// Creates a consistent navigation bar for the application
const Navbar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Failed to logout:", err);
    }
    clearToken();
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Translate Chat
        </Typography>
        <Box sx={{ flexGrow: 1, ml: 3 }}>
          
          <Button component={RouterLink} to="/" color="inherit">
            Chat
          </Button>
          <Button component={RouterLink} to="/friends" color="inherit">
            Friends
          </Button>
          <Button component={RouterLink} to="/settings" color="inherit">
            Settings
          </Button>
        </Box>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
