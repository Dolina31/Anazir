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

//-------------
//Fonction qui récupère la valeur en dollards des crypto et fait les calculs

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
    const accountBalanceValueUsdConvert = document.querySelector(
      ".select-crypto__input__balance-value-usd"
    );

    // Calcul la valeur en dollards du nombre tapé dans l'input
    const inputUsdValue = () => {
      const selectedCrypto = document.querySelector(
        ".select-crypto__input__select"
      ).textContent;
      const inputValue =
        parseFloat(document.querySelector(".input__field").value) || 0;

      if (selectedCrypto === "Matic") {
        calculatedValue = (maticValue * inputValue).toFixed(0);
      } else if (selectedCrypto === "Usdc") {
        calculatedValue = (usdcValue * inputValue).toFixed(0);
      } else {
        console.log("Invalid crypto selection");
      }

      currentValueElement.textContent = `≈$${calculatedValue}`;
    };

    //Calcul la valeur en dollards du solde du compte connecté
    const accountBalanceUsdValue = () => {
      const selectedCrypto = document.querySelector(
        ".select-crypto__input__select"
      ).textContent;
      const accountBalance = document.querySelector(
        ".select-crypto__input__balance-amount"
      );
      console.log(accountBalance);

      setTimeout(() => {
        if (selectedCrypto === "Matic") {
          calculatedValueOfBalance = parseFloat(
            maticValue * accountBalance.textContent
          ).toFixed(0);
        } else if (selectedCrypto === "Usdc") {
          calculatedValueOfBalance = parseFloat(
            usdcValue * accountBalance.textContent
          ).toFixed(0);
        } else {
          console.log("Invalid crypto selection");
        }
        accountBalanceValueUsdConvert.textContent = `≈$${calculatedValueOfBalance}`;

        inputUsdValue();
      }, 400);
    };

    document
      .querySelector(".input__field")
      .addEventListener("input", inputUsdValue);

    const observer = new MutationObserver(accountBalanceUsdValue);
    const selectedCryptoElement = document.querySelector(
      ".select-crypto__input__select"
    );
    observer.observe(selectedCryptoElement, { childList: true });

    inputUsdValue();
    accountBalanceUsdValue();
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

//---------------
// Fonction qui vérifie si l'utilisateur est sur le bon réseau et modifie le fonctionne du bouton en conséquence

async function checkNetwork() {
  if (web3) {
    let chainId = await web3.eth.getChainId();
    console.log(chainId);

    if (chainId !== 137n) {
      connectWalletButton.textContent = "UTILISER LE RÉSEAU POLYGON";
      connectWalletButton.addEventListener("click", switchNetwork);
    } else if (chainId === 137n) {
      connectButtonchange();
    }
  }
}

//------------
// Fonction qui permet de changer de réseau vers le réseau Polygon
async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
    connectButtonchange();
  } catch (error) {
    console.error(error);
  }
}

connectWalletButton.addEventListener("click", connectWallet);

//-----------
// Fonction qui connecte l'utilisateur

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
    } catch (error) {
      console.error(error);
    }
  } else {
    connectWalletErrorMessage.style.visibility = "visible";
  }
  connectWalletButton.removeEventListener("click", connectWallet); // l'utilisateur est connecté donc on supprime la fonctionnalité du button
}

//--------------
// Fonction pour récupérer le solde du compte connecté

function getBalance() {
  if (userAccount) {
    web3.eth.getBalance(userAccount).then((balance) => {
      const balanceConvertToEth = Math.floor(
        web3.utils.fromWei(balance, "ether")
      );
      const accountBalance = document.querySelector(
        ".select-crypto__input__balance-amount"
      );
      accountBalance.textContent = balanceConvertToEth;
      console.log(balanceConvertToEth, " ETH sur le solde");
    });
  }
}

//--------------
// Rend visisble les boutons "transtactions" et "se déconnecter" visible

function addTransactionAndDisconnestButtons() {
  walletInvestSection.classList.remove("invest__section__connect-wallet__text");
  walletInvestSection.classList.add("invest__section__connected-wallet");
  connectedWalletButtons.style.visibility = "visible";
}

//-------------
// Ajout de toute la section qui permet l'achat de Token

function addTokenPurchaseSection() {
  walletInvestSection.innerHTML = `
   <div class="connected-wallet__token-purchase">
   <p>Vous investissez en :</p>      
      <div class="connected-wallet__select-crypto__wrapper">
        <div class="select-crypto__input input">
          <p class="select-crypto__input__select">Matic</p>
          <ul class="select-crypto__input__dropdown-content">
            <li>Matic</li>
            <li>Usdc</li>
          </ul>
        </div>
        <div class="select-crypto__input__wrapper">
          <div class="select-crypto__input__current-value__wrapper">
            <span class = "select-crypto__input__balance-amount"></span>
            <span class="select-crypto__input__balance-value-usd"
              ></span
            >
          </div>
          <span class="line"></span>
          <span class="select-crypto__input__down-arrow">
            <img
              src="../../assets/images/down-arrow-img.png"
              alt="flèche blanche pointant vers le bas"
              class="select-crypto__input__dropdown-arrow"
          /></span>
        </div>
      </div>

      <div class="connected-wallet__money-to-invest__wrapper">
        <label for="money-to-invest">Montant investi :</label>
        <div class="money-to-invest__input input">
          <input
            type="number"
            value="0"
            id="money-to-invest"
            class="input__field"
          />
          <div class="money-to-invest__input__wrapper">
            <span class="money-to-invest__input__wrapper--size">≈$0</span>
            <button class="money-to-invest__input__wrapper__button">MAX</button>
          </div>
        </div>
      </div>
    </div>
    <div class="connected-wallet__token-amount">
      <p>Vous recevez en $ANZ</p>
      <div class="token-amount__wrapper">
        <p>0</p>
        <img
          src="../../assets/images/TOKEN-color.png"
          alt="Logo du jeux Anazir sous forme d'une piece de monnaie"
        />
      </div>
      <div class="token-amount__max-amount__wrapper">
        <span class="token-amount__max-amount__line"></span>
        <p class="token-amount__max-amount">15 000 000</p>
        <p class="token-amount__max-amount__info">Token alloués pressed</p>
      </div>
    </div>
    </div>`;

  //--------
  // Fonctionnement de l'input select

  const cryptoInput = document.querySelector(
    ".connected-wallet__select-crypto__wrapper"
  );
  const InputSelectedCrypto = document.querySelector(
    ".select-crypto__input__select"
  );
  const dropdownContent = document.querySelector(
    ".select-crypto__input__dropdown-content"
  );

  const downArrow = document.querySelector(
    ".select-crypto__input__dropdown-arrow"
  );

  function toggleDropdown() {
    let isOpen = false;
    isOpen = !isOpen;
    dropdownContent.classList.toggle("show");
    downArrow.classList.toggle("rotate");
  }

  cryptoInput.addEventListener("click", toggleDropdown);

  dropdownContent.addEventListener("click", (event) => {
    let selectedOption = event.target.textContent;
    InputSelectedCrypto.textContent = selectedOption = event.target.textContent;
    InputSelectedCrypto.textContent = selectedOption;
  });
}

//---------------
