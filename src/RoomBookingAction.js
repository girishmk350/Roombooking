import React from 'react'
import MaterialUI from './MaterialUI'
import { pink } from '@mui/material/colors';

const RoomBookingAction = ({ item }) => {
    return (
        <>
            <MaterialUI.Box p={1}>
                <MaterialUI.ListItem>
                    <MaterialUI.ListItemAvatar>
                        <MaterialUI.Avatar>
                            {item.Icon}
                        </MaterialUI.Avatar>
                    </MaterialUI.ListItemAvatar>
                    <MaterialUI.ListItemText primary={item.Title} />
                    <MaterialUI.Box sx={{ display: 'flex' }}>
                        <MaterialUI.IconButton aria-label="donotdistribute" size="large" disabled={item.DecDisable} onClick={item.Decrement}>
                            <MaterialUI.DoNotDisturbOnIcon fontSize="inherit" color="primary" sx={{ fontSize: 40 }} />
                        </MaterialUI.IconButton>
                        <MaterialUI.Typography variant="h6" gutterBottom component="div" p={2}>
                            {item.Count}
                        </MaterialUI.Typography>
                        <MaterialUI.IconButton aria-label="add to circle" size="large" disabled={item.IncDisable} onClick={item.Increment}>
                            <MaterialUI.AddCircleIcon fontSize="inherit" sx={{ color: pink[500], fontSize: 40 }} />
                        </MaterialUI.IconButton>
                    </MaterialUI.Box>
                </MaterialUI.ListItem>
            </MaterialUI.Box>
            <MaterialUI.Divider />
        </>
    )
}

export default RoomBookingAction
