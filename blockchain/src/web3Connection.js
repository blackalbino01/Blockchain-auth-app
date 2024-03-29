import Web3 from 'web3';

const web3Connection = async () => {
    let web3;
    typeof window.ethereum !== 'undefined' ?
        web3 = new Web3(window.ethereum) :
        typeof window.web3 !== 'undefined' ?
            web3 = window.web3 :
            web3 = new Web3('https://rpc.ankr.com/eth_goerli');

    return web3;
}

export default web3Connection;