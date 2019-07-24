import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles.jsx';
// import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
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

// const FormInput = ({ handleChange, label, ...otherProps }) => (
//   <div className="group">
//     <input className="form-input" onChange={handleChange} {...otherProps} />
//     {
//       label ?
//       (<label className={`${otherProps.value.length ? 'shrink': ''} form-input-label`}>
//         {label}
//       </label>)
//       : null
//     }
//   </div>

// );

export default FormInput;