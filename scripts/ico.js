import Web3 from "web3";
let web3;
let userAccount;
let calculatedValue;
let calculatedValueOfBalance;

let cryptoValues = [];

import usdcABI from "../usdcABI.json";
import usdtABI from "../usdcABI.json";

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
    tokenAddresses: {
      matic: null,
      usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    },
    tokenABIs: {
      matic: null,
      usdc: usdcABI,
      usdt: usdtABI,
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
    tokenAddresses: {
      eth: null,
      usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    },
    tokenABIs: {
      eth: null,
      usdc: usdcABI,
      usdt: usdtABI,
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
    tokenAddresses: {
      bnb: null,
      usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      usdt: "0x55d398326f99059fF775485246999027B3197955",
    },
    tokenABIs: {
      bnb: null,
      usdc: usdcABI,
      usdt: usdtABI,
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
    tokenAddresses: {
      avax: null,
      usdc: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      usdt: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
    },
    tokenABIs: {
      avax: null,
      usdc: usdcABI,
      usdt: usdtABI,
    },
  },
];

async function fetchCryptoValue() {
  try {
    const [
      maticResponse,
      usdcResponse,
      avaxResponse,
      ethereumResponse,
      usdtResponse,
      bnbResponse,
    ] = await Promise.all([
      fetch("https://api.coincap.io/v2/assets/polygon"),
      fetch("https://api.coincap.io/v2/assets/usd-coin"),
      fetch("https://api.coincap.io/v2/assets/avalanche"),
      fetch("https://api.coincap.io/v2/assets/ethereum"),
      fetch("https://api.coincap.io/v2/assets/tether"),
      fetch("https://api.coincap.io/v2/assets/binance-coin"),
    ]);

    const matic = await maticResponse.json();
    const usdc = await usdcResponse.json();
    const avax = await avaxResponse.json();
    const ethereum = await ethereumResponse.json();
    const usdt = await usdtResponse.json();
    const bnb = await bnbResponse.json();

    // Stocker les valeurs en dollars dans cryptoValues
    cryptoValues = [
      { name: "matic", value: parseFloat(matic.data.priceUsd) },
      { name: "usdc", value: parseFloat(usdc.data.priceUsd) },
      { name: "avax", value: parseFloat(avax.data.priceUsd) },
      { name: "ethereum", value: parseFloat(ethereum.data.priceUsd) },
      { name: "usdt", value: parseFloat(usdt.data.priceUsd) },
      { name: "bnb", value: parseFloat(bnb.data.priceUsd) },
    ];

    console.log("Crypto values:", cryptoValues);

    // Mettre à jour les valeurs dans le dropdown
    const accountBalanceValueUsdConvert = document.querySelectorAll(
      ".select-crypto__input__balance-value-usd"
    );
    accountBalanceValueUsdConvert.forEach((element) => {
      const tokenName = cryptoValue.name;
      const balanceAmount = cryptoValue.value;

      // Trouver la valeur de la crypto correspondante
      const crypto = cryptoValues.find((c) => c.name === tokenName);
      const cryptoValue = crypto ? crypto.value : 0;

      if (cryptoValue) {
        element.textContent = `≈$${(parseFloat(balanceAmount) * cryptoValue).toFixed(2)}`;
      }
    });
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

// Adresse des contrats pour les cryptos ERC20

function formatBalance(balance, decimals = 4, isToken = true) {
  // Si c'est un token ERC20 ou autre avec précision élevée
  if (isToken) {
    return parseFloat(balance).toFixed(decimals);
  } else {
    // Pour les cryptos natives comme ETH, BNB, AVAX
    return parseFloat(balance).toFixed(decimals);
  }
}

async function getTokenBalance(network, tokenName, userAddress) {
  if (web3 && userAddress) {
    try {
      const tokenAddress = network.tokenAddresses[tokenName];
      const tokenABI = network.tokenABIs[tokenName];

      let balance;
      if (!tokenAddress) {
        // Token natif (ex: ETH, BNB, AVAX, MATIC)
        balance = await web3.eth.getBalance(userAddress);
        balance = web3.utils.fromWei(balance, "ether"); // conversion de wei en ether
      } else {
        // Token ERC20
        const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        balance = await tokenContract.methods.balanceOf(userAddress).call();
        balance = web3.utils.fromWei(balance, "ether"); // conversion de wei en ether
      }

      const formattedBalance = formatBalance(balance, 4, !!tokenAddress);

      // Mettre à jour l'élément HTML correspondant
      const balanceElement = document.querySelector(
        `.select-crypto__li__input__balance-amount[data-token-name="${tokenName}"][data-network-id="${network.networkId}"]`
      );

      if (balanceElement) {
        balanceElement.textContent = formattedBalance;
      }

      console.log(
        `Balance in ${tokenName.toUpperCase()} on ${network.name}:`,
        formattedBalance
      );
    } catch (error) {
      console.error(
        `Error fetching ${tokenName} balance on ${network.name}:`,
        error
      );
    }
  } else {
    console.error("Web3 or user address not initialized");
  }
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

    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (currentChainId !== chainIdHex) {
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

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    }

    console.log(`Switched to network ${network.name}`);

    await getBalances(userAccount, network);
  } catch (error) {
    console.error("Failed to switch network:", error);
    alert(
      "Failed to switch network. Please ensure that the network details are correct."
    );
  }
}

// Exécution après connexion du portefeuille
connectWalletButton.addEventListener("click", connectWallet);
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAccount = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
      fetchCryptoValue();
      checkNetwork();
      addTransactionAndDisconnestButtons();
      addTokenPurchaseSection();
      connectButtonchange();
      getBalances(userAccount); // Appeler la fonction pour obtenir les soldes des tokens
    } catch (error) {
      console.error(error);
    }
  } else {
    connectWalletErrorMessage.style.visibility = "visible";
  }
  connectWalletButton.removeEventListener("click", connectWallet);
}

