import { EventCard } from 'components/EventCard/EventCard';
import React from 'react';

import './ExploreEventsList.scss';

const ExploreEventsList = ({ events }) => {
    return (
        <div className="explore-events-list">
            {events.map((ev, index) => (
                <EventCard key={index} eventData={ev} />
            ))}
        </div>
    );
};

export { ExploreEventsList };
