import React, { useState } from 'react';
import { Banner, StaticBanner } from 'material-ui-banner';
import { useEffect } from 'react';
import { closeBanner, useGlobalContext } from 'global-context';

export const BackgroundBanner = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        state: { bannerClosed },
        dispatch
    } = useGlobalContext();

    useEffect(() => {
        setIsOpen(bannerClosed);
    }, [bannerClosed]);

    const close = () => {
        setIsOpen(false);
        dispatch(closeBanner(false));
    };

    return (
        <Banner
            icon={<div />}
            label="Doing the background check will increase the chances to get yourself involved in more NGOs."
            open={isOpen}
            onClose={() => {
                close();
            }}
        />
    );
};
