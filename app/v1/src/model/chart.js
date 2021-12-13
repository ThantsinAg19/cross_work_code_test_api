module.exports = (sequelize,Sequelize) => {
	return Chart = sequelize.define('chart', {
    id: {
      type: Sequelize.INTEGER,
	  autoIncrement: true,
	  primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      validate: {
        min: 1,
        max: 120
      },
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM(['M', 'F', 'Other']),
      allowNull: false,
      defaultValue: 'Other'
    }
  }, {
    timestamps: true,
    tableName: 'chart',
    freezeTableName: true
  })
}