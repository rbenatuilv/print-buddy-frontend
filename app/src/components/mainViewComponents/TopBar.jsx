import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip, Avatar, Menu, MenuItem, CircularProgress, Stack, TextField, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from "@mui/icons-material/Logout";

import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

import { updatePwd } from "../../api/user";
import CustomModal from "../utils/CustomModal";


export default function TopBar({ onMenuClick, isDesktop }) {

    const { user, isLoading, isError } = useUser();
    const { logout } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    const [ anchorEl, setAnchorEl ] = useState(null);
    const open = Boolean(anchorEl);

    const [ openModal, setOpenModal ] = useState(false);
    const [ errChangePwd, setErrChangePwd ] = useState("")
    const [ isSubmitting, setIsSubmitting ] = useState(false);

    const [ current_pwd, setCurrentPwd ] = useState("");
    const [ new_pwd, setNewPwd ] = useState("");
    
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogOut = () => {
        logout();
        handleMenuClose()
    }

    const handleOpenModal = () => {
        setCurrentPwd("");
        setNewPwd("");
        setErrChangePwd("");
        setOpenModal(true)
    }

    const handleChangePwd = async () => {

        setIsSubmitting(true)

        try {
            const response = await updatePwd(current_pwd, new_pwd);
            setOpenModal(false);
            enqueueSnackbar("Password changed succesfully!", { variant: "success" });
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                if (status == 404) {
                    setErrChangePwd("User not found!");
                } else if (status == 403) {
                    setErrChangePwd("Incorrect password!")
                }
            } else {
                setErrChangePwd("An error occurred!")
            }
        } finally {
            setIsSubmitting(false);
        }
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
                            onClick={handleOpenModal}
                        >
                            Change password
                        </MenuItem>

                        <MenuItem
                            onClick={handleLogOut}
                        >
                            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                        </MenuItem>

                    </Menu>
                </Box>

            </Toolbar>

            <CustomModal 
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Change password"
                isForm
                maxWidth="xs"
                content={
                    <Stack spacing={2} mt={1}>
                        <Typography>
                            Insert current and new password
                        </Typography>

                        <TextField 
                            label="Current password"
                            type="password"
                            onChange={(e) => setCurrentPwd(e.target.value)}
                            fullWidth
                        />

                        <TextField 
                            label="New password"
                            type="password"
                            onChange={(e) => setNewPwd(e.target.value)}
                            fullWidth
                        />

                        {errChangePwd && (
                            <Typography color="error" variant="body2">
                                { errChangePwd }
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleChangePwd}
                            disabled={isSubmitting}
                        >
                            Confirm
                        </Button>

                    </Stack>
                }
            
            />

        </AppBar>
    );
}