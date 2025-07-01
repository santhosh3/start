const { z, ZodError } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const createHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const userRegistrationSchema = z.object({
  username: z.string().trim().min(5),
  email: z.string().email().trim().min(5),
  password: z.string().min(8).trim(),
});

function validateData(schema, data) {
  try {
    schema.parse(data);
    return {
      status: true,
      message: "",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      let errorMessage = "";
      error.errors.forEach((issue) => 
        errorMessage += `${issue.path.join(".")} is ${issue.message},${' '}`,
      );
      return {
        status: false,
        message: errorMessage,
      };
    } else {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}

module.exports = {
  userRegistrationSchema,
  createHashPassword,
  validateData,
};
