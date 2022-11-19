import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment';

import './ExploreEventsMap.scss';
import { Button, Grid, Typography } from '@mui/material';

const calculateTimeDifference = (eventTs) => {
    const now = moment();
    const eventTime = moment(eventTs);
    return now.diff(eventTime, 'd');
};

const calculatePinColor = (timeDifference) => {
    switch (true) {
        case timeDifference <= 5:
            return 'error';
        case timeDifference <= 10:
            return 'warning';
        case timeDifference > 10:
            return 'success';
    }
};

const ExploreEventsMap = () => {
    const [viewport, setViewport] = useState({
        longitude: 26.096306,
        latitude: 44.439663,
        zoom: 10
    });
    const [events, setEvents] = useState([
        {
            location: [
                { lat: '44.44504451085233', long: '26.101622369303502' }
            ],
            timestampStart: '2022-11-09',
            title: 'Cool event',
            shortDescription: 'A short description',
            partners: ['BMW', 'OMV']
        },
        {
            location: [{ lat: '44.41095553009465', long: '26.14770126983265' }],
            timestampStart: '2022-11-17',
            title: 'Cooler event',
            shortDescription: 'A short description',
            partners: ['Glovo']
        }
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <Map
            initialViewState={viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/ioanaberdei/ck9skae4j0c0u1ip47213ro3l"
            mapboxAccessToken="pk.eyJ1IjoiaW9hbmFiZXJkZWkiLCJhIjoiY2s5c2swcjQxMDJudDNucDhjNHEyaXk4byJ9.ia1jixW2yKendX2Janc25w">
            {events.map((ev, index) => (
                <Marker
                    key={index}
                    latitude={ev.location[0].lat}
                    longitude={ev.location[0].long}>
                    <button
                        className="marker-btn"
                        onClick={() => setSelectedEvent(ev)}>
                        <LocationOnIcon
                            color={calculatePinColor(
                                calculateTimeDifference(ev.timestampStart)
                            )}
                        />
                    </button>
                </Marker>
            ))}
            {selectedEvent && (
                <Popup
                    latitude={selectedEvent.location[0].lat}
                    longitude={selectedEvent.location[0].long}
                    onClose={() => setSelectedEvent(null)}
                    closeOnClick={false}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img
                                alt="complex"
                                src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
                                height={50}
                            />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                        component="div">
                                        {selectedEvent.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {selectedEvent.shortDescription}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary">
                                        {selectedEvent.partners.join(', ')}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="primary"
                                        variant="contained"
                                        size="small">
                                        Go to event page
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Popup>
            )}
        </Map>
    );
};

export { ExploreEventsMap };
