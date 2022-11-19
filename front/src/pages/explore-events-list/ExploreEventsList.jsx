import { EventCard } from 'components/EventCard/EventCard';
import React from 'react';

import './ExploreEventsList.scss';

const ExploreEventsList = () => {
    return (
        <div className="explore-events-list">
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    );
};

export { ExploreEventsList };
