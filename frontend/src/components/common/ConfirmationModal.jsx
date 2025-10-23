// Confirmation modal component
// Provides a reusable modal dialog for confirming user actions like delete, save, etc.
import React from 'react';
// Import Material UI modal components or similar
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// ConfirmationModal component for confirming important user actions
// Provides consistent confirmation dialogs throughout the application
const ConfirmationModal = ({ open, title, content, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onConfirm}>Confirm</button>
        </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;