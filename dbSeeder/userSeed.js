require("../dbConfig/config");
const User = require("../models/user");

const saveUser = async () => {
  const newUser = new User({
      email:"albert@gmail.com",
    first_name: "Albert",
    last_name: "Einstein",
    password:"test1",
    status:"active"
  });

  try {
    const result = await newUser.save()
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

saveUser();