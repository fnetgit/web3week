import ABI from "./ABI.json";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

export async function doLogin(){
    if(!window.ethereum) throw new Error("MetaMask não encontrada!");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Carteira não encontrada/autorizada");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

function getContract() {
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCampaign(campaign) {
    const contract = getContract();
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}

export async function getLastCampaignId(){
    const contract = getContract();
    return contract.methods.nextId().call();
}

export async function getCampaign(id) {
    const contract = getContract();
    return contract.methods.campaigns(id).call();
}

export async function donate(id, donation) {
    try {
        await doLogin();
        const contract = getContract();
        const result = await contract.methods.donate(id).send({
            from: localStorage.getItem("wallet"),
            value: Web3.utils.toWei(donation, "ether"),
            gas: 200000
        });
        return result;
    } catch (error) {
        console.error("Erro ao enviar doação:", error.message);
        console.error("Detalhes do erro:", error);
        alert("Erro: " + error.message);
        throw error;
    }
}

