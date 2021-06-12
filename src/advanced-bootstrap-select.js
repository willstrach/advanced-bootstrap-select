if (typeof module !== 'undefined'){
    module.exports = {
        GetOrCreateIdForElement,
        RemoveNullPropertiesFromObject,
        ConstructConfiguration,
        SelectButton,
        GetSelectedItems
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

function GetSelectedItems(selectId) {
    return Array.from(document.querySelectorAll(`#${selectId} > option[selected]`)).map((option) => {
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

function AdvancedBootstrapSelect(selectElement, inputConfiguration = {}) {
    const selectId = GetOrCreateIdForElement(selectElement);
    const configuration = ConstructConfiguration(selectElement, inputConfiguration);
}