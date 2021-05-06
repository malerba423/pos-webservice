const adminRepo = require('./admin-repo');

exports.areWeCurrentlyOpen = async function () {
  return await adminRepo.areWeCurrentlyOpen();
};
