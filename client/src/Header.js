import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(props.authorized);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                    {auth && (
                        <Typography> Your are logged in as {props.userName}</Typography>
                    )}
                    <Button variant="contained" color="default">{auth
                        ? <Link to="/logout">logout</Link>
                        : <Link to="/login">login</Link>}
                    </Button>
                    {auth && (
                        <Button variant="contained" color="default"> <Link to="/history">history</Link> </Button>)}
                    {auth && (<Button variant="contained" color="default"> <Link to="/chat">Chat</Link> </Button>)}
                </Toolbar>
            </AppBar>
        </div>
    );
}