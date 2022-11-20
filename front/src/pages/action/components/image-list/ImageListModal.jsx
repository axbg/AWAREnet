import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';

import styles from './ImageListModal.module.scss';
import _ from 'lodash';
import { useState } from 'react';

export const ImageListModal = (props) => {
    const { isOpen, handleClose, data, action } = props;
    const [images, setImages] = useState([]);
    useEffect(() => {
        const newImg = data.map((item) => {
            return { original: item, thumbnail: item };
        });
        setImages(newImg);
    }, [data]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{ classes: { root: styles.dialog } }}
            maxWidth="xl">
            <DialogTitle>Action images</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {_.get(action, 'description', "See what's has improved")}
                </DialogContentText>
                <div className={styles.imageContainer}>
                    <ImageGallery items={images} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
