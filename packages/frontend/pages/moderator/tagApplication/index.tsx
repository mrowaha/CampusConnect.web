import React, { useState, useEffect } from "react";
import {
    Container,
    TableContainer,
    Paper,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Chip,
    Button,
    Grid,
    Typography,
    CircularProgress,
} from "@mui/material";
import { BACKEND_URL, GET_TAGS, APPROVE_TAG, GET_REQUESTED_TAGS } from "@/routes";
import { AUTH_TOKEN } from "@/auth";

export interface Tag {
    name: string;
    tagStatus: string;
    requestedByID: string;
    acceptedByID: string;
}

const TagApplicationsPage: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    const fetchTags = async () => {
        setStatus("loading");
        try {
            const res = await fetch(`${BACKEND_URL}${GET_REQUESTED_TAGS}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
                },
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

    const approveTag = async (tagName: string) => {
        try {
            console.log(`${BACKEND_URL}${APPROVE_TAG}${tagName}`)
            let token = localStorage.getItem(AUTH_TOKEN);
            const res = await fetch(`${BACKEND_URL}${APPROVE_TAG}${tagName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                console.log(json);
                fetchTags();
            } else {
                console.log(res.status);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    if (status === "loading") {
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
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Tag Name</TableCell>
                        <TableCell>Tag Status</TableCell>
                        <TableCell>Requested By</TableCell>
                        <TableCell>Accepted By</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <Table>
                    <TableBody>
                        {tags.map((tag) => (
                            <TableRow key={tag.name}>
                                <TableCell>
                                    {tag.tagStatus !== "APPROVED" && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => approveTag(tag.name)}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>{tag.name}</TableCell>
                                <TableCell>{tag.tagStatus}</TableCell>
                                <TableCell>{tag.requestedByID}</TableCell>
                                <TableCell>{tag.acceptedByID}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default TagApplicationsPage;
