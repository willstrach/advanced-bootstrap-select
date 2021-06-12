if (typeof module !== 'undefined'){
    module.exports = {
        GetOrCreateIdForElement,
        RemoveNullPropertiesFromObject
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

function AdvancedBootstrapSelect(selectElement, inputConfiguration = {}) {
    const selectId = GetOrCreateIdForElement(selectElement);
}