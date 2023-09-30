import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './loadingToRedirect'
import { currentAdmin } from '../functions/auth'

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [checkRole, setCheckRole] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    console.log(res)
                    setCheckRole(true)
                }).catch(err => {
                    //err
                    console.log(err)
                    setCheckRole(false)
                })
        }
    }, [user])
    return checkRole
        ? children
        : <LoadingToRedirect/>
}
export default AdminRoute