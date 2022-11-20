import { Done, Masks } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Rating
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './CompaniesLeaderboard.scss';

const CompaniesLeaderboard = () => {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        axios
            .get('/user/leaderboard', { withCredentials: true })
            .then((res) => setCompanies(res.data.companies));
    }, []);
    return (
        <div className="companies-leaderboard">
            {companies.map((company, index) => (
                <Card key={index} variant="outlined" className="company-card">
                    <CardHeader
                        className="company-card-header"
                        avatar={<Avatar>{company.name.charAt(0)}</Avatar>}
                        title={company.name}
                    />
                    <CardContent className="company-card-content">
                        <div className="company-rating">
                            <div>{company.score}</div>
                            <Rating value={company.score} precision={0.1} />
                        </div>
                        <div className="chips-container">
                            {company.backgroundCheck && (
                                <Chip
                                    label="Background check"
                                    icon={<Done />}
                                    color="success"
                                />
                            )}
                            {company.backgroundCheck && (
                                <Chip
                                    label="Carbon footprint check"
                                    icon={<Masks />}
                                    color="warning"
                                />
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export { CompaniesLeaderboard };
