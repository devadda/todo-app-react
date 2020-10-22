import { Avatar, Button, TextField, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'
import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import db from '../firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const Todo = ({text, time, id}) => {

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
        setInput(text)
    };

    const handleClose = () => {
        setOpen(false);
    }; 

    const updateText = () => {
        db.collection('todos').doc(id).set({
            todo: input,
        }, {merge: true})

        handleClose()
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit Todo</h2>
          <p id="simple-modal-description">

            <TextField
                label="Dense"
                id="outlined-margin-dense"
                defaultValue="Default Value"
                margin="Todo"
                variant="outlined"
                value={input} onChange={event => setInput(event.target.value)} 
                style={{width:'100%'}}
            />
            <Button 
                onClick={updateText} 
                style={{backgroundColor:'#2ecc71', color:"#fff", margin:'10px 0 0 5px'}}
            >Update</Button>
          </p>
        </div>
    );
    return (
      <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        <ListItem>
            <ListItemAvatar>
            <Avatar>
                <ImageIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText primary={text} secondary={time} />
            <Button onClick={handleOpen}> <EditIcon style={{color:'green'}} /> Edit </Button>
            <Button onClick={event => db.collection('todos').doc(id).delete()}><DeleteSweepIcon style={{color:'red'}} /> Delete Me</Button>
        </ListItem>
      </Fragment>
    )
}

export default Todo
