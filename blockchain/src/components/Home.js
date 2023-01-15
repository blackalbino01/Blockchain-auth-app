import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import '../App.css';

class Home extends Component {
    render() {
        return (
            <div className='home-page'>
                <Grid stackable columns={3} textAlign='left'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            This is a demo of a Blockchain-based authentication 
                            method where the login data hash is recorded on a smart contract 
                            as opposed to the login data itself being stored in a database.
                            Users must have an Ethereum address, a username, a password, 
                            and a four-digit number in order to authenticate. 
                            In order to produce the cryptographic signature required for 
                            the creation of the user's login data hash, the web3 sign method is utilized, 
                            which requires the user to be connected to the Blockchain before authentication.
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Home;
