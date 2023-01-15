import React, { Component } from "react";
import web3Connection from './web3Connection';
import Contract from './Contract';
import Formate from './utils/Formate';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Divider } from "semantic-ui-react";
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
import SignOut from "./components/SignOut";
import UserAccount from './components/UserAccount';
import "./App.css";

class App extends Component {
  state = {
    web3: null,
    account: null,
    contract: null,
    balance: null,
    activeItem: 'home',
    signedUp: false,
    loggedIn: false,
    username: ''
    //color: 'teal'
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name, color: 'teal' })

  componentDidMount = async () => {
    try {
      const web3 = await web3Connection();
      const contract = await Contract(web3);
      const accounts = await web3.eth.getAccounts();

      this.setState({ web3, contract, account: accounts[0] }, this.start);
    } catch (error) {
      alert(
        `Failed to load web3`,
      );
      console.error(error);
    }

    await this.getAccount();
  };

  start = async () => {
    await this.getAccount();
    const { web3, contract, account } = this.state;

    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Acoount =", account);
  };

  getAccount = async () => {
    if (this.state.web3 !== null || this.state.web3 !== undefined) {
      await window.ethereum.on('accountsChanged', async (accounts) => {
        this.setState({
          account: accounts[0],
          loggedIn: false
        });

        this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
          if (!err) {
            this.setState({ balance: Formate(this.state.web3.utils.fromWei(balance, 'ether')) });
          }
        });
      });
    }
  }

  accountCreated = async (signedUp) => {
    this.setState({ signedUp });
  }

  userSignedIn = async (loggedIn, username) => {
    this.setState({ loggedIn, username });
  }

  loggedOut = async (loggedIn) => {
    this.setState({ loggedIn });
  }

  render() {
    const { activeItem, color } = this.state;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="App-header">
          <BrowserRouter>
            <div className="home-nav">
              <Menu stackable inverted secondary size='large'>
                <Menu.Item
                  name='home'
                  color={color}
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/'
                />
                {
                  this.state.loggedIn ?
                    <Menu.Item
                      position='right'
                      name='user account'
                      color={color}
                      active={activeItem === 'user account'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/user-account'
                    />
                    :
                    console.log('')
                }
                {
                  !this.state.loggedIn ?
                    <Menu.Item
                      position='right'
                      name='sign in'
                      color={color}
                      active={activeItem === 'sign in'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/sign-in'
                    />
                    :
                    console.log('')
                }

                {
                  this.state.loggedIn ?
                    <Menu.Item
                      name='sign out'
                      color='red'
                      active={activeItem === 'sign out'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/sign-out'
                    />
                    :
                    <Menu.Item
                      name='sign up'
                      color={color}
                      active={activeItem === 'sign up'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/sign-up'
                    />
                }
              </Menu>
            </div>
            <Divider inverted />

            <Routes>
              <Route exact path="/" element={<Home/>} />
              {
                this.state.loggedIn ?
                  <Route path='/user-account' element={<UserAccount
                    account={this.state.account}
                    username={this.state.username}
                  />} />
                  :
                  <Route path='/user-account'>
                    You have been logged out
                  </Route>
              }
              {
                <Route path='/sign-in' element={
                  this.state.loggedIn ?
                    <Navigate to='/user-account' />
                    :
                    <SignIn
                      web3={this.state.web3}
                      contract={this.state.contract}
                      account={this.state.account}
                      signedUp={this.state.signedUp}
                      userSignedIn={this.userSignedIn}
                    />
                }/>
              }

              {
                this.state.loggedIn ?
                  <Route path='/sign-out' element={<SignOut
                    loggedOut={this.loggedOut}
                  />}> 
                    You've been logged out
                    <br></br>
                    Thank you
                  </Route>
                  :
                  <Route path='/sign-up' element={<SignUp
                    web3={this.state.web3}
                    contract={this.state.contract}
                    account={this.state.account}
                    accountCreated={this.accountCreated}
                  />} />                
              }
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
