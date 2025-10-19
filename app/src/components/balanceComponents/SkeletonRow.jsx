import { TableRow, TableCell, Skeleton } from "@mui/material";


export default function SkeletonRow({ isMobile }) {
    const cellCount = isMobile ? 3 : 4;
    return (
        <TableRow>
        {Array.from({ length: cellCount }).map((_, j) => (
            <TableCell key={j}>
            <Skeleton
                variant={j === 0 ? "circular" : "text"}
                width={j === 0 ? 24 : "80%"}
                height={j === 0 ? 24 : undefined}
            />
            </TableCell>
        ))}
        </TableRow>
    );
}