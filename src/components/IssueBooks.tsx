import {Box, Button, Grid, IconButton, TextField, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, {SetStateAction, useState} from "react";

type Props = {
    isDrawerOpen: React.Dispatch<SetStateAction<boolean>>
}

type ErrorMsgType = {
    memberIdError: string;
    bookIsbnError: string;
}

const IssueBooks = ({isDrawerOpen}: Props) => {
    const [memberId, setMemberId] = useState<string>("");
    const [bookISBN, setBookISBN] = useState<string>("");
    const [bookISBNArray, setBookISBNArray] = useState<string[]>(["pubudu@gmail.com", "kasun@gmail.com", "supun@gmail.com"]);
    const [error, setError] = useState<ErrorMsgType>({memberIdError: " ", bookIsbnError: " "});

    return (
        <>
            <Box
                position={"relative"}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                borderLeft={"2px solid white"}
            >
                <Box
                    position={"absolute"}
                    top={12}
                    right={5}
                >
                    <IconButton
                        onClick={() => {isDrawerOpen(false)}}
                    >
                        <CancelIcon
                            sx={{color: "white"}}
                        />
                    </IconButton>
                </Box>
                <Grid
                    container
                    rowSpacing={3}
                    pt={2} pl={4} pr={4}
                >
                    <Grid display={"flex"} alignItems={"center"} item xs={12} pb={1}>
                        <ShoppingCartOutlinedIcon sx={{color: "white"}}/>
                        <Typography pl={1} variant={"h5"} sx={{color: "white", fontWeight: "bold"}}>Issue Books</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id={"member-id"}
                            className={"lms-input-field"}
                            name={"member-id"}
                            label={"Member ID"}
                            fullWidth
                            variant={"standard"}
                            value={memberId}
                            // helperText={"Read Only"}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {

                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            {bookISBNArray.map((isbn: string, index: number) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            mr: "12px"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "white",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: "390px",
                                                pt: "10px"
                                            }}
                                        >
                                            {isbn}
                                        </Typography>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => {
                                                setBookISBNArray(bookISBNArray.filter((isbnID: string, index: number) => {
                                                    return (isbnID !== isbn)
                                                }))
                                            }}>
                                            <DeleteIcon sx={{color: "white"}} />
                                        </IconButton>
                                    </Box>
                                );
                            })}
                            <Box display={"flex"}>
                                <TextField
                                    sx={{
                                        mt: 1
                                    }}
                                    fullWidth
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => {
                                                    if (bookISBN !== "" && error.bookIsbnError === " ") {
                                                        setBookISBNArray((prevState) => {return [...prevState, bookISBN]})
                                                        setBookISBN("")
                                                    }
                                                }}
                                            >
                                                <AddCircleIcon sx={{color: "white"}} />
                                            </IconButton>
                                        )
                                    }}
                                    id="issue-book-isbn"
                                    className={"lms-input-field"}
                                    name="issue-book-isbn"
                                    label="Book ISBN"
                                    variant="standard"
                                    error={(error.bookIsbnError !== " ")}
                                    value={bookISBN}
                                    helperText={error.bookIsbnError}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" && bookISBN !== "" && error.bookIsbnError === " ") {
                                            setBookISBNArray((prevState) => {return [...prevState, bookISBN]})
                                            setBookISBN("")
                                        }
                                    }}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        const {value} = event.target;
                                        if (value.trim() === "") {
                                            setError((prevState) => {
                                                return {...prevState, "bookIsbnError": "Book ISBN is required"}
                                            });
                                        } else if (!/^\d{3}-\d-\d{2}-\d{6}-\d$/.test(value)) {
                                            setError((prevState) => {
                                                return {...prevState, "bookIsbnError": "Enter a valid book ISBN"}
                                            });
                                        } else if (bookISBNArray.includes(value)) {
                                            setError((prevState) => {
                                                return {...prevState, "bookIsbnError": "ISBN List already includes this Book ISBN."}
                                            });
                                        } else {
                                            setError((prevState) => {
                                                return {...prevState, "bookIsbnError": " "}
                                            });
                                        }
                                        setBookISBN(value);
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    gap={2}
                    pb={2} pt={2} pr={4}
                >
                    <Button
                        variant={"contained"}
                        color={"inherit"}
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        variant={"contained"}
                        sx={{fontWeight: "bold"}}
                    >
                        Issue
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default IssueBooks;