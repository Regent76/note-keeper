import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography} from '@material-ui/core';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
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

class PermanentDrawer extends React.Component {
    state = {
        anchor: 'left',
    };
    handleChange = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    render() {
        const {classes} = this.props;
        const {anchor} = this.state;
        return (
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
            >
                <Toolbar>
                    <Typography variant="caption" color="inherit" noWrap>
                        Note-keeper v1.0.0
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

PermanentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PermanentDrawer);