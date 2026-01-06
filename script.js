// Fixed exchange rate
const EXCHANGE_RATE = 1.95583;

// Translations
const translations = {
    bg: {
        mainTitle: 'Калкулатор за ресто',
        subtitle: 'Изчисляване на ресто и конвертиране между лева (BGN) и евро (EUR)',
        currencyLabel: 'Избор на валута',
        currencyDescription: 'Изберете валутата, в която ще работите. Курсът е фиксиран: 1 EUR = 1.95583 BGN',
        amountPaid: 'Сума платена',
        itemCost: 'Стойност на стоката',
        calculate: 'Изчисли',
        clear: 'Изчисти',
        changeInSelected: 'Ресто (в {currency})',
        changeInOther: 'Ресто (в {currency})',
        lev: 'лев',
        euro: 'евро',
        exchangeRate: 'Фиксиран курс:',
        accessibilityInfo: 'Този калкулатор е създаден с фокус върху достъпността. Поддържа екранни четци, клавиатурна навигация и висока контрастност.',
        contrastLabel: 'Контраст:',
        contrastDefault: 'Стандартен',
        contrastHigh: 'Висок',
        contrastUltra: 'Ултра висок',
        languageLabel: 'Език / Language:',
        required: 'задължително поле',
        insufficient: 'Недостатъчна сума. Липсват',
        change: 'Ресто:',
        changeIn: 'Ресто в {currency}:',
        cleared: 'Всички полета са изчистени',
        currencySelected: 'Избрана валута:',
        calculatorAnnouncement: 'Калкулатор за ресто. Избрана валута: {currency}. Курс: 1 EUR = {rate} BGN',
        bgn: 'Български лев',
        eur: 'Евро',
        enterPaid: 'Въведете сумата, която е платена',
        enterCost: 'Въведете стойността на стоката',
        calculateAria: 'Изчисли ресто и конвертирай валута',
        clearAria: 'Изчисти всички полета'
    },
    en: {
        mainTitle: 'Change Calculator',
        subtitle: 'Calculate change and convert between Bulgarian Lev (BGN) and Euro (EUR)',
        currencyLabel: 'Currency Selection',
        currencyDescription: 'Select the currency you will work with. The rate is fixed: 1 EUR = 1.95583 BGN',
        amountPaid: 'Amount Paid',
        itemCost: 'Item Cost',
        calculate: 'Calculate',
        clear: 'Clear',
        changeInSelected: 'Change (in {currency})',
        changeInOther: 'Change (in {currency})',
        lev: 'lev',
        euro: 'euro',
        exchangeRate: 'Fixed Rate:',
        accessibilityInfo: 'This calculator is created with a focus on accessibility. Supports screen readers, keyboard navigation, and high contrast.',
        contrastLabel: 'Contrast:',
        contrastDefault: 'Default',
        contrastHigh: 'High',
        contrastUltra: 'Ultra High',
        languageLabel: 'Language:',
        required: 'required field',
        insufficient: 'Insufficient amount. Missing',
        change: 'Change:',
        changeIn: 'Change in {currency}:',
        cleared: 'All fields cleared',
        currencySelected: 'Selected currency:',
        calculatorAnnouncement: 'Change calculator. Selected currency: {currency}. Rate: 1 EUR = {rate} BGN',
        bgn: 'Bulgarian Lev',
        eur: 'Euro',
        enterPaid: 'Enter the amount that was paid',
        enterCost: 'Enter the item cost',
        calculateAria: 'Calculate change and convert currency',
        clearAria: 'Clear all fields'
    }
};

// Current language
let currentLanguage = 'bg';

// DOM Elements
const form = document.getElementById('calculator-form');
const currencyRadios = document.querySelectorAll('input[name="currency"]');
const amountPaidInput = document.getElementById('amount-paid');
const itemCostInput = document.getElementById('item-cost');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const changeValue = document.getElementById('change-value');
const conversionValue = document.getElementById('conversion-value');
const changeAnnouncement = document.getElementById('change-announcement');
const conversionAnnouncement = document.getElementById('conversion-announcement');
const errorContainer = document.getElementById('error-messages');
const languageSelect = document.getElementById('language-select');
const contrastSelect = document.getElementById('contrast-select');

// Get selected currency
function getSelectedCurrency() {
    const selected = document.querySelector('input[name="currency"]:checked');
    return selected ? selected.value : 'BGN';
}

// Convert BGN to EUR
function convertBGNtoEUR(bgn) {
    return bgn / EXCHANGE_RATE;
}

// Convert EUR to BGN
function convertEURtoBGN(eur) {
    return eur * EXCHANGE_RATE;
}

