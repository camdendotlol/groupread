export interface LoginData {
  username: string,
  password: string
}

export interface RegisterData {
  username: string,
  password: string,
  displayName: string,
  email: string,
}

export interface GroupCreationData {
  bookTitle: string | null,
  bookAuthor: string | null,
  bookYear: number | null,
  bookIsbn: string | null,
  bookPageCount: number | null,
  bookOLID: string | null
}

export interface UserObject {
  username: string,
  displayName: string,
  id: string,
  token: string
}

// What the API returns for other users' info
export interface User {
  id: string,
  displayName: string,
  email: string,
  nameColor: string,
  createdAt: Date,
  updatedAt: Date,
  UserGroups: UserGroups
}

// What non-members can see
export interface NonMemberGroup {
  id: string,
  bookTitle: string,
  bookAuthor: string,
  bookYear: number,
  bookIsbn: string,
  bookOLID: string,
  bookPageCount: number,
  createdAt: Date,
  updatedAt: Date,
  AdminId: string,
  members: Array<User>
}

// Objects for each user showing which groups they're in
export interface UserGroups {
  createdAt: Date,
  updatedAt: Date,
  UserId: string,
  GroupId: string
}

// What members can see
export interface MemberGroup extends NonMemberGroup {
  posts: Array<Post>
}

// For now, parent and reply types are combined
// with null for the optional values
export interface Post {
  id: string,
  text: string,
  createdAt: Date,
  updatedAt: Date,
  GroupId: string,
  UserId: string,
  parent: string | null,
  title: string | null,
  replies: Array<Post> | null
}