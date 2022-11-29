import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Map, { Marker } from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { isEmpty } from 'lodash';

import './AddEvent.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    const [eventDateTime, setEventDateTime] = useState();
    const [eventTitle, setEventTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [description, setDescription] = useState('');
    const [action, setAction] = useState('');
    const [type, setType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({});
    const [pictures, setPictures] = useState([]);
    const navigate = useNavigate();

    const postEvent = () => {
        const newEvent = {
            timestampStart: eventDateTime,
            title: eventTitle,
            shortDescription: shortDesc,
            description,
            action,
            type,
            location: [
                { lat: selectedLocation.lat, long: selectedLocation.lng }
            ],
            pictures
        };
        axios
            .post('/event/create', { ...newEvent }, { withCredentials: true })
            .then((res) => navigate('/dashboard'));
    };

    const [viewport, setViewport] = useState({
        longitude: 26.096306,
        latitude: 44.439663,
        zoom: 10
    });

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
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            <Box p={2} className="add-event-form">
                <Typography variant="h3" gutterBottom>
                    Add event
                </Typography>
                <Grid
                    container
                    direction="column"
                    className="container-add-event">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Event date"
                            value={eventDateTime}
                            onChange={(newValue) => {
                                setEventDateTime(newValue.utc().valueOf());
                            }}
                        />
                    </LocalizationProvider>
                    <FormControl>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            onChange={(event) =>
                                setEventTitle(event.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="shortDesc"
                            label="Short description"
                            variant="outlined"
                            onChange={(event) =>
                                setShortDesc(event.target.value)
                            }
                        />
                    </FormControl>
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
                    <Map
                        onClick={(event) => {
                            setSelectedLocation(event.lngLat);
                        }}
                        initialViewState={viewport}
                        onViewportChange={(viewport) => setViewport(viewport)}
                        style={{ width: '50vw', height: '50vh' }}
                        mapStyle="mapbox://styles/ioanaberdei/ck9skae4j0c0u1ip47213ro3l"
                        mapboxAccessToken="pk.eyJ1IjoiaW9hbmFiZXJkZWkiLCJhIjoiY2s5c2swcjQxMDJudDNucDhjNHEyaXk4byJ9.ia1jixW2yKendX2Janc25w">
                        {!isEmpty(selectedLocation) && (
                            <Marker
                                latitude={selectedLocation?.lat}
                                longitude={selectedLocation?.lng}>
                                <button className="marker-btn">
                                    <LocationOnIcon color="secondary" />
                                </button>
                            </Marker>
                        )}
                    </Map>
                    <FormControl fullWidth>
                        <InputLabel id="action">Action</InputLabel>
                        <Select
                            id="action"
                            label="Action"
                            onChange={(event) => setAction(event.target.value)}
                            value={action}>
                            <MenuItem value={'talk'}>Talk</MenuItem>
                            <MenuItem value={'activity'}>Activity</MenuItem>
                            <MenuItem value={'workshop'}>Workshop</MenuItem>
                            <MenuItem value={'event'}>Event</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                            id="type"
                            label="Type"
                            onChange={(event) => setType(event.target.value)}
                            value={type}>
                            <MenuItem value={'clean-up'}>Clean-up</MenuItem>
                            <MenuItem value={'waste-collection'}>
                                Waste collection
                            </MenuItem>
                            <MenuItem value={'meeting'}>Meeting</MenuItem>
                            <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" component="label">
                        Upload pictures
                        <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={convertPicsToBase64}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        type="primary"
                        onClick={postEvent}>
                        Submit
                    </Button>
                </Grid>
            </Box>
        </Grid>
    );
};

export { AddEvent };
