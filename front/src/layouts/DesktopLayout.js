import { Outlet } from 'react-router-dom';
import React from 'react';

import './DesktopLayout.scss';
import { ResponsiveAppBar } from 'components/navigation-bar/ResponsiveAppBar';

//specific to NGOs and companies
const DesktopLayout = () => {
    //TODO: to be determined with respect to user type
    const pages = ['Dashboard', 'Create Event', 'Past Events'];
    return (
        <>
            <main>
                <div>
                    <ResponsiveAppBar pages={pages} />
                    <Outlet className="desktop-content" />
                </div>
            </main>
        </>
    );
};

export { DesktopLayout };
