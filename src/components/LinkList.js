import React, { Component } from 'react'
import Link from './Link'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <div>Fetching</div>
  if (error) return <div>Error</div>
  const linksToRender = data.feed.links

  return (
    <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
  )
}

export default LinkList