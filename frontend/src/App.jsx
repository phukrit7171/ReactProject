// Root React component of the application
// Contains the main routing setup and serves as the parent for all other components
import React from 'react'
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Import Material UI theme components if using them
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
// Import the theme configuration
// import theme from './constants/muiThemeConfig.js' // Custom theme configuration
// Import route definitions
// import routes from './constants/routes.js' // Defined routes configuration
// Import layout components
import Navbar from './components/layout/Navbar.jsx'
import PageWrapper from './components/layout/PageWrapper.jsx'

// Main App component function
// Sets up routing, theming, and layout structure
const App = () => {
  return (
    <Router>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <Navbar />
        <PageWrapper>
          <Routes>
            {/* Example route definitions */}
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            {/* Additional routes can be added here */}
          </Routes>
        </PageWrapper>
        {/* </ThemeProvider> */}
    </Router>
  )
}

export default App;