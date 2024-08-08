import Web3 from "web3";
let web3;
let userAccount;
let calculatedValue;
let calculatedValueOfBalance;

const connectWalletButton = document.querySelector(
  ".invest__section__connect-wallet__button"
);
const connectWalletErrorMessage = document.querySelector(
  ".invest__section__connect-wallet__error-message"
);
const walletInvestSection = document.querySelector(
  ".invest__section__connect-wallet__text"
);
const connectedWalletButtons = document.querySelector(
  ".invest__section__buttons"
);

const networks = [
  {
    id: 1,
    name: "POLYGON",
    cryptos: ["MATIC", "USDC", "USDT"],
    networkId: "0x89",
    rpcUrl: "https://polygon-rpc.com",
    chainName: "Polygon",
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  {
    id: 2,
    name: "ETHEREUM",
    cryptos: ["ETHEREUM", "USDC", "USDT"],
    networkId: "0x1",
    rpcUrl: "https://cloudflare-eth.com/",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    id: 3,
    name: "BNB SMART CHAIN",
    cryptos: ["BNB", "USDC", "USDT"],
    networkId: "0x38",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
  },
  {
    id: 4,
    name: "AVALANCHE",
    cryptos: ["AVAX", "USDC", "USDT"],
    networkId: "0xA86A",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    chainName: "Avalanche C-Chain Mainnet",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
  },
];

async function fetchCryptoValue() {
  try {
    const [maticResponse, usdcResponse] = await Promise.all([
      fetch("https://api.coincap.io/v2/assets/polygon"),
      fetch("https://api.coincap.io/v2/assets/usd-coin"),
    ]);

    const matic = await maticResponse.json();
    const maticValue = parseFloat(matic.data.priceUsd);
    const usdc = await usdcResponse.json();
    const usdcValue = parseFloat(usdc.data.priceUsd);

    const currentValueElement = document.querySelector(
      ".money-to-invest__input__wrapper--size"
    );
    const accountBalanceValueUsdConvert = document.querySelectorAll(
      ".select-crypto__input__balance-value-usd"
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

function connectButtonchange() {
  const moneyInvestInput = document.querySelector(".input__field");
  connectWalletButton.textContent = "TICKET MINIMUM : $500";

  moneyInvestInput.addEventListener("input", () => {
    const inputValue = moneyInvestInput.value;

    if (inputValue >= 500) {
      connectWalletButton.textContent = "INVESTIR";
    } else {
      connectWalletButton.textContent = "TICKET MINIMUM : $500";
    }
  });
}

async function checkNetwork() {
  if (web3) {
    let chainId = await web3.eth.getChainId();
    console.log(chainId);
  }
}
async function switchNetwork(network) {
  try {
    const chainIdHex = Web3.utils.toHex(network.networkId);

    // Vérifiez le réseau actuel
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (currentChainId === chainIdHex) {
      console.log(`Already on network ${network.name}`);
      return;
    }

    // Ajoutez le réseau si nécessaire
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainIdHex,
          chainName: network.chainName,
          rpcUrls: [network.rpcUrl],
          nativeCurrency: network.nativeCurrency,
        },
      ],
    });

    // Changez de réseau
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });

    console.log(`Switched to network ${network.name}`);
    connectButtonchange();
  } catch (error) {
    console.error("Failed to switch network:", error);
    alert(
      "Failed to switch network. Please ensure that the network details are correct."
    );
  }
}

connectWalletButton.addEventListener("click", connectWallet);

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      fetchCryptoValue();
      getBalance();
      checkNetwork();
      addTransactionAndDisconnestButtons();
      addTokenPurchaseSection();
      connectButtonchange();
    } catch (error) {
      console.error(error);
    }
  } else {
    connectWalletErrorMessage.style.visibility = "visible";
  }
  connectWalletButton.removeEventListener("click", connectWallet);
}

function getBalance() {
  if (userAccount) {
    web3.eth.getBalance(userAccount).then((balance) => {
      const balanceConvertToEth = web3.utils.fromWei(balance, "ether");
      const balanceFixed = parseFloat(balanceConvertToEth).toFixed(3);
      const accountBalance = document.querySelectorAll(
        ".select-crypto__input__balance-amount"
      );
      accountBalance.forEach((balanceElement) => {
        balanceElement.textContent = balanceFixed;
      });

      console.log(balanceConvertToEth, " ETH sur le solde");
    });
  }
}

function addTransactionAndDisconnestButtons() {
  walletInvestSection.classList.remove("invest__section__connect-wallet__text");
  walletInvestSection.classList.add("invest__section__connected-wallet");
  connectedWalletButtons.style.visibility = "visible";
}

function addTokenPurchaseSection() {
  const template = document.getElementById("purchase-token-section").content;
  walletInvestSection.innerHTML = "";
  walletInvestSection.appendChild(template.cloneNode(true));

  const networkSelect = document.querySelector(".network-select");

  networks.forEach((network) => {
    const option = document.createElement("li");
    option.textContent = network.name;
    option.dataset.networkId = network.networkId; // Store the network id
    networkSelect.appendChild(option);
  });

  networkSelect.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
      const selectedNetworkName = event.target.textContent.trim();
      const selectedNetwork = networks.find(
        (network) => network.name === selectedNetworkName
      );

      if (selectedNetwork) {
        console.log(`Selected network: ${selectedNetworkName}`);
        const cryptoList = document.querySelector(".crypto-select");
        const selectedCryptoInput = document.querySelector(
          ".select-input__crypto"
        );
        cryptoList.innerHTML = "";

        selectedNetwork.cryptos.forEach((crypto) => {
          const listItem = document.createElement("li");
          listItem.textContent = crypto;
          cryptoList.appendChild(listItem);
        });

        selectedCryptoInput.textContent = cryptoList.firstChild.textContent;

        // Switch network using MetaMask
        await switchNetwork(selectedNetwork);
      } else {
        console.error("Network not found");
      }
    }
  });
  const dropdownContainers = document.querySelectorAll(
    ".connected-wallet__select-input"
  );

  dropdownContainers.forEach((dropdownContainer) => {
    const dropdownContent = dropdownContainer.querySelector(
      ".select-input__dropdown-content"
    );
    const downArrow = dropdownContainer.querySelector(
      ".select-input__down-arrow"
    );
    const selectedValue = dropdownContainer.querySelector(
      ".select-input__selected-value"
    );

    function toggleDropdown() {
      dropdownContent.classList.toggle("show");
      downArrow.classList.toggle("rotate");
    }

    dropdownContainer.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleDropdown();
    });

    dropdownContent.addEventListener("click", (event) => {
      event.stopPropagation();
      let selectedOption = event.target.textContent;
      selectedValue.textContent = selectedOption;
      toggleDropdown();
    });
  });

  document.addEventListener("click", () => {
    dropdownContainers.forEach((dropdownContainer) => {
      const dropdownContent = dropdownContainer.querySelector(
        ".select-input__dropdown-content"
      );
      const downArrow = dropdownContainer.querySelector(
        ".select-input__down-arrow"
      );
      dropdownContent.classList.remove("show");
      downArrow.classList.remove("rotate");
    });
  });
}
