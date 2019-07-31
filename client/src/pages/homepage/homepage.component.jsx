
import React from 'react';

import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => {
  // throw some erros to see how error boundaries are working
  // throw new Error('quafadf');
  // throw 'asdf';

  return (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
  );
};

export default HomePage;