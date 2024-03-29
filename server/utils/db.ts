import { Sequelize } from 'sequelize'
import config from './config'

let sequelize: Sequelize

const getPool = (): Sequelize => {
  if (sequelize) return sequelize

  sequelize = new Sequelize(config.DB_URL)

  return sequelize
}

export default getPool