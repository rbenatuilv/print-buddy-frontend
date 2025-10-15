import { Typography, Skeleton } from "@mui/material";


export default function LoadingTypography({ variant, loadingWidth, isLoading, children }) {
    return(
        <Typography variant={variant}>
        {isLoading ? (
            <Skeleton width={loadingWidth} height="100%" animation="wave" />
        ) : (
            children
        )}
        </Typography>
    )   
}