import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js'; // Redux store for state management
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

// Create a theme with orange as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

// Main entry point for the React application with Redux Provider and MUI ThemeProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);