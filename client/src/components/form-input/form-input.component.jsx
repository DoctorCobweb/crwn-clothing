import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles.jsx';

export const FormInput = ({ handleChange, label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {
      label ?
      (<FormInputLabel textLength={otherProps.value.length}>
        {label}
      </FormInputLabel>)
      : null
    }
  </GroupContainer>
);

export default FormInput;