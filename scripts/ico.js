import Web3 from "web3";
let web3;
let userAccount;
let balanceAmount = 0;

let cryptoValues = [];
let selectedCrypto = "MATIC";

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
    blockExplorerUrls: ["https://polygonscan.com/"], // Ajouté
    tokenAddresses: {
      matic: null,
      usdc: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
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
    blockExplorerUrls: ["https://etherscan.io/"], // Ajouté
    tokenAddresses: {
      eth: null,
      usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606EB48",
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
    blockExplorerUrls: ["https://bscscan.com/"],
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
    networkId: "0xa86a",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    chainName: "Avalanche C-Chain Mainnet",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
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

    cryptoValues = [
      { name: "matic", value: parseFloat(matic.data.priceUsd) },
      { name: "usdc", value: parseFloat(usdc.data.priceUsd) },
      { name: "avax", value: parseFloat(avax.data.priceUsd) },
      { name: "ethereum", value: parseFloat(ethereum.data.priceUsd) },
      { name: "usdt", value: parseFloat(usdt.data.priceUsd) },
      { name: "bnb", value: parseFloat(bnb.data.priceUsd) },
    ];

    const accountBalanceValueUsdConvert = document.querySelectorAll(
      ".select-crypto__input__balance-value-usd"
    );

    accountBalanceValueUsdConvert.forEach((element) => {
      const tokenName = element.dataset.tokenName;
      const balanceAmount = parseFloat(
        element.previousElementSibling.textContent
      );

      const crypto = cryptoValues.find((c) => c.name === tokenName);
      const cryptoValue = crypto ? crypto.value : 0;

      if (cryptoValue) {
        element.textContent = `≈$${(balanceAmount * cryptoValue).toFixed(2)}`;
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

function formatBalance(balance, decimals = 4, isToken = true) {
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
        balance = web3.utils.fromWei(balance, "ether"); // Utiliser "ether" pour les tokens natifs
      } else {
        // Token ERC20
        const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        balance = await tokenContract.methods.balanceOf(userAddress).call();
        balance = web3.utils.fromWei(balance, "mwei"); // Utiliser "mwei" pour les tokens ERC20 comme USDC
      }

      const formattedBalance = formatBalance(balance, 4, !!tokenAddress);

      const balanceElement = document.querySelector(
        ` .select-crypto__li__input__balance-amount[data-token-name="${tokenName}"][data-network-id="${network.networkId}"]`
      );

      if (balanceElement) {
        balanceElement.textContent = formattedBalance;
      }
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

async function getBalances(userAddress, network) {
  for (const token of network.cryptos) {
    await getTokenBalance(network, token.toLowerCase(), userAddress);
  }

  await updateAllCryptoValues();
}

async function resetAndUpdateAllCryptoValues() {
  const cryptoList = document.querySelectorAll(".crypto-select li");

  // Réinitialise les valeurs en USD pour chaque crypto
  cryptoList.forEach((item) => {
    const valueElement = item.querySelector(
      ".select-crypto__input__li__balance-value-usd"
    );
    if (valueElement) {
      valueElement.textContent = "≈$0.00";
    }
  });

  // Met à jour les nouvelles valeurs après réinitialisation
  await updateAllCryptoValues();
}

// Met à jour toutes les valeurs en USD pour les cryptos de la liste
async function updateAllCryptoValues() {
  const cryptoList = document.querySelectorAll(".crypto-select li");

  for (const item of cryptoList) {
    const balanceElement = item.querySelector(
      ".select-crypto__li__input__balance-amount"
    );
    const tokenName = balanceElement.dataset.tokenName;
    const cryptoValue = cryptoValues.find(
      (c) => c.name === tokenName.toLowerCase()
    );

    if (cryptoValue) {
      const balanceAmount = parseFloat(balanceElement.textContent) || 0;
      const balanceValue = (balanceAmount * cryptoValue.value).toFixed(2);
      const valueElement = item.querySelector(
        ".select-crypto__input__li__balance-value-usd"
      );

      if (valueElement) {
        valueElement.textContent = `≈$${balanceValue}`;
      }
    }
  }
}

function connectButtonchange() {
  const moneyInvestInput = document.querySelector(".input__field");
  connectWalletButton.textContent = "MINIMUM TICKET  : $500";

  moneyInvestInput.addEventListener("input", async () => {
    const inputValue = parseFloat(moneyInvestInput.value);

    if (isNaN(inputValue)) {
      connectWalletButton.textContent = "MINIMUM TICKET  : $500";
      return;
    }

    // Récupère la valeur en USD
    const cryptoPriceInUsd = getCryptoPriceInUsd(selectedCrypto);
    const usdValue = cryptoPriceInUsd
      ? (inputValue * cryptoPriceInUsd).toFixed(2)
      : 0;

    if (parseFloat(usdValue) >= 500) {
      connectWalletButton.textContent = "INVEST";

      // vérifie si la somme investi est disponible dans le wallet et affiche le message nécessaire
      connectWalletButton.addEventListener("click", () => {
        const modal = document.querySelector(".modal");

        modal.showModal();

        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.close();
          }
        });

        if (balanceAmount >= inputValue) {
          modal.innerHTML = `<div class="modal__content">
              <p>Transaction confirmed !</p>
              <span>
                You can now consult your transaction history
              </span>
              <a href="transactions.html">TRANSACTION HISTORY</a>
            </div>`;
        } else {
          modal.innerHTML = `<div class="modal__content">
              <p>Insufficient funds</p>
              <button class="modal__proceed-button">OK</button>
            </div>`;
          const modalProceedButton = document.querySelector(
            ".modal__proceed-button"
          );

          modalProceedButton.addEventListener("click", () => {
            modal.close();
          });
        }
      });
    } else {
      connectWalletButton.textContent = "MINIMUM TICKET  : $500";
    }
  });
}
// Met à jour le premier élément <li> de la liste des cryptos
function updateFirstCryptoDisplay() {
  const cryptoList = document.querySelector(".crypto-select");
  const firstCryptoLi = cryptoList.querySelector("li:first-child");

  if (firstCryptoLi) {
    // Récupérer et mettre à jour le nom de la première crypto
    const firstCryptoName = firstCryptoLi.querySelector("p")?.textContent;
    document.querySelector(".select-input__crypto").textContent =
      firstCryptoName || "";

    // Récupérer et mettre à jour la valeur en USD de la première crypto
    const balanceAmountElement = firstCryptoLi.querySelector(
      ".select-crypto__li__input__balance-amount"
    );
    const balanceValueElement = firstCryptoLi.querySelector(
      ".select-crypto__input__li__balance-value-usd"
    );

    if (balanceAmountElement && balanceValueElement) {
      // Copier le montant et la valeur en USD du premier élément
      const balanceAmount = balanceAmountElement.textContent;
      const balanceValue = balanceValueElement.textContent;

      // Mettre à jour les éléments d'affichage avec les valeurs du premier élément
      document.querySelector(
        ".select-crypto__input__balance-amount"
      ).textContent = balanceAmount;
      document.querySelector(".select-crypto__amount-style").textContent =
        balanceAmount;
      document.querySelector(
        ".select-crypto__input__balance-value-usd"
      ).textContent = balanceValue;
    }
  }
}

// Fonction appelée lors du changement de réseau
async function switchNetwork(selectedNetwork) {
  try {
    const chainIdHex = Web3.utils.toHex(selectedNetwork.networkId);

    // Récupérer l'ID du réseau actuel
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    // Change le réseau uniquement si c'est nécessaire
    if (currentChainId !== chainIdHex) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: chainIdHex,
            chainName: selectedNetwork.chainName,
            rpcUrls: [selectedNetwork.rpcUrl],
            nativeCurrency: selectedNetwork.nativeCurrency,
            blockExplorerUrls: selectedNetwork.blockExplorerUrls,
          },
        ],
      });

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    }

    // Attend que le changement de réseau soit effectif
    const newChainId = await new Promise((resolve) => {
      const interval = setInterval(async () => {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (chainId === chainIdHex) {
          clearInterval(interval);
          resolve(chainId);
        }
      }, 200);
    });

    // Récupérer les soldes des tokens après avoir changé de réseau
    await getBalances(userAccount, selectedNetwork);

    // Réinitialiser et mettre à jour toutes les valeurs des cryptos
    await resetAndUpdateAllCryptoValues();

    // Met à jour la valeur du premier élément de la liste
    updateFirstCryptoDisplay();
    investedMoneyInputValue();

    // Met à jour le texte du dropdown avec le réseau sélectionné
    const selectedValue = document.querySelector(
      ".select-input__selected-value"
    );
    if (selectedValue) {
      selectedValue.textContent = selectedNetwork.name;
    }

    // Réinitialise le champ de saisie du montant
    const moneyInvestInput = document.querySelector(".input__field");
    if (moneyInvestInput) {
      moneyInvestInput.value = "0"; // Réinitialise la valeur du champ
      const usdValueDisplay = (document.querySelector(
        ".money-to-invest__input__wrapper--size"
      ).textContent = "≈$0.00"); // Réinitialise l'affichage
    }
  } catch (error) {
    console.error("Failed to switch network or get balances:", error);
    alert(
      "Failed to switch network or retrieve balances. Please ensure that the network details are correct."
    );
  }
}

