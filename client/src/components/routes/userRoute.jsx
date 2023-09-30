import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './loadingToRedirect'

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    return user 
        ? children
        : <LoadingToRedirect/>
}

export default UserRoute