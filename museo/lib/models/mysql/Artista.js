import { DataTypes } from 'sequelize'
import sequelize from '@/lib/mysql'

const Artista = sequelize.define('Artista', {
  id:                 { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:             { type: DataTypes.STRING(100), allowNull: false },
  nacionalidad:       { type: DataTypes.STRING(60), allowNull: false },
  anio_nacimiento:    { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  anio_fallecimiento: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
  biografia:          { type: DataTypes.TEXT, allowNull: true },
  fecha_registro:     { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'artistas', timestamps: false })

export default Artista
