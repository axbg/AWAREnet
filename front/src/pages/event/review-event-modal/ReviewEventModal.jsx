import React from 'react';
import { useGlobalContext } from 'global-context';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Rating
} from '@mui/material';
import styles from './ReviewEventModal.module.scss';
import _ from 'lodash';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export const ReviewEventModal = (props) => {
    const { isOpen, handleClose, event, action } = props;
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    const saveRequest = () => {};
    useEffect(() => {}, []);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{ classes: { root: styles.dialog } }}
            maxWidth="xl">
            <DialogTitle>Review event</DialogTitle>
            <DialogContent>
                <Rating
                    value={rating}
                    precision={0.1}
                    color="secondary"
                    onChange={(event, newValue) => setRating(newValue)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => saveRequest()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
