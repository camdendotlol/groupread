import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import groupService from '../services/groups'
import postService from '../services/posts'

import {
  Group,
  GroupCreationData,
  Post,
  NewPostObject,
  EditPostObject
} from '../types'

interface GroupState {
  groups: Array<Group>,
  // keep track of which async requests are pending
  // so we can display proper loading screens/animations
  // and differentiate 400-level errors from pending requests
  pending: {
    details: boolean,
    members: boolean,
    posts: boolean,
    creation: boolean,
    newPost: boolean,
    editPost: boolean,
    joinGroup: boolean,
    leaveGroup: boolean
  }
}

// The "group" state is actually an array of all group data from every visited group.
// This way, we cache some data so the user can visit an already-visited group
// without having to wait for loading.
// export type GroupState = Array<Group>

const initialState = {
  pending: {
    details: true,
    members: true,
    posts: true,
    creation: true,
    newPost: true,
    editPost: true,
    joinGroup: true,
    leaveGroup: true
  },
  groups: []
} as GroupState

interface GroupCreationPayload {
  groupObject: GroupCreationData,
  token: string
}

interface NewPostPayload {
  id: string,
  postObject: NewPostObject
}

interface EditPostPayload {
  postID: string,
  postObject: EditPostObject
}

interface MembershipPayload {
  id: string,
  token: string
}

// See comment in ../services/groups.tsx for info about weekObject typing
interface SetSchedulePayload {
  weekObject: unknown,
  groupID: string,
  token: string
}

export const getGroupDetails = createAsyncThunk(
  '/group/groupDetailsStatus',
  async (id: string) => {
    const group = await groupService.getGroupDetails(id)
    return group
  }
)

