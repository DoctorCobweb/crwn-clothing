import React from 'react';

// import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles.jsx';
import Spinner from '../spinner/spinner.component';

const WithSpinner = WrappedComponent => (
  ({isLoading, ...otherProps}) => {
    return isLoading ? (
      <Spinner />
    ) : (
      <WrappedComponent {...otherProps } /> 
    );
  } 
);

export default WithSpinner;