// Format number with 2 decimal places
function formatCurrency(amount, currency) {
    if (isNaN(amount) || amount === null || amount === undefined) {
        return '-';
    }
    return new Intl.NumberFormat('bg-BG', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Calculate change
function calculateChange(paid, due) {
    return paid - due;
}

// Validate inputs
function validateInputs() {
    const errors = [];
    errorContainer.innerHTML = '';
    const t = translations[currentLanguage];
    
    const paid = parseFloat(amountPaidInput.value);
    const itemCost = parseFloat(itemCostInput.value);
    
    if (isNaN(paid) || paid < 0) {
        errors.push(currentLanguage === 'bg' 
            ? 'Моля, въведете валидна платена сума (положително число).'
            : 'Please enter a valid paid amount (positive number).');
    }
    
    if (isNaN(itemCost) || itemCost < 0) {
        errors.push(currentLanguage === 'bg'
            ? 'Моля, въведете валидна стойност на стоката (положително число).'
            : 'Please enter a valid item cost (positive number).');
    }
    
    if (errors.length > 0) {
        displayErrors(errors);
        return false;
    }
    
    return true;
}

// Display errors
function displayErrors(errors) {
    errorContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join('');
    errorContainer.setAttribute('role', 'alert');
    
    // Announce error to screen readers
    const errorText = errors.join('. ');
    announceToScreenReader(errorText, 'assertive');
}

// Clear errors
function clearErrors() {
    errorContainer.innerHTML = '';
    errorContainer.removeAttribute('role');
}

// Announce to screen reader
function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Calculate and display results
function calculateResults() {
    clearErrors();
    
    if (!validateInputs()) {
        // Clear results if validation fails
        changeValue.textContent = '-';
        conversionValue.textContent = '-';
        changeAnnouncement.textContent = '';
        conversionAnnouncement.textContent = '';
        return;
    }
    
    const paid = parseFloat(amountPaidInput.value);
    const itemCost = parseFloat(itemCostInput.value);
    const currency = getSelectedCurrency();
    
    // Calculate change: paid - item cost
    const change = calculateChange(paid, itemCost);
    
    const t = translations[currentLanguage];
    
    // Display change in selected currency
    if (change < 0) {
        const changeText = `${t.insufficient} ${formatCurrency(Math.abs(change), currency)}`;
        changeValue.textContent = changeText;
        changeValue.style.color = 'var(--color-error)';
        changeAnnouncement.textContent = changeText;
        conversionValue.textContent = '-';
        conversionValue.style.color = '';
        conversionAnnouncement.textContent = '';
    } else {
        const changeText = formatCurrency(change, currency);
        changeValue.textContent = changeText;
        changeValue.style.color = 'var(--color-success)';
        changeAnnouncement.textContent = `${t.change} ${changeText}`;
        
        // Convert change to the other currency
        let convertedChange;
        let convertedCurrency;
        let convertedCurrencyName;
        
        if (currency === 'BGN') {
            convertedChange = convertBGNtoEUR(change);
            convertedCurrency = 'EUR';
            convertedCurrencyName = t.euro;
        } else {
            convertedChange = convertEURtoBGN(change);
            convertedCurrency = 'BGN';
            convertedCurrencyName = t.lev;
        }
        
        const conversionText = formatCurrency(convertedChange, convertedCurrency);
        conversionValue.textContent = conversionText;
        conversionValue.style.color = 'var(--color-success)';
        conversionAnnouncement.textContent = t.changeIn.replace('{currency}', convertedCurrencyName) + `: ${conversionText}`;
    }
    
    // Announce results to screen readers
    const otherCurrency = currency === 'BGN' ? t.euro : t.lev;
    const resultsMessage = `${t.change} ${changeValue.textContent}. ${t.changeIn.replace('{currency}', otherCurrency)}: ${conversionValue.textContent}`;
    announceToScreenReader(resultsMessage, 'polite');
}

// Clear all fields
function clearAll() {
    amountPaidInput.value = '';
    itemCostInput.value = '';
    changeValue.textContent = '-';
    conversionValue.textContent = '-';
    changeValue.style.color = '';
    conversionValue.style.color = '';
    changeAnnouncement.textContent = '';
    conversionAnnouncement.textContent = '';
    clearErrors();
    
    // Focus on first input after clearing
    amountPaidInput.focus();
    
    // Announce clearing to screen readers
    announceToScreenReader(translations[currentLanguage].cleared, 'polite');
}

// Update all text content
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Main title and subtitle
    const mainTitle = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');
    if (mainTitle) mainTitle.textContent = t.mainTitle;
    if (subtitle) subtitle.textContent = t.subtitle;
    
    // Currency selection
    const currencyLabel = document.getElementById('currency-label');
    const currencyDesc = document.getElementById('currency-description');
    if (currencyLabel) currencyLabel.textContent = t.currencyLabel;
    if (currencyDesc) currencyDesc.textContent = t.currencyDescription;
    
    // Update radio button labels - find the span inside the label
    const bgnLabel = document.querySelector('label[for="currency-bgn"]');
    const eurLabel = document.querySelector('label[for="currency-eur"]');
    if (bgnLabel) {
        const bgnSpan = bgnLabel.querySelector('span');
        if (bgnSpan) {
            bgnSpan.textContent = currentLanguage === 'bg' ? 'Български лев (BGN)' : 'Bulgarian Lev (BGN)';
        }
    }
    if (eurLabel) {
        const eurSpan = eurLabel.querySelector('span');
        if (eurSpan) {
            eurSpan.textContent = currentLanguage === 'bg' ? 'Евро (EUR)' : 'Euro (EUR)';
        }
    }
    
    // Update radio button aria-labels
    const currencyBGN = document.getElementById('currency-bgn');
    const currencyEUR = document.getElementById('currency-eur');
    if (currencyBGN) {
        currencyBGN.setAttribute('aria-label', currentLanguage === 'bg' ? 'Български лев (BGN)' : 'Bulgarian Lev (BGN)');
    }
    if (currencyEUR) {
        currencyEUR.setAttribute('aria-label', currentLanguage === 'bg' ? 'Евро (EUR)' : 'Euro (EUR)');
    }
    
    // Input labels
    const amountPaidLabel = document.querySelector('label[for="amount-paid"]');
    if (amountPaidLabel) {
        amountPaidLabel.innerHTML = `${t.amountPaid} <span class="required" aria-label="${t.required}">*</span>`;
    }
    const amountPaidDesc = document.getElementById('amount-paid-description');
    if (amountPaidDesc) amountPaidDesc.textContent = t.enterPaid;
    
    const itemCostLabel = document.querySelector('label[for="item-cost"]');
    if (itemCostLabel) {
        itemCostLabel.innerHTML = `${t.itemCost} <span class="required" aria-label="${t.required}">*</span>`;
    }
    const itemCostDesc = document.getElementById('item-cost-description');
    if (itemCostDesc) itemCostDesc.textContent = t.enterCost;
    
    // Buttons
    if (calculateBtn) {
        calculateBtn.textContent = t.calculate;
        calculateBtn.setAttribute('aria-label', t.calculateAria);
    }
    if (clearBtn) {
        clearBtn.textContent = t.clear;
        clearBtn.setAttribute('aria-label', t.clearAria);
    }
    
    // Exchange rate info
    const exchangeRateInfo = document.querySelector('.exchange-rate-info');
    if (exchangeRateInfo) {
        exchangeRateInfo.innerHTML = `<strong>${t.exchangeRate}</strong> 1 EUR = ${EXCHANGE_RATE} BGN`;
    }
    
    // Footer
    const accessibilityInfo = document.querySelector('.accessibility-info');
    if (accessibilityInfo) {
        accessibilityInfo.textContent = t.accessibilityInfo;
    }
    
    // Controls
    const contrastLabel = document.getElementById('contrast-label');
    if (contrastLabel) contrastLabel.textContent = t.contrastLabel;
    
    const languageLabel = document.querySelector('label[for="language-select"]');
    if (languageLabel) languageLabel.textContent = t.languageLabel;
    
    if (contrastSelect) {
        const defaultOption = contrastSelect.querySelector('option[value="default"]');
        const highOption = contrastSelect.querySelector('option[value="high"]');
        const ultraOption = contrastSelect.querySelector('option[value="ultra"]');
        if (defaultOption) defaultOption.textContent = t.contrastDefault;
        if (highOption) highOption.textContent = t.contrastHigh;
        if (ultraOption) ultraOption.textContent = t.contrastUltra;
    }
    
    // Update currency labels
    updateCurrencyLabels();
}

// Update currency labels
function updateCurrencyLabels() {
    const currency = getSelectedCurrency();
    const changeTitle = document.getElementById('change-title');
    const conversionTitle = document.getElementById('conversion-title');
    const t = translations[currentLanguage];
    
    if (changeTitle && conversionTitle) {
        if (currency === 'BGN') {
            changeTitle.textContent = t.changeInSelected.replace('{currency}', t.lev);
            conversionTitle.textContent = t.changeInOther.replace('{currency}', t.euro);
        } else {
            changeTitle.textContent = t.changeInSelected.replace('{currency}', t.euro);
            conversionTitle.textContent = t.changeInOther.replace('{currency}', t.lev);
        }
    }
}

// Handle currency change
function handleCurrencyChange() {
    // Update labels
    updateCurrencyLabels();
    
    // Recalculate if there are values
    const paid = amountPaidInput.value.trim();
    const itemCost = itemCostInput.value.trim();
    
    if (paid && itemCost) {
        calculateResults();
    }
    
    // Announce currency change
    const currency = getSelectedCurrency();
    const t = translations[currentLanguage];
    const currencyName = currency === 'BGN' ? t.bgn : t.eur;
    announceToScreenReader(`${t.currencySelected} ${currencyName}`, 'polite');
}

// Event Listeners
calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateResults();
    calculateBtn.focus(); // Keep focus for keyboard users
});

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearAll();
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateResults();
});

