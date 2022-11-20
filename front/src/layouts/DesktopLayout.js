import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './DesktopLayout.scss';
import { ResponsiveAppBar } from 'components/navigation-bar/ResponsiveAppBar';

//specific to NGOs and companies
const pagesNGO = [
    { name: 'Dashboard', url: '/dashboard-ngo' },
    { name: 'Create Event', url: '/add-event' },
    { name: 'Past Events', url: '/event-history' },
    { name: 'Requests', url: '/requests' },
    { name: 'Actions', url: '/actions' } //todo
];
const pagesCompany = [
    { name: 'Dashboard', url: '/dashboard-company' },
    { name: 'Actions', url: '/actions' }
    // { name: 'Past Events', url: '/event-history' }
];
const DesktopLayout = () => {
    //TODO: to be determined with respect to user type
    const [pages, setPages] = useState(pagesNGO);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const getPages =
            _.get(user, 'type') === 'ngo' ? pagesNGO : pagesCompany;
        setPages(getPages);
    }, [localStorage.getItem('user')]);
    // const pages = ['Dashboard', 'Create Event', 'Past Events'];

    console.log(pages);

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
