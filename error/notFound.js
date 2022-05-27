const pageNotFound = (req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
  });
};

module.exports = pageNotFound;
