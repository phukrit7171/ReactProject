// Main entry point for the React application
// Wraps the App component with necessary providers
// Import React and ReactDOM for rendering the application
import React from 'react'
import ReactDOM from 'react-dom/client'
// Import the main App component
import App from './App.jsx'
// Import Redux Provider if state management is needed
// import { Provider } from 'react-redux'
// Import the Redux store if using Redux
// import { store } from './store/store.js' // Example Redux store import
// Import global styles


// Render the application to the root element in index.html
// Wrap with StrictMode for development checks
// Optionally wrap with Redux Provider if using Redux
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>,
)