import React from 'react'
import { Slide, makeStyles, Typography, Paper, Toolbar, Button, Grid, } from '@material-ui/core'
import { Add, } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(8, 2, 0, 8)
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        paddingBottom: theme.spacing(4),
        borderRadius: 10
    },
    addBtn: {
        borderRadius: 20,
        textTransform: "none"
    },
    item: {
        textAlign: "center",
        borderRadius: 10,
        padding: theme.spacing(2),
        background: theme.palette.background.default
    }
}))
function Customers() {
    const classes = useStyles()
    return (
        <Slide in={true}>
            <div className={classes.root}>
                <Typography variant="h5">Customers</Typography>
                <Paper elevation={0} className={classes.paper}>
                    <Toolbar>
                        <Typography style={{ flex: 1 }} />
                        <Button edge="end" variant="contained" color="primary" startIcon={<Add />} className={classes.addBtn}>
                            New Customer
						</Button>
                    </Toolbar>

                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={4} md={2}>
                            <Paper className={classes.item}>
                                <div onClick={e => { console.log(e) }}>
                                    <Typography style={{ flex: 1 }}>Jacob</Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Paper className={classes.item}>
                                <div onClick={e => { console.log(e) }}>
                                    <Typography style={{ flex: 1 }}>Jacob</Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Paper className={classes.item}>
                                <div onClick={e => { console.log(e) }}>
                                    <Typography style={{ flex: 1 }}>Jacob</Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Paper className={classes.item}>
                                <div onClick={e => { console.log(e) }}>
                                    <Typography style={{ flex: 1 }}>Jacob</Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Paper className={classes.item}>
                                <div onClick={e => { console.log(e) }}>
                                    <Typography style={{ flex: 1 }}>Jacob</Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <Paper className={classes.item}>
                                <div onClick={e => { console.log(e) }}>
                                    <Typography style={{ flex: 1 }}>Jacob</Typography>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>

                </Paper>
            </div>
        </Slide>
    )
}

export default Customers