// Handle Enter key in input fields
amountPaidInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        itemCostInput.focus();
    }
});

itemCostInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        calculateResults();
        calculateBtn.focus();
    }
});

// Handle currency radio button changes
currencyRadios.forEach(radio => {
    radio.addEventListener('change', handleCurrencyChange);
    
    // Handle keyboard navigation for radio buttons
    radio.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const radios = Array.from(currencyRadios);
            const currentIndex = radios.indexOf(radio);
            const nextIndex = (currentIndex + 1) % radios.length;
            radios[nextIndex].focus();
            radios[nextIndex].checked = true;
            handleCurrencyChange();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const radios = Array.from(currencyRadios);
            const currentIndex = radios.indexOf(radio);
            const prevIndex = (currentIndex - 1 + radios.length) % radios.length;
            radios[prevIndex].focus();
            radios[prevIndex].checked = true;
            handleCurrencyChange();
        }
    });
});

// Handle Escape key to clear
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (amountPaidInput.value || itemCostInput.value)) {
        clearAll();
    }
});

// Real-time validation feedback
amountPaidInput.addEventListener('blur', () => {
    const value = parseFloat(amountPaidInput.value);
    if (amountPaidInput.value && (isNaN(value) || value < 0)) {
        amountPaidInput.setAttribute('aria-invalid', 'true');
    } else {
        amountPaidInput.removeAttribute('aria-invalid');
    }
});

