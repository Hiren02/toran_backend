export default (sequelize, DataTypes) => {
  return sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId:{
        field: 'userId',
        type: DataTypes.STRING,
      },
      email: {
        field: 'email',
        type: DataTypes.STRING,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING,
      },
      mobile_number: {
        field: 'mobile_number',
        type: DataTypes.STRING,
      },
    },
    {
      schema: 'users',
      timestamps: false,
      underscored: true,
    },
  );
};
