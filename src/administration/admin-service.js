const adminRepo = require('./admin-repo');

exports.areWeCurrentlyOpen = async function () {
  return await adminRepo.areWeCurrentlyOpen();
};

exports.getMenu = async function () {
  return await adminRepo.getMenu();
};

exports.updateItem = async function ({ item }) {
  const result = await adminRepo.updateItem({ item });
  return result;
};

exports.updateItemOption = async function ({ option }) {
  const result = await adminRepo.updateItemOption({ option });
  return result;
};

exports.createItem = async function ({ item }) {
  const result = await adminRepo.createItem({ item });
  return result;
};

exports.editItem = async function ({ item }) {
  const result = await adminRepo.editItem({ item });
  return result;
};

exports.createItemOptions = async function ({ optionsArray }) {
  const result = await adminRepo.createItemOptions({ optionsArray });
  return result;
};

exports.openStore = async function () {
  const result = await adminRepo.openStore();
  return result;
};

exports.closeStore = async function () {
  const result = await adminRepo.closeStore();
  return result;
};
