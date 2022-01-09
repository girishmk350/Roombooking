import React, { useState, useEffect } from 'react'
import MaterialUI from './MaterialUI'
import RoomBookingAction from './RoomBookingAction'
import { MAX_IN_ROOM, MAX_PEOPLE, MAX_ROOMS, MIN_ADULTS, MIN_CHILD, MIN_ROOMS } from './constants'

const RoomBooking = () => {
    const [rooms, setRooms] = useState(MIN_ROOMS)
    const [adults, setAdults] = useState(MIN_ADULTS)
    const [children, setChildren] = useState(MIN_CHILD)
    const [isAdultChildAction, setAction] = useState('')

    useEffect(() => {
        setAction('')
        let totalCount = adults + children
        if (totalCount < rooms) {
            let diff = rooms - totalCount
            setAdults(adults + diff)
        } else if (totalCount > rooms) {
            let maxCount = rooms * 4
            if (totalCount > maxCount) {
                let diff = totalCount - maxCount
                if (children > 0 && children >= diff) {
                    setChildren(children - diff)
                } else if (children > 0 && children < diff) {
                    setChildren(0)
                    diff = diff - children
                    setAdults(adults - diff)
                } else {
                    setAdults(adults - diff)
                }
            }
        }
    }, [rooms])

    useEffect(() => {
        if (!isAdultChildAction) {
            return
        }
        let totalCount = adults + children
        let maxCount = rooms * 4
        if (totalCount > maxCount) {
            setRooms(rooms + 1)
        } else if (totalCount < rooms) {
            isAdultChildAction === 'minus' && setRooms(rooms - 1)
        }
    }, [adults, children])

    // Increment Room

    const incRoom = () => {
        if (rooms === MAX_ROOMS) {
            return
        }
        setRooms(rooms + 1)
    }

    //Decrement Room
    const decRoom = () => {
        if (rooms === MIN_ROOMS) {
            return
        }
        setRooms(rooms - 1)
    }

    // Increment Adult
    const incAdult = () => {
        let totalCount = adults + children
        if (totalCount === MAX_PEOPLE) {
            return
        }
        setAction('plus')
        setAdults(adults + 1)
    }
    // Decrement Adult
    const decAdult = () => {
        if (adults === MIN_ADULTS) {
            return
        }
        setAction('minus')
        setAdults(adults - 1)
    }

    // Increment Children
    const incChild = () => {
        let totalCount = adults + children
        if (totalCount === MAX_PEOPLE) {
            return
        }
        setAction('plus')
        setChildren(children + 1)
    }
    // Decrement Children
    const decChild = () => {
        if (children === 0) {
            return
        }
        setAction('minus')
        setChildren(children - 1)
    }

    const RoomCardItems = [
        // Rooms 
        {
            Icon: <MaterialUI.AirlineSeatIndividualSuiteIcon color="primary" />,
            Title: "Rooms",
            Count: rooms,
            Increment: incRoom,
            Decrement: decRoom,
            IncDisable: rooms === MAX_ROOMS ? true : false,
            DecDisable: rooms === MIN_ROOMS ? true : false

        },
        //Adults
        {
            Icon: <MaterialUI.PersonIcon color="primary" />,
            Title: "Adults",
            Count: adults,
            Increment: incAdult,
            Decrement: decAdult,
            IncDisable: (adults + children) === (MAX_ROOMS * MAX_IN_ROOM) ? true : false,
            DecDisable: adults === MIN_ADULTS ? true : false

        },
        //Children
        {
            Icon: <MaterialUI.AccessibilityIcon color="primary" />,
            Title: "Children",
            Count: children,
            Increment: incChild,
            Decrement: decChild,
            IncDisable: (adults + children) === (MAX_ROOMS * MAX_IN_ROOM) ? true : false,
            DecDisable: children === MIN_CHILD ? true : false
        },

    ]
    return (
        <>
            <MaterialUI.Container >
                <MaterialUI.Box mt={3} sx={{ border: '1px solid #e8e8e8' }}>
                    <MaterialUI.Box p={1}>
                        <MaterialUI.ListItem centered>
                            <MaterialUI.ListItemAvatar>
                                <MaterialUI.Avatar>
                                    <MaterialUI.GroupIcon color="primary" />
                                </MaterialUI.Avatar>
                            </MaterialUI.ListItemAvatar>
                            <MaterialUI.ListItemText primary="Choose number of People" />
                        </MaterialUI.ListItem>
                    </MaterialUI.Box>
                    <MaterialUI.Divider />
                    {RoomCardItems.map((item, i) => (
                        <RoomBookingAction item={item} key={i} />

                    ))}
                </MaterialUI.Box>
            </MaterialUI.Container>

        </>
    )
}

export default RoomBooking
