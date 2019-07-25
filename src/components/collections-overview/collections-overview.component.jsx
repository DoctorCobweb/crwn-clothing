import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import { CollectionsOverviewContainer } from './collections-overview.styles.jsx';
// import './collections-overview.styles.scss';

// const CollectionsOverview = ({ collections }) => {
const CollectionsOverview = (props) => {
  const { collections } = props;
  // console.log('props in CollectionsOverview');
  // console.log(props);
  // console.log('collections in CollectionsOverview');
  // console.log(collections)

  return (
  <CollectionsOverviewContainer>
    {
      collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps }/>
      ))
    }
  </CollectionsOverviewContainer>
  );
  };

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);