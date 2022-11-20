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

const ExploreEventsMap = ({ events }) => {
    const [viewport, setViewport] = useState({
        longitude: 26.096306,
        latitude: 44.439663,
        zoom: 10
    });

    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <Map
            initialViewState={viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            style={{ width: '100%', height: '100%' }}
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
                                src={selectedEvent.pictures[0]}
                                height={100}
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
                                        {selectedEvent.partners
                                            .map((partner) => partner.name)
                                            .join(', ')}
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
