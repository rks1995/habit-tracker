const dashboardController = (req, res) => {
  res.render('dashboard', {
    title: 'Dahsboard',
    user: req.user,
  });
};

module.exports = {
  dashboardController,
};
