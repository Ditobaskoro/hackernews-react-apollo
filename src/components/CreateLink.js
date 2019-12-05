import React, { useState } from 'react'
import gql from 'graphql-tag'

import { useMutation } from 'react-apollo'
import { FEED_QUERY } from './LinkList'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

const CreateLink = () => {

  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const [postMutation] = useMutation(POST_MUTATION, {
    variables: {description, url},
    onCompleted: () => this.props.history.push('/'),
    update: (store, { data: { post } }) => {
      const data = store.readQuery({ query: FEED_QUERY })
      data.feed.links.unshift(post)
      store.writeQuery({
        query: FEED_QUERY,
        data
      })
    },
  })

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <button onClick={postMutation}>Submit</button>
    </div>
  )

}

export default CreateLink