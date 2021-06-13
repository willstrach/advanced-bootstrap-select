/**
 * @jest-environment jsdom
 */

const domHelpers = require('../src/dom-helpers')

test('GetOrCreateIdForElement returns correct id when element has id', () => {
    // Arrange
    document.body.innerHTML = '<div id="arbitraryId">&nbsp;</div>';
    const element = document.querySelector('div');

    // Act
    const lookupId = domHelpers.GetOrCreateIdForElement(element); 

    // Assert
    expect(lookupId).toEqual('arbitraryId');
    expect(element.id).toEqual('arbitraryId');
});

test('GetOrCreateIdForElement creates and returns new id when element has no id', () => {
    // Arrange
    document.body.innerHTML = '<div>&nbsp;</div>';
    const element = document.querySelector('div');
    
    // Act
    const lookupId = domHelpers.GetOrCreateIdForElement(element); 
    
    // Assert
    expect(element.id).not.toBe('');
    expect(lookupId).toEqual(element.id);
});

test('RemoveNullPropertiesFromObject should remove any null properties and keep non-null properties', () => {
    // Arrange
    const objectWithNulls = {
        propertyOne: null,
        propertyTwo: 'not null',
        propertyThree: null,
        propertyFour: null,
    };

    // Act
    const outputObject = domHelpers.RemoveNullPropertiesFromObject(objectWithNulls);

    // Assert
    expect(outputObject).toEqual({propertyTwo: 'not null'});
});

test('ConstructConfiguration should return configuration values from element if empty inputConfiguration is provided', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId"
        data-bs-prompt="Some arbitrary prompt text"
        multiple>
    </select>
    `
    const element = document.querySelector('select');

    // Act
    const outputConfiguration = domHelpers.ConstructConfiguration(element, {});

    // Assert
    expect(outputConfiguration).toEqual(expect.objectContaining({
        selectId: 'arbitraryId',
        multiple: true,
        promptText: 'Some arbitrary prompt text'
    }));
});

test('GetSelectedItemsFromSelect should return empty array if no items exist', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `

    // Act
    const selectedItems = domHelpers.GetSelectedItemsFromSelect('arbitraryId');

    // Assert
    expect(selectedItems).toBeDefined();
    expect(selectedItems.length).toBe(0);
});

test('GetSelectedItemsFromSelect should return empty array if no selected items exist', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `

    // Act
    const selectedItems = domHelpers.GetSelectedItemsFromSelect('arbitraryId');

    // Assert
    expect(selectedItems).toBeDefined();
    expect(selectedItems.length).toBe(0);
});

test('GetSelectedItemsFromSelect should return array of selected items if selected items exist', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1" selected>Option 1</option>
        <option value="2" selected>Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
    </select>
    `

    // Act
    const selectedItems = domHelpers.GetSelectedItemsFromSelect('arbitraryId');

    // Assert
    expect(selectedItems).toBeDefined();
    expect(selectedItems.length).toBe(2);
    expect(selectedItems).toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {value: '1', text: 'Option 1'}
            ),
            expect.objectContaining(
                {value: '2', text: 'Option 2'}
            )
        ])
    );
});

test('GetItemsFromSelect should return empty array if no options exist', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `

    // Act
    const selectedItems = domHelpers.GetItemsFromSelect('arbitraryId');

    // Assert
    expect(selectedItems).toBeDefined();
    expect(selectedItems.length).toBe(0);
});

test('GetItemsFromSelect should return array of items if options exist', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `

    // Act
    const selectedItems = domHelpers.GetItemsFromSelect('arbitraryId');

    // Assert
    expect(selectedItems).toBeDefined();
    expect(selectedItems.length).toBe(2);
    expect(selectedItems).toEqual(
        expect.arrayContaining([
            expect.objectContaining(
                {value: '1', text: 'Option 1'}
            ),
            expect.objectContaining(
                {value: '2', text: 'Option 2'}
            )
        ])
    );
});

test('HideElement should set element class to d-none if has no classes', () => {
    // Arrange
    document.body.innerHTML =
    `
    <div></div>

    `
    // Act
    domHelpers.HideElement(document.querySelector('div'));

    // Assert
    expect(document.querySelector('div').className).toEqual('d-none');
});

test('HideElement should not remove existing classes', () => {
    // Arrange
    document.body.innerHTML =
    `
    <div class='class-1 class-2'></div>

    `
    // Act
    domHelpers.HideElement(document.querySelector('div'));

    // Assert
    expect(document.querySelector('div').className).toContain('class-1');
    expect(document.querySelector('div').className).toContain('class-2');
});

test('SelectOptionInSelect should select an option if none are selected', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const select = document.querySelector('#arbitraryId');

    // Act
    domHelpers.SelectOptionInSelect('arbitraryId', 1, 'Option 1');

    // Assert
    expect(select.querySelector('option[selected]')).not.toBeNull();
});

test('SelectOptionInSelect should select an option and deselect another if single select', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
    </select>
    `
    const select = document.querySelector('#arbitraryId');

    // Act
    domHelpers.SelectOptionInSelect('arbitraryId', 1, 'Option 1');

    // Assert
    expect(select.querySelector('option[selected]')).not.toBeNull();
    expect(select.querySelector('option[value="2"]').selected).toBeFalsy();
    expect(select.querySelector('option[value="2"]').hasAttribute('selected')).toBeFalsy();
    expect(select.querySelector('option[value="1"]').selected).toBeTruthy();
    expect(select.querySelector('option[value="1"]').hasAttribute('selected')).toBeTruthy();
});

test('SelectOptionInSelect should select an option and not deselect another if multiple select', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId" multiple>
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
    </select>
    `
    const select = document.querySelector('#arbitraryId');

    // Act
    domHelpers.SelectOptionInSelect('arbitraryId', 1, 'Option 1');

    // Assert
    expect(select.querySelector('option[selected]')).not.toBeNull();
    expect(select.querySelector('option[value="2"]').selected).toBeTruthy();
    expect(select.querySelector('option[value="2"]').hasAttribute('selected')).toBeTruthy();
    expect(select.querySelector('option[value="1"]').selected).toBeTruthy();
    expect(select.querySelector('option[value="1"]').hasAttribute('selected')).toBeTruthy();
});

test('SelectOptionInSelect should add an option if it does not exist', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId" multiple>
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
    </select>
    `
    const select = document.querySelector('#arbitraryId');

    // Act
    domHelpers.SelectOptionInSelect('arbitraryId', 3, 'Option 3');

    // Assert
    expect(select.querySelector('option[value="3"]')).not.toBeNull();
    expect(select.querySelector('option[value="3"]').selected).toBeTruthy();
    expect(select.querySelector('option[value="3"]').hasAttribute('selected')).toBeTruthy();
    expect(select.querySelector('option[value="2"]').selected).toBeTruthy();
    expect(select.querySelector('option[value="2"]').hasAttribute('selected')).toBeTruthy();
});

test('DeselectOptionInSelect should deselect and option', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId" multiple>
        <option value="1">Option 1</option>
        <option value="2" selected>Option 2</option>
    </select>
    `
    const select = document.querySelector('#arbitraryId');

    // Act
    domHelpers.DeselectOptionInSelect('arbitraryId', 2);

    // Assert
    expect(select.querySelector('option[value="2"]').selected).toBeFalsy();
    expect(select.querySelector('option[value="2"]').hasAttribute('selected')).toBeFalsy();
});