import { Box } from "@mui/material";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

import TopBar from "./TopBar";
import SideBar from "./SideBar";
import ForceLoginModal from "./ForceLoginModal";


export default function DashboardLayout({ children }) {
    const [ mobileOpen, setMobileOpen ] = useState(false);
    const isDesktop = useMediaQuery("(min-width:900px)");

    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    return (
        <Box sx={{ display: "flex" }}>
            
            <ForceLoginModal />

            <TopBar onMenuClick={handleDrawerToggle} isDesktop={isDesktop} />

            <SideBar
                open={mobileOpen}
                onClose={handleDrawerToggle}
                isDesktop={isDesktop}
                width={drawerWidth}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8
                }}
            >
                { children }
            </Box>

        </Box>
    );
}