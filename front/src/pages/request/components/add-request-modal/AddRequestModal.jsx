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
    const { isOpen, handleClose, event, action } = props;
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [description, setDescription] = useState('');

    const saveRequest = () => {
        //ownerId - from event obj
        //partnerId - e user-ul in sine
        //actionId from NGO obj

        const obj = {
            event: selectedEvent,
            description: description,
            action: action._id
        };
        console.log(obj, action);

        axios.post('/request/create', obj).then(() => {
            console.log('SUCCESs');
        });
    };
    useEffect(() => {
        axios.get('/event/search?active=true').then((res) => {
            console.log(res.data);
            setEvents(res.data.events);
            // if(res.data.events.length > 0){

            //     setSelectedEvent(res.data.events[0]._id)
            // }
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
                        <FormControl fullWidth>
                            <InputLabel id="action">Event</InputLabel>
                            <Select
                                id="action"
                                label="Event"
                                onChange={(event) => {
                                    setSelectedEvent(event.target.value);
                                }}
                                value={selectedEvent}>
                                {events.length !== 0 &&
                                    events.map((item) => (
                                        <MenuItem
                                            value={item._id}
                                            key={item._id + item.title}>
                                            {item.title}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <TextField
                                id="description"
                                label="description"
                                variant="outlined"
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
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
