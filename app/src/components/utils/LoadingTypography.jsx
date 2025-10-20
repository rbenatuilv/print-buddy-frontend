import { Typography, Skeleton } from "@mui/material";


export default function LoadingTypography({ color, variant, loadingWidth, isLoading, sx, children }) {
    return(
        <Typography color={color} variant={variant} sx={sx}>
        {isLoading ? (
            <Skeleton width={loadingWidth} height="100%" animation="wave" />
        ) : (
            children
        )}
        </Typography>
    )   
}