import { Drawer, Toolbar, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import PrintIcon from "@mui/icons-material/Print";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";


export default function SideBar({ open, onClose, isDesktop, width }) {

    const menuItems = [
        { text: "My files", icon: <DescriptionIcon /> },
        { text: "Print", icon: <PrintIcon /> },
        { text: "Print history", icon: <HistoryIcon /> },
        { text: "User stats", icon: <BarChartIcon /> },
        { text: "Balance top-up", icon: <AccountBalanceWalletIcon /> },
    ];

    const drawerContent = (
        <List>
            {menuItems.map(({ text, icon}) => (
                <ListItemButton key={text}>
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