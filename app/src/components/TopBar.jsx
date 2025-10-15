import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Avatar, Menu, MenuItem, CircularProgress } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";

import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";


export default function TopBar({ onMenuClick, isDesktop }) {

    const { user, isLoading, isError } = useUser();
    const { logout } = useAuth()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogOut = () => {
        logout();
        handleMenuClose()
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {!isDesktop && (
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography variant="h6" noWrap>
                    PrintBuddy v.0.1.0
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                            <Avatar sx={{ bgcolor: "secondary.main" }}>
                                { (isLoading || isError)? (
                                    <CircularProgress color="inherit" size={20}/>
                                    ) : (
                                    user?.name[0]?.toUpperCase()  || "U"
                                )}
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem disabled>
                            { user?.username || "User" }
                        </MenuItem>

                        <MenuItem
                            onClick={handleLogOut}
                        >
                            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                        </MenuItem>

                    </Menu>
                </Box>

            </Toolbar>
        </AppBar>
    );
}