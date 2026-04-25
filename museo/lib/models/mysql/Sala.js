import { DataTypes } from 'sequelize'
import sequelize from '@/lib/mysql'

const Sala = sequelize.define('Sala', {
  id:              { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre:          { type: DataTypes.STRING(80), allowNull: false },
  planta:          { type: DataTypes.STRING(20), allowNull: false },
  capacidad_obras: { type: DataTypes.INTEGER, defaultValue: 20 },
  estado:          { type: DataTypes.ENUM('Abierta','Cerrada','En Reforma'), defaultValue: 'Abierta' },
}, { tableName: 'salas', timestamps: false })

export default Sala