export const getGroupPosts = createAsyncThunk(
  '/group/groupPostsStatus',
  async (id: string) => {
    try {
      const posts = await groupService.getGroupPosts(id)
      return {
        posts: posts,
        id: id
      }
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const getGroupMembers = createAsyncThunk(
  '/group/groupMembersStatus',
  async (id: string) => {
    try {
      const members = await groupService.getGroupMembers(id)
      return {
        members: members,
        id: id
      }
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const createGroup = createAsyncThunk(
  '/group/createGroupStatus',
  async (payload: GroupCreationPayload) => {
    try {
      const response = await groupService.createGroup(payload.groupObject, payload.token)
      return response
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const newPost = createAsyncThunk(
  '/group/newPostStatus',
  async (payload: NewPostPayload) => {
    try {
      const res = await postService.sendNewPost(payload.id, payload.postObject)
      if (payload.postObject.parent) {
        // legacy behavior because I couldn't figure out how to implement conditional action types
        // ideally this will be rewritten with some RTK-native thing but it works fine now
        return {
          type: 'reply',
          data: res
        }
      } else {
        return {
          type: 'reply',
          data: res
        }
      }
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const editPost = createAsyncThunk(
  '/group/editPostStatus',
  async (payload: EditPostPayload) => {
    try {
      const res = await postService.editPost(payload.postID, payload.postObject)
      return res
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const joinGroup = createAsyncThunk(
  '/group/joinGroupStatus',
  async (payload: MembershipPayload) => {
    try {
      await groupService.joinGroup(payload.id, payload.token)
      const newMemberList = await groupService.getGroupMembers(payload.id)
      return {
        groupID: payload.id,
        members: newMemberList
      }
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const leaveGroup = createAsyncThunk(
  '/group/leaveGroupStatus',
  async (payload: MembershipPayload) => {
    try {
      await groupService.leaveGroup(payload.id, payload.token)
      const newMemberList = await groupService.getGroupMembers(payload.id)
      return {
        groupID: payload.id,
        members: newMemberList
      }
    } catch (e) {
      throw new Error(`${e.message}`)
    }
  }
)

export const setSchedule = createAsyncThunk(
  '/groups/setScheduleStatus',
  async (payload: SetSchedulePayload): Promise<{ groupID: string, posts: Post[] }> => {
    try {
      const res = await groupService.setSchedule(payload.weekObject, payload.groupID, payload.token)
      return {
        groupID: payload.groupID,
        posts: res
      }
    } catch(e) {
      throw new Error(`${e.message}`)
    }
  }
)

const groupSlice = createSlice({
  name: 'groupSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupDetails.pending, (state) => {
      return {
        pending: {
          ...state.pending,
          details: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(getGroupDetails.fulfilled, (state, { payload }) => {
      if (state.groups.find(g => g.id === payload.id)) {
        return {
          pending: {
            ...state.pending,
            details: false
          },
          groups: state.groups
        }
      }
      return state = {
        pending: {
          ...state.pending,
          details: false
        },
        groups: [ ...state.groups, payload ]
      }
    }),
    builder.addCase(getGroupDetails.rejected, (state) => {
      return {
        pending: {
          ...state.pending,
          details: false
        },
        groups: state.groups
      }
    }),
    builder.addCase(getGroupPosts.pending, (state) => {
      return state = {
        pending: {
          ...state.pending,
          posts: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(getGroupPosts.fulfilled, (state, { payload }) => {
      const posts = payload.posts
      const id = payload.id
      return state = {
        pending: {
          ...state.pending,
          posts: false
        },
        groups: state.groups.map(g => g.id === id ? g = { ...g, posts: posts } : g)
      }
    }),
    builder.addCase(getGroupPosts.rejected, (state) => {
      return {
        pending: {
          ...state.pending,
          posts: false
        },
        groups: state.groups
      }
    }),
    builder.addCase(getGroupMembers.pending, (state) => {
      return state = {
        pending: {
          ...state.pending,
          members: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(getGroupMembers.fulfilled, (state, { payload }) => {
      const members = payload.members
      const id = payload.id
      return state = {
        pending: {
          ...state.pending,
          members: false
        },
        groups: state.groups.map(g => g.id === id ? g = { ...g, members: members } : g)
      }
    }),
    builder.addCase(getGroupMembers.rejected, (state) => {
      return {
        pending: {
          ...state.pending,
          members: false
        },
        groups: state.groups
      }
    }),
    builder.addCase(createGroup.pending, (state) => {
      return state = {
        pending: {
          ...state.pending,
          creation: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(createGroup.fulfilled, (state, { payload }) => {
      const group = payload
      return state = {
        pending: {
          ...state.pending,
          creation: false
        },
        groups: [ ...state.groups, group ]
      }
    }),
    builder.addCase(newPost.pending, (state) => {
      return state = {
        pending: {
          ...state.pending,
          newPost: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(newPost.rejected, (_state, { error }) => {
      throw new Error(error.message)
    }),
    builder.addCase(newPost.fulfilled, (state, { payload }) => {
      if (payload.type === 'reply') {
        // New post that will be associated with a parent post
        // The frontend uses nested objects for this
        const groupID = payload.data.GroupId
        const parentID = payload.data.parent
        return state = {
          pending: {
            ...state.pending,
            newPost: false
          },
          groups: state.groups.map(g => {
            if (g.id === groupID) {
              const posts = g.posts.map(p => {
                if (p.id === parentID) {
                  const replies = p.replies ? [ ...p.replies, payload.data ] : [payload.data]
                  return { ...p, replies: replies }
                } else {
                  return p
                }
              })
              return { ...g, posts: posts }
            } else {
              return g
            }
          })
        }
      } else {
        // New top-level post
        const groupID = payload.data.GroupId
        return state = {
          pending: {
            ...state.pending,
            newPost: false
          },
          groups: state.groups.map(g => g.id === groupID ? g = { ...g, posts: [ ...g.posts, payload.data ] } : g)
        }
      }
    }),
    builder.addCase(editPost.pending, (state) => {
      return state = {
        pending: {
          ...state.pending,
          editPost: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      const groupID = payload.GroupId
      const parentID = payload.parent
      const postToEditID = payload.id

      const changeParentPost = (groups: Group[]) => {
        return groups.map((g: Group) => g.id === groupID
          ? g = { ...g, posts: g.posts.map(p => p.id === postToEditID
            ? { ...p, text: payload.text }
            : p
          ) }
          : g
        )
      }

      const changeReplyPost = (groups: Group[]) => {
        return groups.map((g: Group) => g.id === groupID
          ? g = {
            ...g, posts: g.posts.map(p => p.id === parentID
              ? {
                ...p, replies: p.replies.map(r => r.id === postToEditID
                  ? payload
                  : r
                )
              }
              : p
            )
          }
          : g
        )
      }

      // If there's no parent property, then it's a parent post itself.
      // If editing a reply, the request will include a parent property.
      if (!payload.parent) {
        return {
          pending: state.pending,
          groups: changeParentPost(state.groups)
        }
      } else {
        return {
          pending: state.pending,
          groups: changeReplyPost(state.groups)
        }}
    }),
    builder.addCase(editPost.rejected, (state, { error }) => {
      throw new Error(error.message)
    }),
    builder.addCase(joinGroup.pending, (state) => {
      return {
        pending: {
          ...state.pending,
          joinGroup: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(joinGroup.fulfilled, (state, { payload }) => {
      const group = state.groups.find(g => g.id === payload.groupID)
      if (!group) {
        return {
          pending: {
            ...state.pending,
            joinGroup: false
          },
          groups: state.groups
        }
      }
      return {
        pending: {
          ...state.pending,
          joinGroup: false
        },
        groups: state.groups.map(g => g.id === payload.groupID ? g = { ...g, members: payload.members } : g)
      }
    }),
    builder.addCase(leaveGroup.pending, (state) => {
      return state = {
        pending: {
          ...state.pending,
          leaveGroup: true
        },
        groups: state.groups
      }
    }),
    builder.addCase(leaveGroup.fulfilled, (state, { payload }) => {
      const group = state.groups.find(g => g.id === payload.groupID)
      if (!group) {
        return {
          pending: {
            ...state.pending,
            leaveGroup: false
          },
          groups: state.groups
        }
      }
      return {
        pending: {
          ...state.pending,
          leaveGroup: false
        },
        groups: state.groups.map(g => g.id === payload.groupID ? g = { ...g, members: payload.members } : g)
      }
    }),
    builder.addCase(setSchedule.pending, (state) => {
      return {
        pending: state.pending,
        groups: state.groups
      }
    }),
    builder.addCase(setSchedule.rejected, (state, { error }) => {
      throw new Error(error.message)
    }),
    builder.addCase(setSchedule.fulfilled, (state, { payload }) => {
      const groupID = payload.groupID
      const newPosts = payload.posts
      // The backend responds with a complete list of the group's posts, so we can just overwrite the post array
      return state = {
        pending: state.pending,
        groups: state.groups.map(g => g.id === groupID ? g = { ...g, posts: newPosts } : g)
      }
    })
  }
})

export default groupSlice.reducer

export const groupSelector = (state: { groupStore: GroupState }): GroupState => state.groupStore