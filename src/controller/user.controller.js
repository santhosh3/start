const userModel = require("../models/user.model");
const { createHashPassword, validateData, userRegistrationSchema} = require("../utils/index");

async function register(req, res) {
  try {
    let { status, message } = validateData(userRegistrationSchema,req.body);
    if (!status) {
      return res.status(400).send({
        status: false,
        message,
      });
    }
    let { username, email, password } = req.body;
    let checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).send({
        status: false,
        message: `user with email ${email} already exists please login`,
      });
    }

      await userModel.create({
      name: username,
      email,
      password: await createHashPassword(password),
    });

    return res
      .status(201)
      .send({ status: true, message: "Registerd successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = {
  register,
};
