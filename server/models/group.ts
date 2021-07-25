import {
  Association,
  DataTypes,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
  BelongsToManyGetAssociationsMixin
} from 'sequelize'
import User from './user'
import Post from './post'
import getPool from '../utils/db'

const db = getPool()

interface GroupAttributes {
  id: string,
  bookTitle: string,
  bookAuthor: string,
  bookYear: number,
  bookIsbn: string,
  bookOLID: string,
  bookPageCount: number,
  AdminId: string
}

type GroupCreationAttributes = Optional<GroupAttributes, 'id' | 'bookAuthor' | 'bookYear' | 'bookIsbn' | 'bookOLID'>

class Group extends Model<GroupAttributes, GroupCreationAttributes>
  implements GroupAttributes {
  public id!: string
  public bookTitle!: string
  public bookAuthor!: string
  public bookYear!: number
  public bookIsbn!: string
  public bookOLID!: string
  public bookPageCount!: number
  public AdminId!: string

  public createdAt!: Date
  public updatedAt!: Date

  public getUsers!: BelongsToManyGetAssociationsMixin<User>
  public getPosts!: HasManyGetAssociationsMixin<Post>

  public readonly members?: User[]
  public readonly posts?: Post[]

  public static associations: {
    members: Association<User, Group>
    posts: Association<Post, Group>
  }
}

Group.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bookAuthor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bookYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bookIsbn: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    bookOLID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bookPageCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AdminId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'Groups',
    sequelize: db
  }
)

export default Group