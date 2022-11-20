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
    Select
} from '@mui/material';
import styles from './AddRequestModal.module.scss';
import _ from 'lodash';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export const AddRequestModal = (props) => {
    const { isOpen, handleClose, event } = props;
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));

    const saveRequest = () => {
        //ownerId - from event obj
        //partnerId - e user-ul in sine
        //actionId from NGO obj
        console.log(selectedEvent, user);
        handleClose(true);
    };
    useEffect(() => {
        axios.get('/event/search?active=true').then((res) => {
            console.log(res.data);
            setEvents(res.data.events);
        });
    }, []);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{ classes: { root: styles.dialog } }}
            maxWidth="xl">
            <DialogTitle>Add request</DialogTitle>
            <DialogContent>
                <DialogContentText>Create a new request</DialogContentText>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    className={styles.requestContainer}>
                    <Grid
                        container
                        direction="column"
                        className="container-add-event">
                        {_.get(event, 'id') ? (
                            <FormControl>
                                <TextField
                                    id="description"
                                    label="description"
                                    variant="outlined"
                                />
                            </FormControl>
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel id="action">Event</InputLabel>
                                <Select
                                    id="action"
                                    label="Event"
                                    onChange={(event) =>
                                        setSelectedEvent(event.target.value)
                                    }
                                    value={selectedEvent}>
                                    {events.length !== 0 &&
                                        events.map((item) => (
                                            <MenuItem
                                                value={item.id}
                                                key={item.id}>
                                                {item.title}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        )}
                        <FormControl>
                            <TextField
                                id="description"
                                label="description"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => saveRequest()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
