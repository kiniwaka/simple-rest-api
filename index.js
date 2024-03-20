var fs = require("fs");
const path = "users.json";
let users = JSON.parse(fs.readFileSync(path)).users;
let currentMax = users.length;
var util = require("./utility");
const express = require('express');
const http = require('http');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/test', (req, res) => {
  console.log(req.query.name)
  res.json("ok");
});

app.get('/api/user/', (req, res) => {
    if(Object.keys(req.query).length !== 0){
      //console.log(req.query.name)
      let fnMatch = []
      let name = req.query.name;
      //console.log(users.users)
      for (let i = 0; i < users.length; i++){
        //console.log(users);
        if(users[i].firstName.toLowerCase() == name.toLowerCase()){
          fnMatch.push(users[i]);
        }
      }
      res.send(JSON.stringify(fnMatch));
    }
    else{
      res.send(users);
      console.log("req")
    }
   
});

app.get('/api/user/:id', (req, res) => {
    res.send(util.findUser(req.params.id, users) === undefined ? "invalid id" : util.findUser(req.params.id, users));
});

app.post('/api/user/', (req, res) => {
    const aUser  = {
        id: currentMax+1,
        firstName:	req.body.firstName,
        lastName:	req.body.lastName,
        maidenName:	req.body.maidenName,
        age:        req.body.age,
        gender:	    req.body.gender,
        email:	    req.body.email,
        phone:	    req.body.phone,
        username:	req.body.username,
        password:	req.body.password,
        birthDate:	req.body.birthDate,
        image:  	req.body.image,
        bloodGroup:	req.body.bloodGroup,
        height: 	req.body.height,
        weight:  	req.body.weight,
        eyeColor:   req.body.eyeColor,
        hair: {
            color:	req.body.hair.color,
            type:	req.body.hair.type
        },	 
        domain:	    req.body.domain,
        ip:         req.body.ip,
        address: {
            address: req.body.address.address,
            city:    req.body.address.city,
            coordinates: {
                lat: req.body.address.coordinates.lat,
                lng: req.body.address.coordinates.lng
            },
            postalCode: req.body.address.postalCode,
            state:      req.body.address.state
        },
        macAddress:	req.body.macAddress,
        university:	req.body.university,
        bank: {	
            cardExpire:	req.body.bank.cardExpire,
            cardNumber:	req.body.bank.cardNumber,
            cardType:   req.body.bank.cardType,
            currency:   req.body.bank.currency,
            iban:       req.body.bank.iban
        },
        company: {
            address: {
                address:    req.body.company.address.address,
                city:       req.body.company.address.city,
                coordinates:{ 
                    lat:	req.body.company.address.coordinates.lat,
                    lng:    req.body.company.address.coordinates.lng
                },
                postalCode:	req.body.company.address.postalCode,
                state:      req.body.company.address.state
            },
            department: req.body.company.department,
            name:       req.body.company.name,
            title:      req.body.company.title
        },
        ein:	req.body.ein,
        ssn:    req.body.ssn,
        userAgent: req.body.userAgent
    };
    currentMax = currentMax+1;
    console.log("adding user");
    console.log(aUser); 
    users.users.push(aUser)
    console.log(users.users)
    res.send(aUser)
});
app.put("/api/user/:id", (req, res) => {
    const aUser  = {
        id: parseInt(req.params.id),
        firstName:	req.body.firstName,
        lastName:	req.body.lastName,
        maidenName:	req.body.maidenName,
        age:        req.body.age,
        gender:	    req.body.gender,
        email:	    req.body.email,
        phone:	    req.body.phone,
        username:	req.body.username,
        password:	req.body.password,
        birthDate:	req.body.birthDate,
        image:  	req.body.image,
        bloodGroup:	req.body.bloodGroup,
        height: 	req.body.height,
        weight:  	req.body.weight,
        eyeColor:   req.body.eyeColor,
        hair: {
            color:	req.body.hair.color,
            type:	req.body.hair.type
        },	 
        domain:	    req.body.domain,
        ip:         req.body.ip,
        address: {
            address: req.body.address.address,
            city:    req.body.address.city,
            coordinates: {
                lat: req.body.address.coordinates.lat,
                lng: req.body.address.coordinates.lng
            },
            postalCode: req.body.address.postalCode,
            state:      req.body.address.state
        },
        macAddress:	req.body.macAddress,
        university:	req.body.university,
        bank: {	
            cardExpire:	req.body.bank.cardExpire,
            cardNumber:	req.body.bank.cardNumber,
            cardType:   req.body.bank.cardType,
            currency:   req.body.bank.currency,
            iban:       req.body.bank.iban
        },
        company: {
            address: {
                address:    req.body.company.address.address,
                city:       req.body.company.address.city,
                coordinates:{ 
                    lat:	req.body.company.address.coordinates.lat,
                    lng:    req.body.company.address.coordinates.lng
                },
                postalCode:	req.body.company.address.postalCode,
                state:      req.body.company.address.state
            },
            department: req.body.company.department,
            name:       req.body.company.name,
            title:      req.body.company.title
        },
        ein:	req.body.ein,
        ssn:    req.body.ssn,
        userAgent: req.body.userAgent
    };
    let i = util.findUserIndex(req.params.id, users)
    users.users[i] = aUser;
    console.log("updated user: ")
    console.log(users.users[i]);
    res.send(users.users[i])
});
app.delete('/api/user/:id', (req, res)=>{
    let i = util.findUserIndex(req.params.id, users)
    if (i !== undefined){
        console.log("deleting user: ");
        let delUser = users.users[i];
        console.log(delUser);
        users.users.splice(i, 1);
        res.send(delUser);
    }
    else{
        res.send("invalid id");
    }
});
app.listen(3000, () => console.log('listening'));




