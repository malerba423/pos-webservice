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
