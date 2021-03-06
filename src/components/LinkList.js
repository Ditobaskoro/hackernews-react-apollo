import React from 'react'
import Link from './Link'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <div>Fetching</div>
  if (error) return <div>Error</div>
  const linksToRender = data.feed.links

  const _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY })
  
    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes
  
    store.writeQuery({ query: FEED_QUERY, data })
  }

  return (
    <div>
      {linksToRender.map((link, index) => (
        <Link key={link.id} link={link} index={index} updateStoreAfterVote={_updateCacheAfterVote} />
      ))}
    </div>
  )
}

export default LinkList