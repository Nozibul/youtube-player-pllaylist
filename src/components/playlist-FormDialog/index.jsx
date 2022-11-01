import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

 const PlaylistDialog =({open, handleClose, getPlaylistId})=> {
   const [state, setState] = useState('');
   
   const handleSubmit=()=>{
      if(!state){
        alert('Invalid PlaylistId or Playlist link')
      }else{
        getPlaylistId(state);
        setState('');
        handleClose();
      }
   }

  return (
    <div>
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Playlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new playlist please insert the playlistId or playlist link.
            Please make sure the link is correct. Otherwise we won't able to fetch
            the playlist information.
          </DialogContentText>
          <TextField
            onChange={(e)=>setState(e.target.value)}
            autoFocus
            margin="dense"
            label="playlistId or playlist link"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PlaylistDialog