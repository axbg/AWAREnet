import React, { useState } from 'react';
import {
    Button,
    FormControl,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

import styles from './AddActionModal.module.scss';

export const AddActionModal = (props) => {
    const [description, setDescription] = useState('');
    const [pictures, setPictures] = useState([]);

    const saveAction = () => {
        const newEvent = {
            // authorId: userId,
            description,
            pictures
        };
        // TODO
        console.log(newEvent);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const convertPicsToBase64 = async (event) => {
        const files = event.target.files;
        const filesBase64Arr = [];
        for (let i = 0; i < files.length; i++) {
            const base64Img = await convertBase64(files[i]);
            filesBase64Arr.push(base64Img);
        }
        setPictures(filesBase64Arr);
    };

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            PaperProps={{ classes: { root: styles.dialog } }}
            maxWidth="xl">
            <DialogTitle>Add a new action</DialogTitle>
            <DialogContent>
                <DialogContentText>Create a new action</DialogContentText>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    className={styles.requestContainer}>
                    <Grid
                        container
                        direction="column"
                        className={styles.containerAddEvent}>
                        <FormControl fullWidth>
                            <TextField
                                id="desc"
                                label="Description"
                                variant="outlined"
                                multiline
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </FormControl>

                        <Button variant="contained" component="label">
                            Upload pictures
                            <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                onChange={convertPicsToBase64}
                            />
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose()}>Cancel</Button>
                <Button onClick={() => saveAction()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};
