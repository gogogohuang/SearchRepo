import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import moment from 'moment';
import isUndefined from 'lodash/isUndefined';

const _ = {
  isUndefined
}

const SearchAlertModal = ({ rateLimitReset, update }) => {
  return (
    <Dialog
      open={!_.isUndefined(rateLimitReset)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Request limit reached, please wait util
          <span style={{ color: 'red' }}>{moment.unix(rateLimitReset).format('HH:mm')}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => update({ rateLimitReset: undefined })} autoFocus> Confrim </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchAlertModal;
