// User search component
// Allows users to search for other users to add as friends
import React from 'react';
// Import Material UI components for search functionality
import TextField from '@mui/material/TextField';

// UserSearch component for finding and adding new friends
// Provides search input and results display
const UserSearch = ({ onSearch, searchResults }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <div style={{ marginTop: '16px' }}>
        {searchResults.map((user) => (
          <div key={user.id} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
            {user.name} ({user.email})
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;