const ItemModel = require('./Item');
const LaptopModel = require('./Laptop');
const MonitorModel = require('./Monitor');
const PrinterModel = require('./Printer');
const ProjectorModel = require('./Projector');
const ComputerModel = require('./Computer');
const MouseModel = require('./Mouse');
const KeyboardModel = require('./Keyboard');
const SupplierModel = require('./Supplier');
const EmployeeModel = require('./Employee');
const { sequelize } = require('./config');
const SofaModel = require('./sofaModel');
const StatusLogsModel = require('./statusLogs');


const models = {
  Item: ItemModel(sequelize),
  Laptop: LaptopModel(sequelize),
  Monitor: MonitorModel(sequelize),
  Printer: PrinterModel(sequelize),
  Projector: ProjectorModel(sequelize),
  Computer: ComputerModel(sequelize),
  Mouse: MouseModel(sequelize),
  Keyboard: KeyboardModel(sequelize),
  Supplier: SupplierModel(sequelize),
  Employee: EmployeeModel(sequelize),
  StatusLogs : StatusLogsModel(sequelize),
  Sofa : SofaModel(sequelize)
};

// Apply associations (for belongsTo / hasMany)
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

module.exports = { sequelize, models };
