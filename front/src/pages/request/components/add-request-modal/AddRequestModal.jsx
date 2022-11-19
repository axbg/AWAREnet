import React, { useRef } from 'react';
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

export const AddRequestModal = (props) => {
    const { isOpen, handleClose, event } = props;
    const {
        state: { user }
    } = useGlobalContext();

    const saveRequest = () => {
        //ownerId - from event obj
        //partnerId - e user-ul in sine
        //actionId from NGO obj
        console.log(user);
        handleClose(true);
    };
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
                                    // onChange={(event) =>
                                    //     // setAction(event.target.value)
                                    // }
                                    // value={action}
                                >
                                    <MenuItem value={'Workshop1'}>
                                        Workshop
                                    </MenuItem>
                                    <MenuItem value={'Workshop2'}>
                                        Workshop2
                                    </MenuItem>
                                    <MenuItem value={'Workshop3'}>
                                        Workshop3
                                    </MenuItem>
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
