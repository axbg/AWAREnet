import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Chip
} from '@mui/material';

import styles from './ImageListModal.module.scss';
import _, { isEmpty } from 'lodash';
import { useState } from 'react';
import Info from '@mui/icons-material/Info';

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
                {!isEmpty(images) ? (
                    <div className={styles.imageContainer}>
                        <ImageGallery items={images} />
                    </div>
                ) : (
                    <Chip
                        sx={{ marginTop: '10px' }}
                        icon={<Info />}
                        label="No images"
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
