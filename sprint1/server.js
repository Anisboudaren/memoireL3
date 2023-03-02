const mongoose = require("mongoose");
const express = require("express");

const insertion = require("./src/insertion");

mongoose
  .connect("mongodb://localhost/memoire")
  .then(() => console.log("connected"));

const memObject = {
  firstName: "don't care",
  lastName: "don't care too",
  role: "doctor",
  address: {
    city: "khroub",
    street: "1600",
    appartement: "yes",
  },
  phoneNumber: "069857412",
  e_mail: "noonecare@gmail.com",
  speciality: "useless",
  avatar: "avatar.png",
};

async function insert() {
  const res = await insertion(memObject);
  console.log(res);
}
insert();
const app = express();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/html/login.html");
});
app.post("/login", async (req, res) => {
  const r = await findUser(req.email);
  console.log(r);
  if (typeof r === "undefined") res.send({ message: "404 user not found" });
  else res.send({ message: "success you user is " });
});

app.listen(3000, () => {
  console.log("listening at 3000");
});

// member.create({
//   memberID: "69",
//   firstName: "gregorie",
//   lastName: "house",
//   userName: "vicodin",
//   password: "we will hash that shit later",
//   role: "doctor",
//   tasks: ["do that ", "do this"],
//   address: "i think new jersey prinston something",
//   phoneNumber: 69696969,
//   e_mail: "itslate@tired.fr",
//   speciality: "t3 al klawi , blk",
// });
// async function getHim() {
//   housy = await user.findOne({ username: "vicodin" });
//   owny = await member.findById(housy.owner);
//   console.log(owny);
// }
// getHim();

async function findUser(un) {
  await user.find({ username: un }).then((res) => {
    console.log(res);
    return res;
  });
}
