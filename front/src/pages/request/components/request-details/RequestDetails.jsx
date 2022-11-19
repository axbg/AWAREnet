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
    FormControlLabel,
    Checkbox
} from '@mui/material';
import styles from './RequestDetails.module.scss';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import _ from 'lodash';

export const RequestDetails = (props) => {
    const { isOpen, handleClose, request } = props;
    const {
        state: { user }
    } = useGlobalContext();

    const approveRequest = () => {
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
                    <FormControlLabel
                        value={true}
                        control={<Checkbox />}
                        label="Do you approve this partnership?"
                        labelPlacement="start"
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                {/* <Button onClick={() => saveRequest()}>Save</Button> */}
            </DialogActions>
        </Dialog>
    );
};
