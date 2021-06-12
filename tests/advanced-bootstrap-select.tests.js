/**
 * @jest-environment jsdom
 */

const advancedBootstrapSelect = require('../src/advanced-bootstrap-select')

test('GetOrCreateIdForElement returns correct id when element has id', () => {
    // Arrange
    document.body.innerHTML = '<div id="arbitraryId">&nbsp;</div>';
    const element = document.querySelector('div');

    // Act
    const lookupId = advancedBootstrapSelect.GetOrCreateIdForElement(element); 

    // Assert
    expect(lookupId).toEqual('arbitraryId');
    expect(element.id).toEqual('arbitraryId');
});


test('GetOrCreateIdForElement creates and returns new id when element has no id', () => {
    // Arrange
    document.body.innerHTML = '<div>&nbsp;</div>';
    const element = document.querySelector('div');
    
    // Act
    const lookupId = advancedBootstrapSelect.GetOrCreateIdForElement(element); 
    
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
    const outputObject = advancedBootstrapSelect.RemoveNullPropertiesFromObject(objectWithNulls);

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
    const outputConfiguration = advancedBootstrapSelect.ConstructConfiguration(element, {});

    // Assert
    expect(outputConfiguration).toEqual(expect.objectContaining({
        selectId: 'arbitraryId',
        multiple: true,
        promptText: 'Some arbitrary prompt text'
    }));
});

test('SelectButton should return a button element', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `
    const selectElement = document.querySelector('select');
    const configuration = advancedBootstrapSelect.ConstructConfiguration(selectElement, {});

    // Act
    const buttonElement = advancedBootstrapSelect.SelectButton(configuration);

    // Assert
    expect(buttonElement.tagName).toBe('BUTTON');
})

test('SelectButton should have the data-bs-toggle attribute of button', () => {
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `
    const selectElement = document.querySelector('select');
    const configuration = advancedBootstrapSelect.ConstructConfiguration(selectElement, {});

    // Act
    const buttonElement = advancedBootstrapSelect.SelectButton(configuration);

    // Assert
    expect(buttonElement.hasAttribute('data-bs-toggle')).toBeTruthy();
    expect(buttonElement.getAttribute('data-bs-toggle')).toBe('button');
});

test('SelectButton should have the correct bootstrap classes', () => {
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
    </select>
    `
    const selectElement = document.querySelector('select');
    const configuration = advancedBootstrapSelect.ConstructConfiguration(selectElement, {});

    // Act
    const buttonElement = advancedBootstrapSelect.SelectButton(configuration);

    // Assert
    expect(buttonElement.className).toContain('form-select');
    expect(buttonElement.className).toContain('text-start');
});

test('SelectButton should have the correct prompt text', () => {
    // Arrange
    const configuration = {
        selectId: 'arbitraryId',
        multiple: true,
        promptText: 'Some arbitrary prompt text'
    }

    // Act
    const buttonElement = advancedBootstrapSelect.SelectButton(configuration);

    // Assert
    expect(buttonElement.innerHTML).toBe('Some arbitrary prompt text');
});