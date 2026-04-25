import { DataTypes } from 'sequelize'
import sequelize from '@/lib/mysql'
import Artista from './Artista'
import Sala from './Sala'
import Exposicion from './Exposicion'

const Obra = sequelize.define('Obra', {
  id:                { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_artista:        { type: DataTypes.INTEGER, allowNull: false },
  id_sala:           { type: DataTypes.INTEGER, allowNull: true },
  id_exposicion:     { type: DataTypes.INTEGER, allowNull: true },
  titulo:            { type: DataTypes.STRING(200), allowNull: false },
  imagen_url:        { type: DataTypes.STRING(500), allowNull: true },
  anio_creacion:     { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
  tecnica:           { type: DataTypes.STRING(100), allowNull: true },
  dimensiones:       { type: DataTypes.STRING(80), allowNull: true },
  estado:            { type: DataTypes.ENUM('Expuesta','En Depósito','En Restauración','Prestada'), defaultValue: 'En Depósito' },
  descripcion:       { type: DataTypes.TEXT, allowNull: true },
  fecha_adquisicion: { type: DataTypes.DATEONLY, allowNull: true },
}, { tableName: 'obras', timestamps: false })

Obra.belongsTo(Artista,    { foreignKey: 'id_artista',    as: 'artista' })
Obra.belongsTo(Sala,       { foreignKey: 'id_sala',        as: 'sala' })
Obra.belongsTo(Exposicion, { foreignKey: 'id_exposicion',  as: 'exposicion' })
Artista.hasMany(Obra,      { foreignKey: 'id_artista',    as: 'obras' })

export default Obra