import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Main from './components/Main';

function App() {
  return (
    <div >
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </div>
  );
}

export default App;
