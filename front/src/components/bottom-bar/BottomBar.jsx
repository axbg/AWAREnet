import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

export function BottomBar() {
    const [value, setValue] = React.useState('dashboard');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{ width: '100%' }}
            value={value}
            onChange={handleChange}
            className="bottom-navigation">
            <BottomNavigationAction
                label="Dashboard"
                value="dashboard"
                onClick={() => navigate('/dashboard')}
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                label="Explore"
                value="explore"
                onClick={() => navigate('/explore')}
                icon={<LocationOnIcon />}
            />
            <BottomNavigationAction
                label="Leaderboard"
                value="leaderboard"
                onClick={() => navigate('/leaderboard')}
                icon={<EmojiEventsIcon />}
            />
            <BottomNavigationAction
                label="History"
                value="history"
                onClick={() => navigate('/event-history')}
                icon={<HistoryIcon />}
            />
        </BottomNavigation>
    );
}
