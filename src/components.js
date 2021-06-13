module.exports = {
    SelectButton,
    SelectedItemButton,
    UpdateSelectedItemsForAdvancedSelect,
    SelectMenu
}

const domHelpers = require('./dom-helpers');

function SelectButton(configuration) {
    const button = document.createElement('button');
    button.className = 'form-select text-start';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.innerHTML = configuration.promptText;
    
    return button;
}

function SelectedItemButton(value, text) {
    const itemButton = document.createElement('div');
    itemButton.className = 'btn btn-secondary btn-sm me-1';
    itemButton.setAttribute('value', value);
    itemButton.innerHTML = text + ' &times;';
    return itemButton;
}

function UpdateSelectedItemsForAdvancedSelect(configuration) {
    const advancedSelectButton = document.querySelector(`.dropdown[data-bs-overrides="${configuration.selectId}"] > .form-select`);
    advancedSelectButton.innerHTML = '';
    const selectedItems = domHelpers.GetSelectedItemsFromSelect(configuration.selectId);
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

function SelectMenu() {
    const selectMenu = document.createElement('div');
    selectMenu.className = 'dropdown-menu w-100';

    return selectMenu;
}