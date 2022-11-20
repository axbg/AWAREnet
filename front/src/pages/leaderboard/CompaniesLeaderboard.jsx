import { Done } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Rating
} from '@mui/material';
import React, { useState } from 'react';

import './CompaniesLeaderboard.scss';

const CompaniesLeaderboard = () => {
    const [companies, setCompanies] = useState([
        { name: 'Systematic', backgroundCheck: true, rating: 4 },
        { name: 'BMW', backgroundCheck: false, rating: 3 },
        { name: 'Metro Systems', backgroundCheck: true, rating: 4.5 }
    ]);
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
                            <div>{company.rating}</div>
                            <Rating value={company.rating} precision={0.1} />
                        </div>
                        {company.backgroundCheck && (
                            <Chip
                                label="Background check"
                                icon={<Done />}
                                color="success"
                            />
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export { CompaniesLeaderboard };