async function checkCurrentNetwork() {
  if (web3) {
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
    const currentNetwork = networks.find((net) => {
      return Web3.utils.toHex(net.networkId) === chainIdHex;
    });
    if (!currentNetwork) {
      // Si le réseau actuel n'est pas proposé, passer à Polygon
      const polygonNetwork = networks.find((net) => net.name === "POLYGON");
      if (polygonNetwork) {
        await switchNetwork(polygonNetwork);
        await updateCryptoList(polygonNetwork);
        await getBalances(userAccount, polygonNetwork);
        await resetAndUpdateAllCryptoValues();
        updateFirstCryptoDisplay();
        investedMoneyInputValue();
      }
    } else {
      // Si le réseau est proposé, mettre à jour les menus déroulants
      await updateCryptoList(currentNetwork);
      selectedCrypto = currentNetwork.cryptos[0];
      await getBalances(userAccount, currentNetwork);
      await resetAndUpdateAllCryptoValues();
      updateFirstCryptoDisplay();
      investedMoneyInputValue();
    }
  }
}

connectWalletButton.addEventListener("click", connectWallet);
async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0]; // compte de l'utilisateur

      fetchCryptoValue();
      checkCurrentNetwork();
      addTransactionAndDisconnestButtons();
      addTokenPurchaseSection();
      connectButtonchange();
    } catch (error) {
      console.error(error);
    }
  } else {
    connectWalletErrorMessage.style.visibility = "visible";
  }
  connectWalletButton.removeEventListener("click", connectWallet); // une fois l'utilisateur connecté on supprime la fonctionnalité du bouton
}

