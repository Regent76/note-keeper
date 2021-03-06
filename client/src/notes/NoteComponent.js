import {connect} from "react-redux";
import {noteAction} from "../actions";
import React, {Component} from "react";
import AppBar from "../components/Appbar";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Nav from "../components/Nav";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {withRouter} from "react-router-dom";

import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Button,
    IconButton,
} from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme) => ({
    typography: {
        useNextVariants: true,
    },
    root: {
        flexGrow: 1,
    },
    appFrame: {
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    "appBar-left": {
        marginLeft: drawerWidth,
    },
    "appBar-right": {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    paper: {
        position: "absolute",
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
});

class Note extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(noteAction.getNote());
    }

    handleChange = (event) => {
        this.setState({
            anchor: event.target.value,
        });
    };
    handleClick = (event, id) => {
        const {dispatch} = this.props;
        dispatch(noteAction.deleteNoteById(id));
    };

    render() {
        const {classes} = this.props;
        const {note} = this.props.note;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar/>
                    <Nav/>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Grid container spacing={6}>
                            <Grid item xs={3} align="left">
                                <Typography>{"Notes"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={3} container justify="flex-end">
                            </Grid>
                        </Grid>
                        <Grid container spacing={6}>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs={3} container justify="flex-end">
                                <Button variant="contained" color="primary" className={classes.button} component="a"
                                        href="/add-note">Add Note</Button>
                            </Grid>
                        </Grid>
                        <br/><br/>
                        <Grid container spacing={6}>
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Owner</TableCell>
                                            <TableCell>Message</TableCell>
                                            <TableCell>Created at</TableCell>
                                            <TableCell>Updated at</TableCell>
                                            <TableCell>Created by</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {note.map((n) => {
                                            let createdAt = new Date(n.createdAt);
                                            createdAt = createdAt.toLocaleString();
                                            let updatedAt = new Date(n.updatedAt);
                                            updatedAt = updatedAt.toLocaleString();
                                            return (
                                                <TableRow key={n._id}>
                                                    <TableCell>{n.owner}</TableCell>
                                                    <TableCell component="th" scope="row"> {n.message} </TableCell>
                                                    <TableCell>{createdAt}</TableCell>
                                                    <TableCell>{updatedAt}</TableCell>
                                                    <TableCell component="th" scope="row"> {n.createdBy} </TableCell>
                                                    <TableCell>
                                                        <IconButton className={classes.button} aria-label="Edit"
                                                                    component="a" href={`/notes/${n._id}`}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton className={classes.button} aria-label="Delete"
                                                                    onClick={(event) => this.handleClick(event, n._id)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </main>
                </div>
            </div>
        );
    }
}

Note.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        note: state.note
    };
};
const connectedNotePage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(Note)));
export {connectedNotePage as Note};