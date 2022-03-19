import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

import { HOME, DASHBOARD, USER_PROFILE } from "@/constants/routerConstants";
import { COMPANY_NAME } from "@/constants/constants";
import { Loading } from "../Loading";

const menuItems = [
  {
    label: "dashboard",
    url: DASHBOARD,
    active: false,
  },
];

const avatorDropDownMenu = [
  {
    label: "Profile",
    url: USER_PROFILE,
    active: false,
  },
];

const Navigation: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [accessToken, setAccesstoken] = React.useState<string | undefined>("");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleSignOut = React.useCallback(() => {
  //   signOut();
  // }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setAccesstoken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={HOME} passHref>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                mr: 2,
                fontWeight: 700,
                cursor: "pointer",
                display: { xs: "none", md: "flex" },
                ":hover": { textDecoration: "underline" },
              }}
            >
              {COMPANY_NAME}
            </Typography>
          </Link>
          {accessToken && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={handleCloseNavMenu}>
                    <Link href={item.url} passHref key={item.label}>
                      <Typography textAlign="center">{item.label}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Link href={HOME} passHref>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              {COMPANY_NAME}
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
          >
            {accessToken && (
              <>
                {menuItems.map((item) => (
                  <Link href={item.url} passHref key={item.label}>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      sx={{ mx: 2, ":hover": { textDecoration: "underline" } }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {accessToken ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="https://pbs.twimg.com/profile_images/846643773107048448/l3zndenR_normal.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Button>Login</Button>
                <Button variant="contained">Sign Up</Button>
              </>
            )}

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
              {avatorDropDownMenu.map((item) => (
                <MenuItem key={item.label} onClick={handleCloseUserMenu}>
                  <Link href={item.url} passHref key={item.label}>
                    <Typography textAlign="center" width="100%">
                      {item.label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Button variant="contained">Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
