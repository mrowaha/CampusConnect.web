import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useTheme from '@mui/material/styles/useTheme';

const ReportDialog = ({ open, onClose,  onReportSubmit }) => {
  const theme = useTheme();
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const handleReportSubmit = () => {
    onReportSubmit({
      reportTitle,
      reportDescription,
    });

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ color: theme.palette.primary.main}}>Report</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="reportTitle"
          label="Report Title"
          fullWidth
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="reportDescription"
          label="Report Description"
          fullWidth
          multiline
          rows={4}
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleReportSubmit} color="primary">
          Submit Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
