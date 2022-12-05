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
import _ from 'lodash';

// import _ from 'lodash';

export const RequestDetails = (props) => {
    const { isOpen, handleClose, request, type } = props;
    const [checkboxVal, setCheckboxVal] = useState(false);
    const {
        state: { user }
    } = useGlobalContext();
    console.log('TED', request);

    const approveRequest = () => {
        console.log(request, checkboxVal);
        handleClose(true);
        axios
            .post('/request/respond', {
                id: request.id,
                response: checkboxVal + ''
            })
            .then((res) => {
                console.log(res);
            });
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
                                variant="outlined"
                                value={_.get(request, 'description', 'N/A')}
                                disabled
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="action">
                                {_.get(request, 'event.title', 'N/A')}
                            </InputLabel>
                            <Select id="action" label="Event" disabled>
                                <MenuItem
                                    value={_.get(request, 'event._id', 12)}>
                                    {_.get(request, 'event.title', 'N/A')}
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
