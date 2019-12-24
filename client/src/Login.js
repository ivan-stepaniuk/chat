import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import firebase from 'firebase';
import {Redirect} from "react-router-dom";
import {db} from "./index.js";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.signInRequest = this.signInRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            authorized: false,
            user: firebase.auth().currentUser,
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    signInRequest(e) {
        e.preventDefault();

        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((authData) => {
                db.collection("users").doc(authData.user.uid).get().then((doc) => {
                    const user = doc.data();

                    if (user) {
                        window.localStorage.setItem('authorized', true);
                        window.localStorage.setItem('name', user.name);
                        this.setState({authorized: true})
                    }
                })
            }).catch((err) => {
            this.setState({error: err.message})
        })
    }

    render() {

        if (this.state.authorized) {
            return (
                <Redirect to='/chat'/>
            )
        }

        return (
            <Container component="main" maxWidth="xs">
                <p>{this.state.error}</p>
                <div>
                    <Typography component="h1" variant="h5" align={"center"}>
                        Login
                    </Typography>
                    <br/>
                    <form onSubmit={this.signInRequest}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>

                <br/>
                <br/>
                <div className="align-center">
                    <p>or you can chat as anonymous</p>
                    <Button variant="outlined" color="primary">
                       <Link href="/chat">Go to Chat</Link>
                    </Button>
                </div>
            </Container>
        );
    }
}

export default Login