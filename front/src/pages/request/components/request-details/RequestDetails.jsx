import React, { useState } from 'react';
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
    FormControlLabel,
    Checkbox
} from '@mui/material';
import styles from './RequestDetails.module.scss';
import axios from 'axios';

// import _ from 'lodash';

export const RequestDetails = (props) => {
    const { isOpen, handleClose, request, type } = props;
    const [checkboxVal, setCheckboxVal] = useState(false);
    const {
        state: { user }
    } = useGlobalContext();

    const approveRequest = () => {
        //ownerId - from event obj
        //partnerId - e user-ul in sine
        //actionId from NGO obj
        console.log(request, checkboxVal);
        handleClose(true);
        // axios.post('/request/respond', {
        //     id: request._id
        // });
    };
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{ classes: { root: styles.dialog } }}
            maxWidth="xl">
            <DialogTitle>Request details</DialogTitle>
            <DialogContent>
                <DialogContentText>Here is your request</DialogContentText>
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
                        <FormControl>
                            <TextField
                                id="description"
                                label="description"
                                variant="outlined"
                            />
                        </FormControl>

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
                    </Grid>
                    {type === 'incoming' && (
                        <FormControlLabel
                            value={true}
                            control={<Checkbox />}
                            label="Do you approve this partnership?"
                            onChange={() => setCheckboxVal((prev) => !prev)}
                            labelPlacement="start"
                        />
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                {type === 'incoming' && (
                    <Button onClick={() => approveRequest()}>
                        Send response
                    </Button>
                )}
                <Button onClick={() => handleClose()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
