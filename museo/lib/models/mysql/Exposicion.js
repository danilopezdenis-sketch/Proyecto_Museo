import { DataTypes } from 'sequelize'
import sequelize from '@/lib/mysql'

const Exposicion = sequelize.define('Exposicion', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo:       { type: DataTypes.STRING(150), allowNull: false },
  descripcion:  { type: DataTypes.TEXT, allowNull: true },
  fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_fin:    { type: DataTypes.DATEONLY, allowNull: true },
  estado:       { type: DataTypes.ENUM('Próxima','Activa','Finalizada'), defaultValue: 'Próxima' },
}, { tableName: 'exposiciones', timestamps: false })

export default Exposicion
