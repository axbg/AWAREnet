import { PageContainer } from 'components/page-container/PageContainer';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

import styles from './Events.module.scss';

export const Events = () => {
    return (
        <PageContainer>
            <div className={styles.eventsContainer}>
                <div className={styles.heading}>
                    <span>Workshop: sortare selectiva</span>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
                <div className={styles.subheading}>
                    <span>20/12/2022</span>
                    <span>Location: Bucharest</span>
                </div>
                <img
                    className={styles.eventsImg}
                    src="https://via.placeholder.com/500x200"
                    alt="Card cap"
                />

                <span>Description</span>
                <span>
                    La baza campaniilor de responsabilitate sociala corporativa
                    pe care le desfasuram atat la nivel local, cat si global,
                    rezida strategia “Triple P bottom line” (People, Planet &
                    Profits), care se axeaza pe masurarea impactului
                    activitatilor noastre asupra vietii oamenilor si asupra
                    planetei, pe langa rezultatele financiare. In completarea
                    actiunilor locale anuale realizate in colaborare cu
                    asociatii non-guvernamentale in care credem si care
                    functioneaza avand la baza aceleasi valori pe care si noi le
                    promovam (Plantam fapte bune in Romania, Taxiul cu Bomboane,
                    Team Work, Crucea Rosie), din luna iunie am dezvoltat un nou
                    proiect axat pe protejarea mediului si sustenabilitate.
                </span>
            </div>
        </PageContainer>
    );
};
