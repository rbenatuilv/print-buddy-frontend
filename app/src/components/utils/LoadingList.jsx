import { List, ListItem, ListItemText, Skeleton } from '@mui/material';


export default function LoadingList({ count = 4, sx }) {
    return (
        <List sx={sx}>
            {Array.from({ length: count }).map((_, idx) => (
                <ListItem key={idx} disablePadding>
                    <ListItemText
                        primary={<Skeleton variant="text" width="60%" animation="wave"/>}
                        secondary={<Skeleton variant="text" width="40%" animation="wave"/>}
                    />
                </ListItem>
            ))}
        </List>
    );
};