itemCostInput.addEventListener('blur', () => {
    const value = parseFloat(itemCostInput.value);
    if (itemCostInput.value && (isNaN(value) || value < 0)) {
        itemCostInput.setAttribute('aria-invalid', 'true');
    } else {
        itemCostInput.removeAttribute('aria-invalid');
    }
});

// Automatic calculation on input change
let calculationTimeout;
function debounceCalculate() {
    clearTimeout(calculationTimeout);
    calculationTimeout = setTimeout(() => {
        const paid = amountPaidInput.value.trim();
        const itemCost = itemCostInput.value.trim();
        const paidNum = parseFloat(paid);
        const itemCostNum = parseFloat(itemCost);
        
        // If both paid and item cost are entered, calculate change automatically
        if (paid && itemCost && !isNaN(paidNum) && !isNaN(itemCostNum) && paidNum >= 0 && itemCostNum >= 0) {
            calculateResults();
        }
        // Clear results if fields are empty
        else {
            changeValue.textContent = '-';
            conversionValue.textContent = '-';
            changeValue.style.color = '';
            conversionValue.style.color = '';
            changeAnnouncement.textContent = '';
            conversionAnnouncement.textContent = '';
            clearErrors();
        }
    }, 300); // 300ms delay for better UX
}

// Add input event listeners for automatic calculation
amountPaidInput.addEventListener('input', debounceCalculate);
itemCostInput.addEventListener('input', debounceCalculate);

// Handle language change
function handleLanguageChange() {
    currentLanguage = languageSelect.value;
    updateLanguage();
    
    // Recalculate if there are values
    const paid = amountPaidInput.value.trim();
    const itemCost = itemCostInput.value.trim();
    if (paid && itemCost) {
        calculateResults();
    }
}

// Handle contrast change
function handleContrastChange() {
    const contrast = contrastSelect.value;
    document.body.className = '';
    if (contrast === 'high') {
        document.body.classList.add('contrast-high');
    } else if (contrast === 'ultra') {
        document.body.classList.add('contrast-ultra');
    }
}

// Initialize - set initial currency announcement
window.addEventListener('load', () => {
    // Set initial language
    currentLanguage = languageSelect.value || 'bg';
    updateLanguage();
    
    // Set initial contrast
    handleContrastChange();
    
    // Add event listeners
    languageSelect.addEventListener('change', handleLanguageChange);
    contrastSelect.addEventListener('change', handleContrastChange);
    
    const currency = getSelectedCurrency();
    const t = translations[currentLanguage];
    const currencyName = currency === 'BGN' ? t.bgn : t.eur;
    announceToScreenReader(t.calculatorAnnouncement.replace('{currency}', currencyName).replace('{rate}', EXCHANGE_RATE), 'polite');
    
    // Focus on first input for keyboard users
    amountPaidInput.focus();
});