function addTransactionAndDisconnestButtons() {
  walletInvestSection.classList.remove("invest__section__connect-wallet__text");
  walletInvestSection.classList.add("invest__section__connected-wallet");
  connectedWalletButtons.style.display = "flex";
}

function addTokenPurchaseSection() {
  const template = document.getElementById("purchase-token-section").content;
  walletInvestSection.innerHTML = "";
  walletInvestSection.appendChild(template.cloneNode(true));

  setupNetworkSelection();
  setupDropdowns();
}

async function setupNetworkSelection() {
  const networkSelect = document.querySelector(".network-select");

  // Création des options du menu déroulant pour les réseaux
  networks.forEach((network) => {
    const option = document.createElement("li");

    const paragraph = document.createElement("p");
    paragraph.textContent = network.name;
    option.appendChild(paragraph);
    option.dataset.networkId = network.networkId;
    networkSelect.appendChild(option);
  });

  // Récupérer le réseau actuel
  try {
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    // Trouver le réseau correspondant à l'ID actuel
    const currentNetwork = networks.find(
      (network) => Web3.utils.toHex(network.networkId) === currentChainId
    );

    if (currentNetwork) {
      const selectedValue = document.querySelector(
        ".select-input__selected-value"
      );
      if (selectedValue) {
        selectedValue.textContent = currentNetwork.name;
      }
    }
  } catch (error) {
    console.error("Failed to get current network:", error);
  }

  // Ajouter un écouteur d'événements pour les sélections de réseau
  networkSelect.addEventListener("click", async (event) => {
    if (event.target.tagName !== "LI") return;

    const selectedNetworkName = event.target.textContent.trim();
    const selectedNetwork = networks.find(
      (network) => network.name === selectedNetworkName
    );

    if (!selectedNetwork) {
      console.error("Network not found");
      return;
    }

    await updateCryptoList(selectedNetwork);
    await switchNetwork(selectedNetwork);

    // Met à jour le texte du dropdown avec le réseau sélectionné
    const selectedValue = document.querySelector(
      ".select-input__selected-value"
    );
    if (selectedValue) {
      selectedValue.textContent = selectedNetwork.name;
    }

    // Fermer le menu déroulant après la sélection
    const dropdownContent = networkSelect.parentElement.querySelector(
      ".select-input__dropdown-content"
    );
    const downArrow = networkSelect.parentElement.querySelector(
      ".select-input__down-arrow"
    );
  });
}

async function updateCryptoList(selectedNetwork) {
  const cryptoList = document.querySelector(".crypto-select");
  cryptoList.innerHTML = ""; // réinitialise la liste

  selectedNetwork.cryptos.forEach((crypto) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = ` <p>${crypto}</p>
      <div class="select-crypto__li__wrapper">
        <span class="select-crypto__li__input__balance-amount select-crypto__amount-style" data-token-name="${crypto.toLowerCase()}" data-network-id="${selectedNetwork.networkId}">0.0000</span>
        <span class="select-crypto__input__li__balance-value-usd"></span>
      </div>`;
    cryptoList.appendChild(listItem);
  });

  updateFirstCryptoDisplay();
  setupCryptoListClick();
}

