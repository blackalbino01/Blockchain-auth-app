import Authentication from "./contracts/Authentication.json";

const Contract = async (web3) => {
    const address = "0xd3B69c0a935b310C05DfbaB39479B9aeEaaDEd88";

    return new web3.eth.Contract(
        Authentication.abi,
        address
    );
}

export default Contract;
