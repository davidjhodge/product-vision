import React, { Component } from 'react';

// This is how you import components from one file to another.
// The reason it's CameraComponent, not { Camera Component } (Note the brackets)
// is because in CameraComponent.jsx, export default is used.
// Export default means only one item is exported.
// If multiple items were exportable in one file, you would just do "export CameraComponent"
import CameraComponent from './CameraComponent.js';

class App extends Component {
  render() {
    return (
      <CameraComponent />
    );
  }
}

export default App;
