const inputSlider = document.querySelector(".slider");
const passwordlength = document.querySelector(".lengthNumber");
const passwordDisplay = document.querySelector(".Display");
const DataCopy = document.querySelector(".copydata");
const Uppercase = document.querySelector("#uppercase");
const Lowercase = document.querySelector("#lowercase");
const symbolchecked = document.querySelector("#Symbol");
const number = document.querySelector("#Number");
const DataInducator = document.querySelector(".inducator");
const Button = document.querySelector(".GenerateButton");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
const copyMsg = document.querySelector(".copyMsg");
const DisplayContainer = document.querySelector(".Display-container")

const symbol = "!~`/?<.>](+-*;&^%$#@!";
let password = "";
let passwordSize = 10;
let checkCount = 0;
updateSlider();
Setinducator("#ccc")

function updateSlider() {
    inputSlider.value = passwordSize;
    passwordlength.innerText = passwordSize;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordSize - min) * 100 / (max - min)) + "100%";

}
function Setinducator(color) {
    DataInducator.style.backgroundColor = color;
    DataInducator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}
function GenerateRandomNumber() {
    return getRandomInteger(0, 9);

}

function GenerateRandomUppercase() {
    return String.fromCharCode(getRandomInteger(65, 91));

}

function GenerateRandomLowercase() {
    return String.fromCharCode(getRandomInteger(92, 123));

}

function Generatesymbol() {
    const randomNum = getRandomInteger(0, symbol.length);
    return symbol.charAt(randomNum);
}

function ShufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function checkedStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;
    let hasNumber = false;

    if (Uppercase.checked) hasUpper = true;
    if (Lowercase.checked) hasLower = true;
    if (symbolchecked.checked) hasSymbol = true;
    if (number.checked) hasNumber = true;

    if (hasUpper && hasLower && hasSymbol && hasNumber && passwordSize >= 8) {
        Setinducator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordSize >= 6) {
        Setinducator("#FFFF00");
    } else {
        Setinducator("#FF0000");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "Failed";npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
    }

    // ----------------visibility-----------
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 1500);
}

function handleCheckerChange() {
    checkCount = 0;
    allCheckBoxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });
    // special Condition
    if (passwordSize < checkCount) {
        passwordSize = checkCount;
        Slider();
    }
}

allCheckBoxes.forEach((Checkbox) => {
    Checkbox.addEventListener('change', handleCheckerChange);
});

inputSlider.addEventListener('input', (e) => {
    passwordSize = e.target.value;
    updateSlider();
});
DataCopy.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

Button.addEventListener('click', () => {
    if (checkCount === 0) {
        return;
    }
    if (passwordSize < checkCount) {
        passwordSize = checkCount;
        Slider();
    }

    password = "";

    let functArr = [];
    if (Uppercase.checked)
        functArr.push(GenerateRandomUppercase)

    if (Lowercase.checked)
        functArr.push(GenerateRandomLowercase)

    if (symbolchecked.checked)
        functArr.push(Generatesymbol)

    if (number.checked)
        functArr.push(GenerateRandomNumber)

    // compulsory Addition
    for (let i = 0; i < functArr.length; i++) {
        password += functArr[i]();
    }

    // remaining Addition
    for (let i = 0; i < (passwordSize - functArr.length); i++) {
        let randomIndex = getRandomInteger(0, functArr.length)
        password += functArr[randomIndex]();

    }

    // shuffle password
    password = ShufflePassword(Array.from(password));
    // show in UI
    passwordDisplay.value = password;
    checkedStrength();

});