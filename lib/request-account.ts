export default async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  window.ethereum.selectedAddress;
}
