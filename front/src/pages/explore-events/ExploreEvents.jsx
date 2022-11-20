import { Button, ButtonGroup } from '@mui/material';
import { ExploreEventsList } from 'pages/explore-events-list/ExploreEventsList';
import { ExploreEventsMap } from 'pages/explore-events-map/ExploreEventsMap';
import React from 'react';
import { useState } from 'react';
import './ExploreEvents.scss';

const ExploreEvents = () => {
    const [selectedMode, setSelectedMode] = useState(1);

    return (
        <div className="explore-events">
            <ButtonGroup
                disableElevation
                variant="contained"
                color="primary"
                className="explore-controls">
                <Button
                    color={'primary'}
                    onClick={() => setSelectedMode(1)}
                    variant={selectedMode === 1 ? 'contained' : 'outlined'}>
                    Map
                </Button>
                <Button
                    color={'primary'}
                    variant={selectedMode === 2 ? 'contained' : 'outlined'}
                    onClick={() => setSelectedMode(2)}>
                    List
                </Button>
            </ButtonGroup>
            <div className="explore-container">
                {selectedMode === 1 ? (
                    <ExploreEventsMap />
                ) : (
                    <ExploreEventsList />
                )}
            </div>
        </div>
    );
};

export { ExploreEvents };