function setupCryptoListClick() {
  const cryptoList = document.querySelector(".crypto-select");

  cryptoList.addEventListener("click", async (event) => {
    const selectedLi = event.target.closest("li");

    if (selectedLi) {
      // Sélection es éléments DOM
      const selectedCryptoElement = selectedLi.querySelector("p");
      const balanceAmountElement = selectedLi.querySelector(
        ".select-crypto__li__input__balance-amount"
      );
      const balanceValueElement = selectedLi.querySelector(
        ".select-crypto__input__li__balance-value-usd"
      );
      const mainBalanceElement = document.querySelector(
        ".select-crypto__input__balance-amount.select-crypto__amount-style"
      );

      // Récupérer les données
      const selectedCrypto = selectedCryptoElement
        ? selectedCryptoElement.textContent
        : "";
      const balanceAmountText = balanceAmountElement
        ? balanceAmountElement.textContent
        : "0";
      const balanceAmount = parseFloat(balanceAmountText);
      const tokenName = balanceAmountElement.dataset.tokenName;

      // Mise à jour du nom de la crypto et du montant
      document.querySelector(".select-input__crypto").textContent =
        selectedCrypto;
      mainBalanceElement.textContent = `${balanceAmount.toFixed(4)}`;

      // Mise à jour de la valeur en USD
      const cryptoValue = cryptoValues.find(
        (c) => c.name === tokenName.toLowerCase()
      );
      if (cryptoValue) {
        const balanceValue = (balanceAmount * cryptoValue.value).toFixed(2);
        balanceValueElement.textContent = `≈$${balanceValue}`;
        document.querySelector(
          ".select-crypto__input__balance-value-usd"
        ).textContent = `≈$${balanceValue}`;
      } else {
        balanceValueElement.textContent = "≈$0.00";
      }

      // Mettre à jour le solde de la crypto-monnaie sélectionnée
      const network = networks.find((n) => n.cryptos.includes(selectedCrypto));
      await getTokenBalance(network, selectedCrypto.toLowerCase(), userAccount);
    }
  });
}

function setupDropdowns() {
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

    downArrow.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche la propagation au document
      closeAllDropdownsExcept(dropdownContainer);
      dropdownContent.classList.toggle("show");
      downArrow.classList.toggle("rotate");
    });

    // Ajoute un écouteur pour les éléments de la liste déroulante
    dropdownContent.addEventListener("click", (event) => {
      const target = event.target;

      // Vérifie si l'élément cliqué est un élément de la liste déroulante
      if (target && target.matches("li")) {
        // Met à jour la valeur sélectionnée
        const newValue = target.textContent.trim();
        selectedValue.textContent = newValue;

        // Ferme le menu déroulant après la sélection
        dropdownContent.classList.remove("show");
        downArrow.classList.remove("rotate");
      }
    });
  });

  // Fonction pour fermer tous les menus déroulants sauf celui passé en paramètre (ce qui permet aux deux dropdown de ne pas se chevaucher)
  function closeAllDropdownsExcept(exception) {
    dropdownContainers.forEach((container) => {
      if (container !== exception) {
        const content = container.querySelector(
          ".select-input__dropdown-content"
        );
        const arrow = container.querySelector(".select-input__down-arrow");
        if (content) content.classList.remove("show");
        if (arrow) arrow.classList.remove("rotate");
      }
    });
  }

  // Fermer les menus déroulants si on clique en dehors
  document.addEventListener("click", (event) => {
    closeAllDropdownsExcept(null); // Ferme tous les menus déroulants
  });
}

function getCryptoPriceInUsd(cryptoName) {
  // Cherche la crypto dans cryptoValues par son nom
  const crypto = cryptoValues.find((c) => c.name === cryptoName.toLowerCase());

  // Retourne la valeur ou 0 si la crypto n'est pas trouvée
  return crypto ? crypto.value : 0;
}

function investedMoneyInputValue() {
  const moneyInvestInput = document.querySelector(".input__field");
  const usdValueDisplay = document.querySelector(
    ".money-to-invest__input__wrapper--size"
  );

  moneyInvestInput.addEventListener("input", () => {
    const inputValue = parseFloat(moneyInvestInput.value);

    if (isNaN(inputValue)) {
      usdValueDisplay.textContent = "≈$0.00";
      return;
    }

    const cryptoPriceInUsd = getCryptoPriceInUsd(selectedCrypto);

    if (cryptoPriceInUsd) {
      const usdValue = (inputValue * cryptoPriceInUsd).toFixed(2);
      usdValueDisplay.textContent = `≈$${usdValue}`;
    } else {
      usdValueDisplay.textContent =
        "Erreur de récupération du prix de la crypto.";
    }
  });
}
