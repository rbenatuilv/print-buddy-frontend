import { Paper, Typography, Button } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import HistoryTable from "../historyJobComponents/HistoryTable";


export default function RecentJobsCard({ jobs, isLoading, onViewAll, renderStatusIcon }) {
    return (
        <Paper sx={{ p: 3, position: "relative"}}>
        <Typography variant="h6" sx={{ mb: 1 }}>
            Recent Jobs
        </Typography>

        <Button
            variant="text"
            size="small"
            endIcon={<HistoryIcon />}
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={onViewAll}
        >
            View all
        </Button>

        <HistoryTable
            jobs={jobs}
            isLoading={isLoading}
            renderStatusIcon={renderStatusIcon}
        />
        </Paper>
    );
}