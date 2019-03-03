import React, { Fragment } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import Moment from 'moment';

import { colors, typography } from '../theme/common_var';
import { fadeIn } from '../theme/animation';

const _ = {
  isEmpty,
  isUndefined
}

const Container = styled(Flex)``;

const RepoWrapper = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  margin: 0.5em;
  animation: ${fadeIn} 1s linear;
  cursor: pointer;
  text-decoration: none;
`;

const AuthorWrapper = styled(Flex)``;
const Author = styled.div``;
const AvatarWrapper = styled.div``;

const RepoTitle = styled.div`
  color: ${colors.gray.grayA4};
  font-size: ${typography.font.size.larger};
  white-space : normal;
`;

const RepoUpdatedTime = styled.div`
  color: ${colors.gray.gray40};
  font-size: ${typography.font.size.small};
`;

const Tip = styled.h3`
  color: ${colors.gray.gray80};
`;

const SearchResult = ({ parentState }) => {
  if (_.isUndefined(parentState.items)) return <Container center column full />;
  if (parentState.total_count === 0) return <Container center column full >Nothin</Container>;
  
  const _total_items_count = _.isEmpty(parentState.items) ? 0 : parentState.items.length;

  return (
    _.isEmpty(parentState.items) ?
      <Container center column full><Tip>Searching...</Tip></Container> :
      <Container center column full>
        {parentState.items.map(item => (
          <Fragment key={item.id}>
            <RepoWrapper key={item.id} className="paper" href={item.svn_url} target="_blank">
              <AuthorWrapper justifyStart alignCenter full>
                <AvatarWrapper className="avartar-circle"><img src={item.owner.avatar_url} /></AvatarWrapper>
                <Author className="author">{item.owner.login}</Author>
              </AuthorWrapper>
              <RepoTitle>Repository : {item.name}</RepoTitle>
              <Flex justifyEnd alignCenter full>
                <RepoUpdatedTime>Last Updated : {Moment(item.updated_at).format('MMMM Do YYYY')}</RepoUpdatedTime>
              </Flex>
            </RepoWrapper>
          </Fragment>
        ))}
        {parentState.total_count === _total_items_count ? <Tip>Nothin</Tip> : <Tip>More...</Tip>}
      </Container>)
}

export default SearchResult;
