module.exports = {
    GetOrCreateIdForElement,
    RemoveNullPropertiesFromObject,
    ConstructConfiguration,
    GetSelectedItemsFromSelect,
    GetItemsFromSelect,
    HideElement,
    SelectOptionInSelect,
    DeselectOptionInSelect
}

function GetOrCreateIdForElement(inputElement) {
    if (inputElement.id !== '') {
        return inputElement.id;
    }

    const generatedId = "GID" + Math.random().toString().slice(2);
    inputElement.id = generatedId;

    return generatedId;
}

function HideElement(element) {
    if (element.className !== '') {
        element.className = element.className + ' d-none';
        return;
    }
    element.className = 'd-none';
}

function RemoveNullPropertiesFromObject(inputObject) {
    const outputObject = {};
    Object.keys(inputObject).forEach((key) => {
        if (inputObject[key] !== null) {
            outputObject[key] = inputObject[key];   
        }
    });

    return outputObject;
}

function ConstructConfiguration(selectElement, inputConfiguration) {
    const defaultConfiguration = {
        promptText: 'Select an item'
    };

    const elementConfiguration = {
        selectId: selectElement.id,
        multiple: selectElement.hasAttribute('multiple') ? true : false,
        promptText: selectElement.getAttribute('data-bs-prompt')
    }

    const outputConfiguration = {
        ...defaultConfiguration,
        ...RemoveNullPropertiesFromObject(elementConfiguration),
        ...inputConfiguration
    };

    return outputConfiguration;
}

function GetSelectedItemsFromSelect(selectId) {
    return Array.from(document.querySelectorAll(`#${selectId} > option[selected]`)).map((option) => {
        return {
            value: option.getAttribute('value'),
            text: option.innerHTML
        }
    });
}

function GetItemsFromSelect(selectId) {
    return Array.from(document.querySelectorAll(`#${selectId} > option`)).map((option) => {
        return {
            value: option.getAttribute('value'),
            text: option.innerHTML
        }
    });
}

function DeselectOptionInSelect(selectId, value) {
    const select = document.querySelector(`#${selectId}`);
    const option = select.querySelector(`option[value="${value}"]`)

    option.removeAttribute('selected');
    option.selected = false;
}

function SelectOptionInSelect(selectId, value, text) {
    const select = document.querySelector(`#${selectId}`);
    const multiple = select.hasAttribute('multiple');
    const selectedOptions = GetSelectedItemsFromSelect(selectId);

    if (!multiple) {
        selectedOptions.forEach((item) => {
            DeselectOptionInSelect(selectId, item.value);
        });
    }
    
    if (select.querySelector(`option[value="${value}"]`) === null) {
        const newOption = document.createElement('option');
        newOption.value = value;
        newOption.innerHTML = text;
        select.appendChild(newOption);
    }

    const option = select.querySelector(`option[value="${value}"]`)

    option.setAttribute('selected', true);
    option.selected = true;
}