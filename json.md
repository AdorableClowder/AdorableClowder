// POST path/signup
{
  "username": "austin",
  "password": 1234,
  "offer": ["yoga", "cooking"],
  "want": ["angular"],
  "email": "austin@gmail.com"
}

//RESPONSE from above:
//reroute to /explore and...
//return jwt token +
{
  "id": 1,
  "username": "austin",
  "offer": ["yoga", "cooking"],
  "want": ["angular"],
  "email": "austin@gmail.com"
}

// POST path/login
{
  "username": "austin",
  "password": 1234
}

//RESPONSE from above:
//if login success:
  //return jwt token +
  {
    "id": 1,
    "username": "austin",
    "offer": ["yoga", "cooking"],
    "want": ["angular"],
    "email": "austin@gmail.com"
  }
  //then reroute to /explore
//if login fail:
  //return error
  //reroute to signin again

//GET path/logout:
//destroy token
//reroute to signin

// json response for GET path/explore
[{
    "id": 1,
    "username": "austin",
    "offer": ["yoga", "cooking"],
    "want": ["angular"],
    "email": "austin@gmail.com"
  },{
    "id": 2,
    "username": "sarah",
    "offer": ["backbone", "angular"],
    "want": ["yoga"],
    "email": "sarah@me.com"
}]

//POST path/users/id/connect
  //show particular user data from above

// PUT path/users/:user_id
//beyond MMVP scope
