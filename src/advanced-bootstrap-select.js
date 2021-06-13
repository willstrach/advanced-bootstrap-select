module.exports = {
        AdvancedBootstrapSelect
}

const components = require('./components');
const domHelpers = require('./dom-helpers');

function AdvancedBootstrapSelect(selectElement, inputConfiguration = {}) {
    domHelpers.HideElement(selectElement);
    const selectId = domHelpers.GetOrCreateIdForElement(selectElement);
    const configuration = domHelpers.ConstructConfiguration(selectElement, inputConfiguration);
    const advancedSelect = document.createElement('div');
    advancedSelect.className = 'dropdown';
    advancedSelect.setAttribute('data-bs-overrides', selectId);
    advancedSelect.appendChild(components.SelectButton(configuration));
    advancedSelect.appendChild(components.SelectMenu(configuration));

    selectElement.parentElement.insertBefore(advancedSelect, selectElement);
    components.UpdateSelectedItemsForAdvancedSelect(configuration);
}

global.AdvancedBootstrapSelect = AdvancedBootstrapSelect;