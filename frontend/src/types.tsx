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
  bookPageCount: number,
  bookOLID: string | null
}

export interface UserObject {
  Groups: Group[];
  username: string,
  displayName: string,
  id: string,
  token: string
}

export interface UserState {
  loading: boolean,
  data: UserObject | null
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

export interface Group {
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
  members: Array<User>,
  // posts can be null because non-members can't see a group's posts
  posts: Array<Post>
}

// Objects for each user showing which groups they're in
export interface UserGroups {
  createdAt: Date,
  updatedAt: Date,
  UserId: string,
  GroupId: string
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
  replies: Array<Post>,
  User: UserObject
}

// The data that's sent to the server
// when the user submits the post form
export interface NewPostObject {
  title?: string,
  text: string,
  parent?: string
}

// Can only edit text, not titles/etc
export interface EditPostObject {
  text: string
}

export enum ErrorTypes {
  Unauthorized,
  NotFound,
  NetworkError
}