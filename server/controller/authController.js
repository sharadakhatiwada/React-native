//Add a login feature which username and password.
//If logged in successfully, return JWT, otherwise, error message.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "hello-secret";
const collectionName = "users";
const { ObjectId } = require("mongodb");

async function login(req, res, next) {
  try {
    let password = req.body.password;
    let email = req.body.email;
    console.log(req.body);
    let person = await req.db
      .collection(collectionName)
      .findOne({ email: email });
    console.log(person);
    if (person) {
      const validPassword = await bcrypt.compare(password, person.password);
      if (validPassword) {
        const token = signToken(person);
        res.send({
          token,
          person: {
            email: person.email,
            fullName: person.fullName,
            address: person.address,
            phoneNumber: person.phoneNumber,
          },
        });
      } else {
        res.status(400).send("Invalid Password!");
      }
    } else {
      res.status(400).send("Invalid Email!!");
    }
  } catch (err) {
    next(err);
  }
}

async function signUp(req, res) {
  const db = req.db;
  const { email } = req.body;
  const person = req.body;
  person._id = new ObjectId();

  const result = await db.collection(collectionName).findOne({ email: email });
  if (result) {
    
    return res.status(403).send("Email already been used !");
  }
  person.password = await bcrypt.hash(person.password, 10);
  await db.collection(collectionName).insertOne(person);

  let token = signToken(person);
  res.send({
    token,
    person: {
      email: person.email,
      fullName: person.fullName,
      address: person.address,
      phoneNumber: person.phoneNumber,
    },
  });
}

function signToken(userObj) {
  const accessToken = jwt.sign(
    { email: userObj.email, fullName: userObj.fullName, _id: userObj._id },
    accessTokenSecret
  );
  return accessToken;
}

function authorize(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, accessTokenSecret, (err, person) => {
      console.log(person);
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }
      req.person = person;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
module.exports = { login, authorize, signUp };
