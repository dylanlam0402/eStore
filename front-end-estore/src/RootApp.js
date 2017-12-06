import React from 'react';
import App from './App';

export default class RootApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    
    componentDidCatch(error, info) {
        this.setState({ hasError: true });

        // need to write log here
    }
    
    render() {
        if (this.state.hasError) {
             <h1>Lol! wrong cmnr :)</h1>;
            return(<App/>);
        }
        else
        {
            return(<App/>);
        }
    }
};
