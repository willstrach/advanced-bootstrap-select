if (typeof module !== 'undefined'){
    module.exports = {
        GetOrCreateIdForElement,
        RemoveNullPropertiesFromObject,
        ConstructConfiguration,
        SelectButton,
        GetSelectedItemsFromSelect,
        GetItemsFromSelect,
        AdvancedBootstrapSelect,
        UpdateSelectedItemsForAdvancedSelect,
        SelectedItemButton
    }
}

function GetOrCreateIdForElement(inputElement) {
    if (inputElement.id !== '') {
        return inputElement.id;
    }

    const generatedId = Math.random().toString().slice(2);
    inputElement.id = generatedId;

    return generatedId;
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

function SelectButton(configuration) {
    const button = document.createElement('button');
    button.className = 'form-select text-start';
    button.setAttribute('data-bs-toggle', 'button');
    button.innerHTML = configuration.promptText;
    
    return button;
}

function SelectedItemButton(value, text) {
    const itemButton = document.createElement('div');
    itemButton.className = 'btn btn-secondary btn-sm';
    itemButton.setAttribute('value', value);
    itemButton.innerHTML = text;
    return itemButton;
}

function UpdateSelectedItemsForAdvancedSelect(configuration) {
    const advancedSelectButton = document.querySelector(`.dropdown[data-bs-overrides=${configuration.selectId}] > .form-select`);
    advancedSelectButton.innerHTML = '';
    const selectedItems = GetSelectedItemsFromSelect(configuration.selectId);
    if (selectedItems.length > 0 && !configuration.multiple) {
        advancedSelectButton.innerHTML = selectedItems[0].text;
        return;
    }
    if (selectedItems.length > 0 && configuration.multiple) {
        selectedItems.forEach((item) => {
            advancedSelectButton.appendChild(SelectedItemButton(item.value, item.text));
        });
        return;
    }

    advancedSelectButton.innerHTML = configuration.promptText;
}

function AdvancedBootstrapSelect(selectElement, inputConfiguration = {}) {
    const selectId = GetOrCreateIdForElement(selectElement);
    const configuration = ConstructConfiguration(selectElement, inputConfiguration);
    const advancedSelect = document.createElement('div');
    advancedSelect.className = 'dropdown';
    advancedSelect.setAttribute('data-bs-overrides', selectId);
    advancedSelect.appendChild(SelectButton(configuration));

    selectElement.parentElement.insertBefore(advancedSelect, selectElement);
}
