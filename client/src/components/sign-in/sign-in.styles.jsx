import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 90vw;
  }
`;
SignInContainer.displayName = 'SignInContainer';

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;
SignInTitle.displayName = 'SignInTitle';

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
ButtonsBarContainer.displayName = 'ButtonsBarContainer';