import { Outlet } from 'react-router-dom';
import React from 'react';
import { BottomBar } from 'components/bottom-bar/BottomBar';

import './MobileLayout.scss';

const MobileLayout = () => (
    <>
        <main>
            <div>
                <Outlet className="mobile-content" />
                <BottomBar />
            </div>
        </main>
    </>
);

export { MobileLayout };
