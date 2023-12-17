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
import { BACKEND_URL, GET_TAGS, APPROVE_TAG } from "@/routes";

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
            const res = await fetch(`${BACKEND_URL}${GET_TAGS}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                const json = await res.json();
                setTags(json);
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (e) {
            setStatus("error");
        }
    };

    const approveTag = async (tagName: string) => {
        try {
            const res = await fetch(`${BACKEND_URL}${APPROVE_TAG}${tagName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        // Return loading indicator
    }

    if (status === "error") {
        // Return error message
    }

    return (
        <Container>
            {/* Your UI layout goes here */}
            <TableContainer component={Paper}>
                {/* ... */}
                <TableBody>
                    {tags.map((tag) => (
                        <TableRow key={tag.name}>
                            {/* ... */}
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => approveTag(tag.name)}
                                >
                                    Approve
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </Container>
    );
};

export default TagApplicationsPage;