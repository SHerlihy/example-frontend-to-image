import _toHaveAttribute from '@testing-library/jasmine-dom/dist/toHaveAttribute.js'
import _toHaveTextContent from '@testing-library/jasmine-dom/dist/toHaveTextContent.js'
import _toHaveClassName from '@testing-library/jasmine-dom/dist/toHaveClassName.js'
import _toBeChecked from '@testing-library/jasmine-dom/dist/toBeChecked.js'
import _toBeEmptyDOMElement from '@testing-library/jasmine-dom/dist/toBeEmptyDOMElement.js'
import _toContainHTML from '@testing-library/jasmine-dom/dist/toContainHTML.js'
import _toHaveFocus from '@testing-library/jasmine-dom/dist/toHaveFocus.js'
import _toBeDisabled from '@testing-library/jasmine-dom/dist/toBeDisabled.js'
import _toHaveAccessibleDescription from '@testing-library/jasmine-dom/dist/toHaveAccessibleDescription.js'
import _toHaveAccessibleName from '@testing-library/jasmine-dom/dist/toHaveAccessibleName.js'
import _toHaveDescription from '@testing-library/jasmine-dom/dist/toHaveDescription.js'
import _toHaveValue from '@testing-library/jasmine-dom/dist/toHaveValue.js'
import _toHaveFormValues from '@testing-library/jasmine-dom/dist/toHaveFormValues.js'
import _toHaveErrorMessage from '@testing-library/jasmine-dom/dist/toHaveErrorMessage.js'
import _toContainElement from '@testing-library/jasmine-dom/dist/toContainElement.js'
import _toBeRequired from '@testing-library/jasmine-dom/dist/toBeRequired.js'
import _toBeInvalid from '@testing-library/jasmine-dom/dist/toBeInvalid.js'
import _toHaveDisplayValue from '@testing-library/jasmine-dom/dist/toHaveDisplayValue.js'
import _toBePartiallyChecked from '@testing-library/jasmine-dom/dist/toBePartiallyChecked.js'
import _toBeInTheDocument from '@testing-library/jasmine-dom/dist/toBeInTheDocument.js'
import _toBeVisible from '@testing-library/jasmine-dom/dist/toBeVisible.js'
import _toHaveStyle from '@testing-library/jasmine-dom/dist/toHaveStyle.js'

var JasmineDOM = {
  toHaveAttribute: _toHaveAttribute.toHaveAttribute,
  toHaveTextContent: _toHaveTextContent.toHaveTextContent,
  toHaveClassName: _toHaveClassName.toHaveClassName,
  toBeChecked: _toBeChecked.toBeChecked,
  toBeEmptyDOMElement: _toBeEmptyDOMElement.toBeEmptyDOMElement,
  toContainHTML: _toContainHTML.toContainHTML,
  toHaveAccessibleDescription: _toHaveAccessibleDescription.toHaveAccessibleDescription,
  toHaveAccessibleName: _toHaveAccessibleName.toHaveAccessibleName,
  toHaveFocus: _toHaveFocus.toHaveFocus,
  toBeDisabled: _toBeDisabled.toBeDisabled,
  toBeEnabled: _toBeDisabled.toBeEnabled,
  toHaveDescription: _toHaveDescription.toHaveDescription,
  toHaveValue: _toHaveValue.toHaveValue,
  toHaveFormValues: _toHaveFormValues.toHaveFormValues,
  toHaveErrorMessage: _toHaveErrorMessage.toHaveErrorMessage,
  toContainElement: _toContainElement.toContainElement,
  toBeRequired: _toBeRequired.toBeRequired,
  toBeInvalid: _toBeInvalid.toBeInvalid,
  toBeValid: _toBeInvalid.toBeValid,
  toHaveDisplayValue: _toHaveDisplayValue.toHaveDisplayValue,
  toBePartiallyChecked: _toBePartiallyChecked.toBePartiallyChecked,
  toBeInTheDocument: _toBeInTheDocument.toBeInTheDocument,
  toBeVisible: _toBeVisible.toBeVisible,
  toHaveStyle: _toHaveStyle.toHaveStyle
};

beforeAll(() => {
	jasmine.getEnv().addMatchers(JasmineDOM);
});
