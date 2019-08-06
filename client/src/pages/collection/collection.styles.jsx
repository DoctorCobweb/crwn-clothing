import styled from 'styled-components';

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column
`;
CollectionPageContainer.displayName = 'CollectionPageContainer';

export const CollectionTitle = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
`;
CollectionTitle.displayName = 'CollectionTitle';

export const CollectionItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  & .collection-item {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;
CollectionItemsContainer.displayName = 'CollectionItemsContainer';


