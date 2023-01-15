import  { Component } from 'react';

class SignOut extends Component {
    componentDidMount = () => {
        this.props.loggedOut(false);
    }

    render() {
        return (alert("You've been logged out<br></br>Thank you"));
    }
}

export default SignOut;