async function getBalances(userAddress, network) {
  for (const token of network.cryptos) {
    await getTokenBalance(network, token.toLowerCase(), userAddress);
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
    if (event.target.tagName !== "LI") return; // Early exit if not clicking on an LI

    const selectedNetworkName = event.target.textContent.trim();
    const selectedNetwork = networks.find(
      (network) => network.name === selectedNetworkName
    );

    if (!selectedNetwork) {
      console.error("Network not found");
      return;
    }

    const cryptoList = document.querySelector(".crypto-select");
    cryptoList.innerHTML = ""; // Clear existing crypto list

    selectedNetwork.cryptos.forEach((crypto) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <p>${crypto}</p>
        <div class="select-crypto__li__wrapper">
          <span class="select-crypto__li__input__balance-amount select-crypto__amount-style" data-token-name="${crypto.toLowerCase()}" data-network-id="${selectedNetwork.networkId}">0.0000</span>
          <span class="select-crypto__input__balance-value-usd">≈$0.00</span>
        </div>
      `;
      cryptoList.appendChild(listItem);
    });

    // Sélectionner automatiquement la première crypto et mettre à jour l'affichage
    const firstCryptoLi = cryptoList.querySelector("li:first-child");
    if (firstCryptoLi) {
      const firstCryptoName = firstCryptoLi.querySelector("p")?.textContent;
      const firstBalanceAmount = firstCryptoLi.querySelector(
        ".select-crypto__li__input__balance-amount"
      )?.textContent;

      document.querySelector(".select-input__crypto").textContent =
        firstCryptoName || "";

      const balanceValueElement = document.querySelector(
        ".select-crypto__input__balance-amount"
      );
      if (balanceValueElement) {
        balanceValueElement.textContent = firstBalanceAmount;
      }
    }

    // Ajouter l'écouteur de clic pour mettre à jour l'affichage lors du clic sur une crypto
    cryptoList.addEventListener("click", (event) => {
      const selectedLi = event.target.closest("li");

      if (selectedLi) {
        const selectedCrypto = selectedLi.querySelector("p")?.textContent;
        const balanceAmount = selectedLi.querySelector(
          ".select-crypto__li__input__balance-amount"
        )?.textContent;

        const cryptoValue = cryptoValues[selectedCrypto.toLowerCase()];
        if (cryptoValue) {
          document.querySelector(
            ".select-crypto__input__balance-value-usd"
          ).textContent =
            `≈$${(parseFloat(balanceAmount) * cryptoValue).toFixed(2)}`;
        }

        document.querySelector(".select-input__crypto").textContent =
          selectedCrypto || "";
      }
    });

    await switchNetwork(selectedNetwork);
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
