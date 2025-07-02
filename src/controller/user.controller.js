const userModel = require("../models/user.model");
const {
  createHashPassword,
  validateData,
  userRegistrationSchema,
  userLoginSchema,
  compareHashPassword,
  createToken
} = require("../utils/index");

async function register(req, res) {
  try {
    let { status, message } = validateData(userRegistrationSchema, req.body);
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

    const user = await userModel.create({
      name: username,
      email,
      password: await createHashPassword(password),
    });

     const token = createToken({userId : user._id});

    return res
      .status(201)
      .send({ status: true, message: "Registerd successfully", token });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    let { status, message } = validateData(userLoginSchema, req.body);
    if (!status) {
      return res.status(400).send({
        status: false,
        message,
      });
    }

    let { email, password } = req.body;
    let checkEmail = await userModel.findOne({ email });
    if (!checkEmail) {
      return res.status(400).send({
        status: false,
        message: `user with email ${email} not exists please register`,
      });
    }
 
    const validUser = await compareHashPassword(password, checkEmail.password);
    if(!validUser) {
       return res.status(400).send({
         status: false,
        message: `Invalid User credenials`,
       })
    }

    const user = {
      userId : checkEmail._id
    }

    const token = createToken(user);
    
    return res
      .status(201)
      .send({ status: true, message: "Login is successfully", token });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = {
  register,
  loginUser,
};
