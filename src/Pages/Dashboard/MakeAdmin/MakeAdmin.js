import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, SetEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();
    const handleOnBlur = e => {
        SetEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user={email}
        fetch('https://still-river-67240.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization':`Bearer ${token}`,
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data)
                    setSuccess(true)
                }
                
        })
        e.preventDefault()
    }
    return (
        <div>
            <h2>Make admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{width:'50%'}}
                    type='email' label="Email" variant="standard"
                    onBlur={handleOnBlur } />
                <Button type='submit' variant='contained'>Make Admin</Button>
            </form>
            {success && <Alert severity="success">Make admin successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;