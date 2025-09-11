import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppLogo from "../assets/AppSelection/app_logo.png";
import { deepPurple } from "@mui/material/colors";
import { signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../Firebase";

const settings = ["Profile", "Account", "Logout"];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<User | null>(null);

  // 🔹 Listen for auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = async (setting: string) => {
    if (setting === "Logout") {
      try {
        await signOut(auth);
        console.log("User logged out");
        window.location.href = "/login"; // redirect after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="sticky" color="transparent">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-between'}}>
          {/* Logo */}
          <Box
            component="img"
            src={AppLogo}
            alt="App Logo"
            sx={{ height: 50, width: "auto", mr: 1, ml: 1 }}
          />

          {/* User Avatar with Menu */}
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1, mr: 1.5 }}>
            <Typography variant="h6" color="primary">
              {user?.email || "Guest"}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.email || "User"}
                  src="/static/images/avatar/2.jpg"
                  sx={{ bgcolor: deepPurple[500] }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
    </AppBar>
  );
}

export default Header;
