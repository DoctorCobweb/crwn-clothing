import React from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

export class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    }
  }

  static getDerivedStateFromError(error) {
    // prcess the error and set the state by returning the state
    // console.log('getDerivedStateFromError called')
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    // console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl={'https://i.imgur.com/yW2W9SC.png'} />
          <ErrorImageText>This page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    } else {
      // console.log('hasdfh props.children')
      return this.props.children;
    }
  }
}

export default ErrorBoundary;