import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FormGroup } from '../../../common-components';
import { validateDNI } from './validator';
import { clearDNIBackendError } from '../../data/actions';

/**
 * DNIField component wrapper. It accepts handlers for value change and error change.
 * It is responsible for:
 * - Validating DNI format
 * - Clearing error on focus
 * - Setting value on change
 */
const DNIField = (props) => {
  const dispatch = useDispatch();
  const { value, errorMessage, handleChange, handleErrorChange } = props;
  const { dniValidationApiError } = useSelector(state => state.register);

  useEffect(() => {
    // Perform any additional side effects upon component mount or state change
    // if needed
  }, []); // Empty dependency array means this effect will only run once after initial render

  const handleOnBlur = (event) => {
    const { value: dni } = event.target;
    const fieldError = validateDNI(dni);
    if (fieldError) {
      handleErrorChange('dni', fieldError);
    } else {
      dispatch(clearDNIBackendError());
      // Additional validation or backend checks can be performed here if needed
    }
  };

  const handleOnChange = (event) => {
    // Perform any necessary transformations or checks on input value
    handleChange(event);
  };

  const handleOnFocus = () => {
    // Clear any errors or backend errors when the field gains focus
    handleErrorChange('dni', '');
    dispatch(clearDNIBackendError());
  };

  return (
    <FormGroup
      {...props}
      handleChange={handleOnChange}
      handleFocus={handleOnFocus}
      handleBlur={handleOnBlur}
    >
      {/* Additional UI components or error messages can be rendered here if needed */}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
      {dniValidationApiError && <span className="error-message">{dniValidationApiError}</span>}
    </FormGroup>
  );
};

DNIField.defaultProps = {
  errorMessage: '',
};

DNIField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default DNIField;
