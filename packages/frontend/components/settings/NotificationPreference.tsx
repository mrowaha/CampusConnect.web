import React from 'react' ;
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Switch,
    Grid,
    Typography,
} from '@mui/material' ;

interface notificationPrefProps {
    showEmailPreference : boolean;
    showAppPreference : boolean;
    handleEmailPrefernce : any;
    handleAppPreference : any;
}

export const NotificationPreference : React.FC<notificationPrefProps> = ({
    showEmailPreference,
    showAppPreference,
    handleEmailPrefernce,
    handleAppPreference,
}) => {
    return (
        <FormControl component="fieldset" sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Notification Preference
            </Typography>
            <FormGroup>
            <FormControlLabel
                control={<Switch checked={showEmailPreference} onChange={handleEmailPrefernce} />}
                label="Email"
            />
            <FormControlLabel
                control={<Switch checked={showAppPreference} onChange={handleAppPreference} />}
                label="In-App"
            />
            </FormGroup>
        </FormControl>
    );
};

