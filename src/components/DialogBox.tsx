import React, {SetStateAction, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import colorConfigs from "../configs/colorConfigs";

export enum DialogBoxMode {
    DELETE_MEMBER = "Delete Member"
}

export type DialogBoxData = {
    open: boolean;
    dialogTitle: string;
    dialogContext: string;
    txtId: string;
    txtLabel: string;
    txtType: string;
    actionBtnName: string;
    errorMessages: string[];
    id: string | null;
}

export type DialogBoxAction = {
    onClose: React.Dispatch<SetStateAction<boolean>>;
}

type Props = {
    mode: DialogBoxMode;
    data: DialogBoxData;
    action: DialogBoxAction;
}

const DialogBox = ({mode, data, action} : Props) => {
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("Initial error must have a whitespace");

    const handleCancel = () => {
        action.onClose(false);
        setInput("");
        setError(" ");
    }
    return (
        <>
            <Dialog
                fullWidth
                maxWidth={"xs"}
                open={data.open}
                onClose={() => {action.onClose(false)}}
            >
                <Box
                    border={"2px solid white"}
                    sx={{backgroundColor: colorConfigs.mainBg}}
                >
                    <DialogTitle
                        fontWeight={"bold"}
                        color={"white"}
                    >
                        {data.dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            color={"white"}
                            pb={1}
                            variant={"body2"}
                        >
                            Please enter <i>{data.id}</i> as the member UUID.
                        </DialogContentText>
                        <DialogContentText
                            color={"white"}
                        >
                            {data.dialogContext}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin={"dense"}
                            id={data.txtId}
                            label={data.txtLabel}
                            type={data.txtType}
                            fullWidth
                            variant={"standard"}
                            value={input}
                            helperText={error}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant={"contained"}
                            color={"inherit"}
                            sx={{
                                fontWeight: "bold"
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={"contained"}
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            {data.actionBtnName}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}

export default DialogBox;