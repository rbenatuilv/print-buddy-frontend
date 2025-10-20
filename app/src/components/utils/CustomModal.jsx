import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from "@mui/material";


export default function CustomModal({
    open,
    onClose,
    title = "Modal Title",
    content = "Modal content goes here",
    actions = null,
    maxWidth = "sm",
    isForm = false
}) {
    return (
        <Dialog
        component={isForm ? "form" : "div"}
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={maxWidth}
        slotProps={{
            backdrop: {
                sx: {
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
            }
        }}
        >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {typeof content === "string" ? (
                <Typography>{content}</Typography>
            ) : (
                content
            )}
        </DialogContent>
        <DialogActions>
            {actions || (
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            )}
        </DialogActions>
        </Dialog>
    );
}
