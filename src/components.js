module.exports = {
    SelectButton,
    SelectedItemButton,
    UpdateSelectedItemsForAdvancedSelect,
    SelectMenu,
    SelectItem
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

function SelectItem(value, text) {
    const selectItem = document.createElement('li');
    selectItem.className = 'dropdown-item';
    selectItem.setAttribute('value', value);
    selectItem.innerHTML = text;

    return selectItem;
}

function SelectMenu(configuration) {
    const selectMenu = document.createElement('ul');
    selectMenu.className = 'dropdown-menu w-100';

    const selectItems = domHelpers.GetItemsFromSelect(configuration.selectId);
    selectItems.forEach((item) => {
        selectMenu.appendChild(SelectItem(item.value, item.text));
    });

    return selectMenu;
}