const createTable = require('../cliTable');

module.exports = (tableHeaders, tableRows) => {
  const table = createTable(tableHeaders);

  tableRows.forEach(tableRow => table.push(tableRow));

  return table.toString();
}
