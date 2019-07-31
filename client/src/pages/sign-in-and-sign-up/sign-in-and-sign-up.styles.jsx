import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    /* my attempt */
    /* display: grid;
    grid-template-columns: 1fr ;
    width: 90vw; */

    flex-direction: column;
    width: unset;
    align-items: center;

    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;