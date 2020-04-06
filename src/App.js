import React from 'react';
import Forum from './forum/forum';

import './App.css';

class App extends React.Component{
constructor(){
  super();
}
// everyting is rendered in the Forum component
  render(){
    return(
      <div className='App'>
        <Forum />
      </div>
    )
  }
}

export default App;
