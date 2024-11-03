const { DataTypes } = require('sequelize');
const sequelize = require('../helpers.js/db.js');

const Submission = sequelize.define('Submission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true, 
});

module.exports = Submission;