import React, { useEffect, useState } from 'react';
import { List, CircularProgress } from '@mui/material';
import { API_ENDPOINTS } from '../../constants/apiConfig';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.USERS.GET_ALL}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </List>
  );
};

export default UserList;
