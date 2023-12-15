import React from 'react';
import { FormControl, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';

interface languageProps {
    showTurkishPreference : boolean;
    handleTurkishPreference : any;
}

export const LanguagePreference : React.FC<languageProps> = ({
    showTurkishPreference,
    handleTurkishPreference,
}) => {
    return(
        <FormControl> 
            <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
                Language Preference
            </Typography>
            <FormGroup>
            <FormControlLabel
                control={<Switch checked={showTurkishPreference} onChange={handleTurkishPreference} />}
                label="Turkish"
            />
            </FormGroup>

        </FormControl>
    );
};
    
