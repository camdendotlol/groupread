import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { parseMarkdown, getDisplayName } from '../../lib/posts'
dayjs.extend(relativeTime)
import { Post } from '../../types'
import { useAppSelector } from '../../hooks'
import ReplyForm from './ReplyForm'
import { ReplyPayloadType } from './ReplyForm'

interface Props {
  groupMembers: Array<any>,
  replyObject: Post
}

const Reply: React.FC<Props> = ({ groupMembers, replyObject }) => {
  // Remark is async, so we have to do some state management
  // to wait for it to do its thing
  const [text, setText] = useState<string>('loading...')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const user = useAppSelector(({ user }) => user)

  // Call the remark function on component load
  // Also re-run it if replyObject changes (e.g.
  // when the post is edited)
  useEffect(() => {
    const getHTML = async (postContent: string) => {
      const formattedText = await parseMarkdown(postContent)
      setText(formattedText)
    }

    getHTML(replyObject.text)
  }, [replyObject])

  
  if (!user) return <p>Loading...</p>

  const handleEditButton = (authorID: string) => {
    if (authorID === user.id) {
      return (
        <button
          className='button is-small'
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )
    } else {
      return null
    }
  }

  if (isEditing) {
    return (
      <ReplyForm
        payloadType={ReplyPayloadType.Edit}
        startingText={replyObject.text}
        replyID={replyObject.id}
        setActive={setIsEditing}
      />
    )
  } else {
    return (
    <div key={replyObject.id} className='box has-background-light has-text-black p-3'>
      <div className='content'>
        <p>
          <strong>{getDisplayName(replyObject.UserId, groupMembers)}</strong>
          &nbsp;&nbsp;
          <small>{dayjs().to(dayjs(replyObject.createdAt))}</small>
          &nbsp;&nbsp;
          {handleEditButton(replyObject.UserId)}
        </p>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
    )
  }
}

export default Reply