import React, { useState } from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Rating
} from '@mui/material';
import styles from './ReviewEventModal.module.scss';

//TODO
export const ReviewEventModal = (props) => {
    const { isOpen, handleClose } = props;
    const [rating, setRating] = useState(0);

    const saveRequest = () => {};
    // useEffect(() => {}, []);

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
