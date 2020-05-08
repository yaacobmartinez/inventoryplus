import React from 'react'
import { Slide, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(8, 2, 0, 8)
    }
}))
function Orders() {
    const classes = useStyles()
    return (
        <Slide in={true} >
            <div className={classes.root}>
                Orders
            </div>
        </Slide>
    )
}

export default Orders
