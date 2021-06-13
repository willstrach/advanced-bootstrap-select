/**
 * @jest-environment jsdom
 */

const advancedBootstrapSelect = require('../src/advanced-bootstrap-select');
const constants = require('../src/constants');

test('AdvancedBoostrapSelect should add div before select element', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const selectElement = document.querySelector('select');

    // Act
    advancedBootstrapSelect.AdvancedBootstrapSelect(selectElement);

    // Assert
    expect(selectElement.previousSibling).toBeDefined();
    expect(selectElement.previousSibling.tagName).toBe('DIV');
});

test('AdvancedBootstrapSelect should add div with data-bs-overrides attribute', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const selectElement = document.querySelector('select');

    // Act
    advancedBootstrapSelect.AdvancedBootstrapSelect(selectElement);

    // Assert
    expect(selectElement.previousSibling.hasAttribute(constants.OVERRIDES_ATTRIBUTE)).toBeTruthy();
    expect(selectElement.previousElementSibling.getAttribute(constants.OVERRIDES_ATTRIBUTE)).toEqual(selectElement.id);
});

test('AdvancedBootstrapSelect should add div with dropdown class', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const selectElement = document.querySelector('select');

    // Act
    advancedBootstrapSelect.AdvancedBootstrapSelect(selectElement);

    // Assert
    expect(selectElement.previousSibling.className).toContain('dropdown');
});

test('AdvancedBootstrapSelect should add a select button', () => {
    // Arrange
    document.body.innerHTML = 
    `
    <select id="arbitraryId">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
    </select>
    `
    const selectElement = document.querySelector('select');

    // Act
    advancedBootstrapSelect.AdvancedBootstrapSelect(selectElement);

    // Assert
    expect(selectElement.previousSibling.querySelector('button.form-select')).toBeDefined();
});