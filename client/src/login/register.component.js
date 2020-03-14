import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {userActions} from '../actions';
import {history} from '../helpers';
import {withRouter} from 'react-router-dom';
import {Paper, Grid, Button, TextField, Typography} from '@material-ui/core';

const styles = theme => ({
    typography: {
        useNextVariants: true,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('auth')) {
            history.push('/home');
        }
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };
    register = event => {
        this.setState({submitted: true});
        const {email, password} = this.state;
        const {dispatch} = this.props;
        if (email && password) {
            dispatch(userActions.register(email, password));
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className="login-margin">
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography component={'h1'} variant={'h1'}>{'Register'}</Typography>
                        </Paper>
                        <Paper className={classes.paper}>
                            <div>
                                <TextField
                                    label="email"
                                    value={this.state.email}
                                    className={classes.textField}
                                    onChange={this.handleChange('email')}
                                />
                                <br/><br/>
                                <TextField
                                    label="Password"
                                    autoComplete="current-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    className={classes.textField}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                />
                                {this.state.errorMessage &&
                                <h3 className="error"> {this.state.errorMessage} </h3>}
                                <br/><br/>
                                <Button variant="contained" color="primary" className={classes.button}
                                        onClick={(event) => {
                                            this.register()
                                        }}>Register</Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {registerDone} = state.authentication;
    return {
        registerDone
    };
};
const connectedRegisterPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Register)));
export {connectedRegisterPage as Register};