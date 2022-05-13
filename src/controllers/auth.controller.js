const { Admin } = require("../../db/models");

const signIn = async (req, res) => {
  const { password, name } = req.body;

  if (password && name) {
    try {
      const currentUser = await Admin.findOne({ where: { name: name } });
      if (currentUser.name === name && currentUser.password === password) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };
        return res.json({
          id: currentUser.id,
          name: currentUser.name,
        });
      } else {
        return res.json({ message: "not valid" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};

const signOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);

    res.clearCookie(req.app.get("cookieName"));

    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    const user = await Admin.findByPk(req.session.user.id);
    return res.json({ id: user.id, userName: user.userName });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const checkIfLoggedIn = async (req, res) => {
  console.log(req.session);
  if (req.session.user.id) {
    const currentUser = await Admin.findByPk(req.session.user.id);
    return res.json({
      id: currentUser?.id,
      name: currentUser?.name,
    });
  } else {
    return res.json({});
  }
};

module.exports = {
  signIn,
  signOut,
  checkAuth,
  checkIfLoggedIn,
};
