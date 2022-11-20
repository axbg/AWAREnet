import React from 'react';
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

export const ImageListModal = (props) => {
    const { isOpen, handleClose, action } = props;

    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/'
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/'
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/'
        }
    ];

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
