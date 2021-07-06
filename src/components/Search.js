import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Links from './Links';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
      }
    }
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);
  return (
    <>
      <div>
        Search
        <input
          type='text'
          onChange={(event) => setSearchFilter(event.target.value)}
        />
        <button
          onClick={() =>
            executeSearch({
              variables: {
                filter: searchFilter,
              },
            })
          }
        >
          {' '}
          OK{' '}
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Links key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
