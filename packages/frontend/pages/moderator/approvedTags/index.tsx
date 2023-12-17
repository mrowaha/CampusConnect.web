import * as React from "react";
import { BACKEND_URL, GET_APPROVED_TAGS } from "@/routes";
import { createPortal } from "react-dom";

import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    CircularProgress,
    Chip,
    useTheme,
    Typography,
    Button,
    Grid,
    Fab
} from "@mui/material";

import { DomainImage } from "@/components/shared";
import { create } from "domain";


export default function ModeratorPage() {
    const theme = useTheme();

    const [tags, setTags] = React.useState<any[]>([]);
    const [status, setStatus] = React.useState<"error" | "success" | "loading">("loading");

    const fetchTags = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}${GET_APPROVED_TAGS}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                const json = await res.json();
                setTags(json);
                setStatus("success");
                console.log(json);
            } else {
                setStatus("error");
                console.log(res.status);
            }
        } catch (e) {
            setStatus("error");
            console.log(e);
        }
    };

    React.useEffect(() => {
        setStatus("loading");
        fetchTags();
    }, []);

    if (status == "loading") {
        return (
            <div
                style={{
                    position: "absolute",
                    inset: "0",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 999,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CircularProgress
                    color="primary"
                    size={80}
                    thickness={3}
                />
            </div>
        )
    }

    if (status === "error") {
        return (<></>)
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Approved Tags</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Requested By</TableCell>
                                    <TableCell>Accepted By</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tags.map(tag => (
                                        <TableRow
                                            key={tag.name}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {tag.name}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={tag.tagStatus}
                                                    color={tag.tagStatus === "approved" ? "success" : "error"}
                                                />
                                            </TableCell>
                                            <TableCell>{tag.requestedByID}</TableCell>
                                            <TableCell>{tag.acceptedByID}</TableCell>
                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    )
}