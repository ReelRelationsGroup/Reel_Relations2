import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/user';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState(auth.username);
    const [password, setPassword] = useState('');
    const [passwordChange, setPasswordChange] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const id = auth.id
        if (passwordChange) {
            const data = {
                username,
                password,
            };
            dispatch(updateUser({ data, id }));
        } else {
            const data = {
                username
            };
            dispatch(updateUser({ data, id }));
        }
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Edit Account Info</h2>
                <label>Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
                {
                    passwordChange ? (
                        <div>
                            <label>Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={() => {
                                setPasswordChange(false)
                                setPassword('')
                            }}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setPasswordChange(true)}>Change Password</button>
                    )
                }
                <button disabled={passwordChange && password == ''}>Submit</button>
            </form>
        </div>
    )
}

export default EditAccount;