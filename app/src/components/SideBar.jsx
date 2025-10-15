import { Drawer, Toolbar, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";


export default function SideBar({ open, onClose, isDesktop, width }) {

    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        { text: "Home", icon: <HomeIcon />, path: "/" },
        { text: "My files", icon: <DescriptionIcon />, path: "/files" },
        { text: "Print", icon: <PrintIcon />, path: "/print" },
        { text: "Print history", icon: <HistoryIcon />, path: "/history"},
        { text: "User stats", icon: <BarChartIcon />, path: "/stats"},
        { text: "Balance top-up", icon: <AccountBalanceWalletIcon />, path: "/balance" },
    ];

    const drawerContent = (
        <List>
            {menuItems.map(({ text, icon, path}) => (
                <ListItemButton 
                    key={text}
                    component={Link}
                    to={path}
                    selected={currentPath == path}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            ))}
        </List>
    );

    if (isDesktop) {
        return (
            <Drawer
                variant="permanent"
                sx={{
                    width,
                    [`& .MuiDrawer-paper`]: {
                        width,
                        boxSizing: "border-box"
                    }
                }}
                open
            >
                <Toolbar />
                { drawerContent }
            </Drawer>
        )
    }

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                display: { xs: "block", md: "none" },
                [`& .MuiDrawer-paper`]: {
                    width,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            { drawerContent }
        </Drawer>
    )

}