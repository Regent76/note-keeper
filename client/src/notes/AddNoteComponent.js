import React, {Component} from 'react';
import AppBar from '../components/Appbar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Nav from '../components/Nav';
import {connect} from 'react-redux';
import {noteAction} from '../actions';
import {withRouter} from 'react-router-dom';


import {Typography, Paper, Grid, Button, TextField} from '@material-ui/core';


const drawerWidth = 240;

const styles = theme => ({
    typography: {
        useNextVariants: true,
    },
    root: {
        flexGrow: 1,
    },
    contentRoot: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
});

class AddNote extends Component {
    handleChange = prop => event => {
        const {dispatch} = this.props;
        dispatch(noteAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const {match: {params}} = this.props;
        if (params.id) {
            const {dispatch} = this.props;
            dispatch(noteAction.getNoteById(params.id));
        }
    }

    handleClick(event) {
        const {match: {params}} = this.props;
        const {dispatch} = this.props;
        let payload = {
            message: this.props.note.message,
        };
        if (params.id) {
            dispatch(noteAction.editNoteInfo(params.id, payload));
        } else {
            dispatch(noteAction.createNote(payload));
        }
    }

    render() {
        const {classes} = this.props;
        const {match: {params}} = this.props;

        function InsertText(props) {
            return <Typography>{'Add New Note'}</Typography>;
        }

        function EditText(props) {
            return <Typography>{'Edit Note'}</Typography>;
        }

        function SegHeader() {
            if (params.id) {
                return <EditText/>;
            }
            return <InsertText/>;
        }

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar/>
                    <Nav/>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Grid container spacing={6}>
                            <Grid item xs={3}>
                                <SegHeader/>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={3} container justify="flex-end">
                            </Grid>
                        </Grid>
                        <br/><br/>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <div>
                                    <Paper className={classes.contentRoot} elevation={1}>
                                        <form className={classes.container}>
                                            <Grid container spacing={6}>
                                                <Grid item xs={8}>
                                                    <TextField
                                                        id="message"
                                                        label="Message"
                                                        multiline
                                                        fullWidth
                                                        placeholder="Enter your Note text here"
                                                        className={classes.textField}
                                                        value={this.props.note.message}
                                                        onChange={this.handleChange('message')}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <Grid container spacing={6}>
                                                <Grid item xs={3}>
                                                </Grid>
                                                <Grid item xs={6}>
                                                </Grid>
                                                <Grid item xs={3} container justify="center">
                                                    <Grid container spacing={6}>
                                                        <Grid item xs={6} container justify="center">
                                                            <Button variant="contained" color="secondary"
                                                                    className={classes.button} component='a'
                                                                    href="/notes">Cancel</Button>
                                                        </Grid>
                                                        <Grid item xs={6} container justify="flex-start">
                                                            <Button variant="contained" color="primary"
                                                                    className={classes.button}
                                                                    onClick={(event) => this.handleClick(event)}>Save</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                    </main>
                </div>
            </div>
        );
    }
}

AddNote.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return state;
};

const connectedAddNotePage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddNote)));
export {connectedAddNotePage as AddNote};