module.exports = {
    SelectButton,
    SelectedItemButton,
    UpdateSelectedItemsForAdvancedSelect,
    SelectMenu,
    SelectItem,
    SelectItemClickHandler
}

const domHelpers = require('./dom-helpers');
const constants = require('./constants');

function SelectButton(configuration) {
    const button = document.createElement('button');
    button.className = 'form-select text-start';
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.innerHTML = configuration.promptText;
    
    return button;
}

function SelectedItemButtonClickHandler(event, configuration) {
    const selectId = event.target.parentElement.parentElement.getAttribute(constants.OVERRIDES_ATTRIBUTE);
    const value = event.target.getAttribute('value');
    const text = event.target.innerHTML;

    domHelpers.DeselectOptionInSelect(selectId, value);
    UpdateSelectedItemsForAdvancedSelect(configuration)
}

function SelectedItemButton(value, text, configuration) {
    const itemButton = document.createElement('div');
    itemButton.className = 'btn btn-secondary btn-sm me-1';
    itemButton.setAttribute('value', value);
    itemButton.innerHTML = text + ' &times;';
    itemButton.addEventListener('click', (event) => {
        SelectedItemButtonClickHandler(event, configuration)
    });
    return itemButton;
}

function UpdateSelectedItemsForAdvancedSelect(configuration) {
    const advancedSelectButton = document.querySelector(`.dropdown[${constants.OVERRIDES_ATTRIBUTE}="${configuration.selectId}"] > .form-select`);
    advancedSelectButton.innerHTML = '';
    const selectedItems = domHelpers.GetSelectedItemsFromSelect(configuration.selectId);
    if (selectedItems.length > 0 && !configuration.multiple) {
        advancedSelectButton.innerHTML = selectedItems[0].text;
        return;
    }
    if (selectedItems.length > 0 && configuration.multiple) {
        selectedItems.forEach((item) => {
            advancedSelectButton.appendChild(SelectedItemButton(item.value, item.text, configuration));
        });
        return;
    }

    advancedSelectButton.innerHTML = configuration.promptText;
}

function SelectItemClickHandler(event, configuration) {
    const selectId = event.target.parentElement.parentElement.getAttribute(constants.OVERRIDES_ATTRIBUTE);
    const value = event.target.getAttribute('value');
    const text = event.target.innerHTML;

    domHelpers.SelectOptionInSelect(selectId, value, text);
    UpdateSelectedItemsForAdvancedSelect(configuration)
}

function SelectItem(value, text, configuration) {
    const selectItem = document.createElement('li');
    selectItem.className = 'dropdown-item';
    selectItem.setAttribute('value', value);
    selectItem.innerHTML = text;
    selectItem.addEventListener('click', (event) => {
        SelectItemClickHandler(event, configuration);
    });

    return selectItem;
}

function SelectMenu(configuration) {
    const selectMenu = document.createElement('ul');
    selectMenu.className = 'dropdown-menu w-100';

    const selectItems = domHelpers.GetItemsFromSelect(configuration.selectId);
    selectItems.forEach((item) => {
        selectMenu.appendChild(SelectItem(item.value, item.text, configuration));
    });

    return selectMenu;
}