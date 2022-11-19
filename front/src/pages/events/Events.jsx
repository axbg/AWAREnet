import React from 'react';
import { IconButton, Divider } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import styles from './Events.module.scss';

export const Events = () => {
    return (
        <div className={styles.eventsContainer}>
            <img
                className={styles.eventsImg}
                src="https://via.placeholder.com/400x200"
                alt="Card cap"
            />
            <div className={styles.subcontent}>
                <div className={styles.heading}>
                    <span>Workshop: sortare selectiva</span>
                    <IconButton aria-label="delete" disabled color="primary">
                        <AddOutlinedIcon />
                    </IconButton>
                </div>
                <span>
                    Powered by <strong>DevHacks</strong>
                </span>
                <Divider classes={{ root: styles.divider }} />
                <div className={styles.infoContainer}>
                    <div className={styles.dateContainer}>
                        <CalendarMonthOutlinedIcon />
                        <div className={styles.time}>
                            <span>20/12/2022</span>
                            <span>
                                <strong>10:00-12:00</strong>
                            </span>
                        </div>
                    </div>
                    <div className={styles.dateContainer}>
                        <LocationOnOutlinedIcon />
                        <div className={styles.time}>
                            <span>Bucharest</span>
                            <span>
                                <strong>Strada Ion Mihalache</strong>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <span>
                        <strong>Description</strong>
                    </span>
                    <span>
                        La baza campaniilor de responsabilitate sociala
                        corporativa pe care le desfasuram atat la nivel local,
                        cat si global, rezida strategia “Triple P bottom line”
                        (People, Planet & Profits), care se axeaza pe masurarea
                        impactului activitatilor noastre asupra vietii oamenilor
                        si asupra planetei, pe langa rezultatele financiare. In
                        completarea actiunilor locale anuale realizate in
                        colaborare cu asociatii non-guvernamentale in care
                        credem si care functioneaza avand la baza aceleasi
                        valori pe care si noi le promovam (Plantam fapte bune in
                        Romania, Taxiul cu Bomboane, Team Work, Crucea Rosie),
                        din luna iunie am dezvoltat un nou proiect axat pe
                        protejarea mediului si sustenabilitate.
                    </span>
                </div>
            </div>
        </div>
    );
};
