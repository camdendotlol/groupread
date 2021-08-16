import remark from 'remark'
import html from 'remark-html'
import {
  User
} from '../types'

export const parseMarkdown = async (text: string): Promise<string> => {
  // remark-html sanitizes on its own, no need for another plugin
  const parsedText = await remark()
    .use(html)
    .process(text)

  return parsedText.toString()
}

// TODO: deprecated function, do not use for new stuff
export const getDisplayName = (userID: string, groupMembers: Array<User>): string => {
  const userMatch = groupMembers.find(m => m.id === userID)

  // This condition should never fire, but let's include this just in case!
  if (!userMatch) return 'unknown'

  return userMatch.displayName
}

export default {
  parseMarkdown,
  getDisplayName
}