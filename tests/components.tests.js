/**
 * @jest-environment jsdom
 */

 const components = require('../src/components');
 const constants = require('../src/constants');

 test('SelectButton should return a button element', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `
    const configuration = {
        selectId: 'arbitraryId',
        multiple: false
    };

    // Act
    const buttonElement = components.SelectButton(configuration);

    // Assert
    expect(buttonElement.tagName).toBe('BUTTON');
})

test('SelectButton should have the data-bs-toggle attribute of dropdown', () => {
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `
    const configuration = {
        selectId: 'arbitraryId',
        multiple: false
    };

    // Act
    const buttonElement = components.SelectButton(configuration);

    // Assert
    expect(buttonElement.hasAttribute('data-bs-toggle')).toBeTruthy();
    expect(buttonElement.getAttribute('data-bs-toggle')).toBe('dropdown');
});

test('SelectButton should have the correct bootstrap classes', () => {
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `
    const configuration = {
        selectId: 'arbitraryId',
        multiple: false
    };

    // Act
    const buttonElement = components.SelectButton(configuration);

    // Assert
    expect(buttonElement.className).toContain('form-select');
    expect(buttonElement.className).toContain('text-start');
});

test('SelectButton should have the correct prompt text if no options are selected', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const configuration = {
        selectId: 'arbitraryId',
        multiple: false,
        promptText: 'Some arbitrary prompt text'        
    };

    // Act
    const buttonElement = components.SelectButton(configuration);

    // Assert
    expect(buttonElement.innerHTML).toBe('Some arbitrary prompt text');
});

test('SelectedItemButton should create a div', () => {
    // Arrange
    
    // Act
    const selectedItemButton = components.SelectedItemButton(1, 'arbitrary');

    // Assert
    expect(selectedItemButton.tagName).toBe('DIV');
});

test('SelectedItemButton should have correct classes', () => {
    // Arrange

    // Act
    const selectedItemButton = components.SelectedItemButton(1, 'arbitrary');

    // Assert
    expect(selectedItemButton.className).toContain('btn');
    expect(selectedItemButton.className).toContain('btn-secondary');
    expect(selectedItemButton.className).toContain('btn-sm');
});

test('SelectedItemButton should have value and text', () => {
    // Arrange
    const value = 1;
    const text = 'Option 1';

    // Act
    const selectedItemButton = components.SelectedItemButton(value, text);

    // Assert
    expect(selectedItemButton.getAttribute('value')).toEqual(value.toString());
    expect(selectedItemButton.innerHTML).toContain(text);
});

test('UpdateSelectedItemsForAdvancedSelect should add promt text if no items are selected', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <div class="dropdown" ${constants.OVERRIDES_ATTRIBUTE}="arbitraryId">
        <button class="form-select text-start">
        </button>
    </div>
    <select id="arbitraryId" >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const advancedSelectButton = document.querySelector('.dropdown > .form-select');
    const configuration = {
        selectId: 'arbitraryId',
        multiple: false,
        promptText: 'arbitrary prompt text'
    };

    // Act
    components.UpdateSelectedItemsForAdvancedSelect(configuration);

    // Assert
    expect(advancedSelectButton.innerHTML).toBe('arbitrary prompt text');
});

test('UpdateSelectedItemsForAdvancedSelect should add selected item if exists and single select', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <div class="dropdown" ${constants.OVERRIDES_ATTRIBUTE}="arbitraryId">
        <button class="form-select text-start">
        </button>
    </div>
    <select id="arbitraryId" >
        <option value="1" selected>Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const advancedSelectButton = document.querySelector('.dropdown > .form-select');
    const configuration = {
        selectId: 'arbitraryId',
        multiple: false,
        promptText: 'arbitrary prompt text'
    };
    
    // Act
    components.UpdateSelectedItemsForAdvancedSelect(configuration);

    // Assert
    expect(advancedSelectButton.innerHTML).toBe('Option 1');
});

test('UpdateSelectedItemsForAdvancedSelect should add selected items if exists and multiple select', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <div class="dropdown" ${constants.OVERRIDES_ATTRIBUTE}="arbitraryId">
        <button class="form-select text-start">
        </button>
    </div>
    <select id="arbitraryId" multiple>
        <option value="1" selected>Option 1</option>
        <option value="2" selected>Option 2</option>
    </select>
    `
    const advancedSelectButton = document.querySelector('.dropdown > .form-select');
    const configuration = {
        selectId: 'arbitraryId',
        multiple: true,
        promptText: 'arbitrary prompt text'
    };
    
    // Act
    components.UpdateSelectedItemsForAdvancedSelect(configuration);

    // Assert
    expect(advancedSelectButton.innerHTML).toContain('Option 1');
    expect(advancedSelectButton.innerHTML).toContain('Option 2');
    expect(advancedSelectButton.children.length).toBe(2);
});

test('SelectMenu should create a ul', () => {
    // Arrange
    const configuration = {
        selectId: 'arbitraryId',
        multiple: true,
        promptText: 'arbitrary prompt text'
    };
    
    // Act
    const selectMenu = components.SelectMenu(configuration);

    // Assert
    expect(selectMenu.tagName).toBe('UL');
});

test('SelectMenu should have correct classes', () => {
    // Arrange
    const configuration = {
        selectId: 'arbitraryId',
        multiple: true,
        promptText: 'arbitrary prompt text'
    };
    
    // Act
    const selectMenu = components.SelectMenu(configuration);

    // Assert
    expect(selectMenu.className).toContain('dropdown-menu');
    expect(selectMenu.className).toContain('w-100');
});

test('SelectItem should create a li', () => {
    // Act
    const selectItem = components.SelectItem(1, 'Option 1');

    // Assert
    expect(selectItem.tagName).toBe('LI');
});

test('SelectItem should have correct classes', () => {
    // Act
    const selectItem = components.SelectItem(1, 'Option 1');

    // Assert
    expect(selectItem.className).toContain('dropdown-item');
});

test('SelectItem should have value and text', () => {
    // Act
    const selectItem = components.SelectItem(1, 'Option 1');

    // Assert
    expect(selectItem.hasAttribute('value')).toBeTruthy();
    expect(selectItem.getAttribute('value')).toBe('1');
    expect(selectItem.innerHTML).toBe('Option 1');
});