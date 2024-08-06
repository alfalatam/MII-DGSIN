BASE_API = "/api/v1";


//TODO Añadir enlace a postman


var initialChamps = [
    {
      "Name": "Aatrox",
      "Class": "Fighter",
      "Role": "TOP",
      "Tier": "S",
      "Score": 58.73,
      "Trend": -31.86,
      "WinP": 47.68,
      "RoleP": 91.63,
      "PickP": 6.62,
      "BanP": 11.98,
      "KDA": 1.86
    },
    {
      "Name": "Ahri",
      "Class": "Mage",
      "Role": "MID",
      "Tier": "S",
      "Score": 57.18,
      "Trend": 4.55,
      "WinP": 49.50,
      "RoleP": 94.65,
      "PickP": 5.81,
      "BanP": 1.73,
      "KDA": 2.35
    },
    {
      "Name": "Akali",
      "Class": "Assassin",
      "Role": "MID",
      "Tier": "S",
      "Score": 65.49,
      "Trend": 4.33,
      "WinP": 48.41,
      "RoleP": 75.74,
      "PickP": 8.11,
      "BanP": 13.02,
      "KDA": 2.63
    },
    {
      "Name": "Akali",
      "Class": "Assassin",
      "Role": "TOP",
      "Tier": "C",
      "Score": 39.63,
      "Trend": -1.51,
      "WinP": 45.92,
      "RoleP": 23.50,
      "PickP": 2.55,
      "BanP": 13.02,
      "KDA": 1.28
    },
    {
      "Name": "Akshan",
      "Class": "Marksman",
      "Role": "MID",
      "Tier": "A",
      "Score": 49.39,
      "Trend": 0.34,
      "WinP": 51.62,
      "RoleP": 66.03,
      "PickP": 2.75,
      "BanP": 3.79,
      "KDA": 2.12
    },
    {
      "Name": "Caitlyn",
      "Class": "Marksman",
      "Role": "ADC",
      "Tier": "S",
      "Score": 58.92,
      "Trend": 0.73,
      "WinP": 51.92,
      "RoleP": 33.11,
      "PickP": 14.56,
      "BanP": 4.87,
      "KDA": 3.02
    },
    {
      "Name": "Braum",
      "Class": "Support",
      "Role": "SUPPORT",
      "Tier": "A",
      "Score": 51.37,
      "Trend": -0.21,
      "WinP": 50.57,
      "RoleP": 13.82,
      "PickP": 6.41,
      "BanP": 1.98,
      "KDA": 2.99
    },
    {
      "Name": "Olaf",
      "Class": "Fighter",
      "Role": "JUNGLE",
      "Tier": "S",
      "Score": 59.73,
      "Trend": -1.91,
      "WinP": 52.15,
      "RoleP": 14.64,
      "PickP": 7.95,
      "BanP": 10.23,
      "KDA": 2.81
    },
    {
      "Name": "Thresh",
      "Class": "Support",
      "Role": "SUPPORT",
      "Tier": "S",
      "Score": 60.15,
      "Trend": 2.43,
      "WinP": 51.87,
      "RoleP": 19.93,
      "PickP": 7.14,
      "BanP": 3.77,
      "KDA": 2.95
    },
    {
      "Name": "Lulu",
      "Class": "Support",
      "Role": "SUPPORT",
      "Tier": "A",
      "Score": 52.68,
      "Trend": -0.93,
      "WinP": 50.59,
      "RoleP": 20.02,
      "PickP": 4.98,
      "BanP": 2.36,
      "KDA": 3.08
    },
    {
      "Name": "Pyke",
      "Class": "Fighter",
      "Role": "JUNGLE",
      "Tier": "S",
      "Score": 63.12,
      "Trend": 2.05,
      "WinP": 50.92,
      "RoleP": 34.88,
      "PickP": 17.26,
      "BanP": 8.67,
      "KDA": 2.97
    },
    {
      "Name": "Jinx",
      "Class": "Marksman",
      "Role": "ADC",
      "Tier": "S",
      "Score": 58.73,
      "Trend": 0.91,
      "WinP": 51.29,
      "RoleP": 28.45,
      "PickP": 11.76,
      "BanP": 5.12,
      "KDA": 3.25
    }
  ];
    


module.exports.register = function (app,db){

    //===============modulo de mongoDB==========================
    var MongoClient = require('mongodb').MongoClient;
    const mdbURL = process.env.MONGODB_CONN || "mongodb://localhost:27017";
    var db;

    MongoClient.connect(mdbURL, (err, client) => {
        if (err) {
            console.error("DB connection error: " + err);
            process.exit(1);
        } else {
            db = client.db("dgsin2223-05").collection("lol-champs");
            console.log('Ha entrado en la base de datos')
            db.find({}).toArray((err, contacts) => {
                if (err) {
                    console.error("Error getting data from DB: " + err);
                } else if (contacts.length == 0) {
                    console.info("Adding initial contacts to empty DB");
                    console.info("Added "+ initialChamps.length + " champs")
                    db.insert(initialChamps);
                } else {
                    console.info("Connected to the DB with " + contacts.length + " contacts");
                }
            });
        }
    });

 
// Test POSTMAN
app.get(BASE_API + "/champs/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/27553404/2s946eAYw4');
});  

//GET initial champs
app.get(BASE_API + "/champs/loadInitialData", (req, res) => {
    console.log("New GET request to get loadInitialData");  
        db.find({}).toArray((err, champs)  => {
            if (err) {
                console.error("Error getting data from DB: " + err);
                res.sendStatus(500); // internal server error
            } else if (champs.length === 0) {
                console.info("Adding initial champs to empty DB");
                db.insertMany(initialChamps);
                console.info("champs added");
                res.send(initialChamps);
            } else {
                console.info("Connected to the DB with " + champs.length + " champs");
                res.status(200);
                res.send(champs);
                
            }
        });    
});
  
// GET a collection
app.get(BASE_API + "/champs", (req, res) => {
        console.info("New GET request to /champs");
        db.find({}).toArray((err, data) => {
            if (err) {
                console.error("Error getting data from DB: " + err);
                res.sendStatus(500);
            } else {
                var formattedData = formatData(data);
                //console.debug("Sending champs: " + JSON.stringify(formattedData, null, 2));
                console.debug("Sending champs....");
                res.send(formattedData);
            }
        });
});

app.get(BASE_API + "/champs/:name", (req, res) => {
        var name = req.params.name;
        var name = name.charAt(0).toUpperCase() + name.slice(1);
        console.log(name);
        if (!name) {
            console.warn("New GET request to /champs/:name without name, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info("New GET request to /champs/" + name);
            db.find({ "Name": name }).toArray((err, filteredChamps) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    console.log(filteredChamps);

                    if (filteredChamps.length > 0) {
                        var contact = formatData(filteredChamps); //A champ can be in multiples positions
                        console.debug("Sending champ: " + JSON.stringify(contact, null, 2));
                        res.send(contact);
                    } else {
                        console.warn("There are not any champ with name " + name);
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
});

// GET a specific resource
app.get(BASE_API + "/champs/:name/:role", (req, res) => {
        var name = req.params.name;
        var name = name.charAt(0).toUpperCase() + name.slice(1);
        var role = req.params.role.toUpperCase();
        if (!name || !role) {
            console.warn("New GET request to /champs/:role without name or role, sending 400...");
            res.sendStatus(400); // bad request
        } else {
            console.info("New GET request to /champ:" + name +' '+ role);
            db.find({ "Name": name , "Role": role }).toArray((err, filteredChamps) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {

                    if (filteredChamps.length > 0) {
                        var champ = formatData(filteredChamps)[0];
                        // var champ = formatData(filteredChamps); //A champ can be in multiples positions
                        console.debug("Sending champ: " + JSON.stringify(champ, null, 2));
                        res.send(champ);
                    } else {
                        console.warn("There are not any champ with name " + name);
                        res.sendStatus(404); // not found
                    }


                }
            });
        }
});

// POST over a collection
app.post(BASE_API + "/champs", (req, res) => {
    var newChamp = req.body;
    if (!newChamp) {
        console.warn("New POST request to /champs/ without champ, sending 400...");
        res.sendStatus(400); //bad request
    } else {
        console.info("New POST request to /champs with body: " + JSON.stringify(newChamp, null, 2));

        if (!newChamp.Name || !newChamp.Class || !newChamp.Role || !newChamp.Tier || newChamp.Score === undefined || newChamp.Trend === undefined || newChamp.WinP === undefined || newChamp.RoleP === undefined || newChamp.PickP === undefined || newChamp.BanP === undefined || newChamp.KDA === undefined) {
            // if (!newChamp.Name || !newChamp.Class || !newChamp.Role ) {

        console.warn("The champ " + JSON.stringify(newChamp, null, 2) + " is not well-formed, sending 422...");
            res.sendStatus(422); // unprocessable entity
        } else {
            db.find({ "Name": newChamp.Name ,"Role": newChamp.Role }).toArray((err, champs) => {
                if (err) {
                    console.error("Error getting data from DB: " + err);
                    res.sendStatus(500);
                } else {
                    if (champs.length > 0) {
                        console.warn("The champ " + JSON.stringify(newChamp, null, 2) + " already exists in that position, sending 409...");
                        res.sendStatus(409); // conflict
                    } else {
                        console.debug("Adding champ " + JSON.stringify(newChamp, null, 2));
                        db.insert(newChamp);
                        res.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//PUT over a single resource
app.put(BASE_API + "/champs/:name/:role", (req, res) => {

    var name = req.params.name;
    var role = req.params.role.toUpperCase();
    var updatedChamp = req.body;

    // console.log('Los valores son :'+name+' '+role);
    if (name !=updatedChamp.Name || role != updatedChamp.Role) {
        console.warn("New PUT request to /champs/:name/:role without name or role, sending 400...");
        res.sendStatus(400); // bad request
    } else if (!updatedChamp) {
        console.warn("New PUT request to /champs/ without champ, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.info("New PUT request to /champs/" + name + "/" + role + " with data " + JSON.stringify(updatedChamp, null, 2));

        // if (!updatedChamp.Name || !updatedChamp.Class || !updatedChamp.Role || !updatedChamp.Tier || updatedChamp.Score === undefined || updatedChamp.Trend === undefined || updatedChamp.WinP === undefined || updatedChamp.RoleP === undefined || updatedChamp.PickP === undefined || updatedChamp.BanP === undefined || updatedChamp === undefined ) {
        if (!updatedChamp.Name || !updatedChamp.Class || !updatedChamp.Role || !updatedChamp.Tier || updatedChamp.Score === undefined || updatedChamp.Trend === undefined || updatedChamp.WinP === undefined || updatedChamp.RoleP === undefined || updatedChamp.PickP === undefined || updatedChamp.BanP === undefined || updatedChamp.KDA === undefined || updatedChamp.WinP < 0 || updatedChamp.WinP > 100 || updatedChamp.RoleP < 0 || updatedChamp.RoleP > 100 || updatedChamp.PickP < 0 || updatedChamp.PickP > 100 || updatedChamp.BanP < 0 || updatedChamp.BanP > 100) {
        console.warn("The champ -> " + JSON.stringify(updatedChamp, null, 2) + " is not well-formed somehow, sending 422...");
            res.sendStatus(422); // unprocessable entity
        } 

        else {
            console.log('Buscando...');
            db.find({ "Name": name, "Role": role }).toArray((err, champs) => {
                if (err) {
                    console.error('Error getting data from DB');
                    res.sendStatus(500); // internal server error
                } else {
                    if (champs.length > 0) {
                        console.log('Encontrado');
                        db.replaceOne({ "Name": name, "Role": role }, updatedChamp, (err, result) => {
                            if (err) {
                                console.error('Error updating champ in DB');
                                console.log(err);
                                res.sendStatus(500); // internal server error
                            } else {
                                console.debug("Modifying champ with name " + name + " and role " + role + " with data " + JSON.stringify(updatedChamp, null, 2));
                                res.status(200);
                                res.send(updatedChamp); // return the updated champ
                            }
                        });
                    } else {
                        console.warn("There are no champs with name " + name + " and role " + role);
                        res.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});

// POST a specific resource
app.post(BASE_API + "/champs/:name/:role", (req, res) => {
    var name = req.params.name;
    console.warn("New POST request to /champs/name " + name + ", sending 405...");
    res.sendStatus(405); // method not allowed
});

// PUT over a collection
app.put(BASE_API + "/champs", (req, res) => {
    console.warn("New PUT request to /champs, sending 405-...");
    res.sendStatus(405); // method not allowed
});

// DELETE all champs
app.delete(BASE_API + "/champs", (req, res) => {
    console.info("New DELETE request to /champs");
    db.remove({}, { multi: true }, (err, result) => {
        if (err) {
            console.error('Error removing data from DB');
            res.sendStatus(500); // internal server error
        } else {
            console.log("Champs removed");
            console.log(result);
            var numRemoved = result.n;
            if (numRemoved === 0) {
                console.warn("There are no champs to delete");
                res.sendStatus(404); // not found
            } else {
                console.debug("All the champs have been succesfully deleted, sending 204...");
                res.sendStatus(204); // no content
            }
        }
    });
});

// DELETE a specific resource
app.delete(BASE_API + "/champs/:name/:role", (req, res) => {
    var name = req.params.name;
    var role = req.params.role.toUpperCase();
    if (!name) {
        console.warn("New DELETE request to /champs/:name/:role without name and role, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.info("New DELETE request to " + name + "and Role" + role);
        db.deleteOne({ "Name": name , "Role": role }, {}, function (err, result) {
            if (err) {
                console.error('Error removing data from DB');
                res.sendStatus(500); // internal server error
            } else {
                var numRemoved = result.deletedCount;
                console.debug("Champion in that position removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.debug("The Champion with name " + name + "and role "+role+" has been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                } else {
                    console.warn("There are no champs to delete");
                    res.sendStatus(404); // not found
                }
            }
        });
    }
});

//Delete a champ in all roles
app.delete(BASE_API + "/champs/:name", (req, res) => {
    var name = req.params.name;
    if (!name) {
        console.warn("New DELETE request to /champs/:name without name, sending 400...");
        res.sendStatus(400); // bad request
    } else {
        console.info("New DELETE request to " + name);
        db.deleteMany({ "Name": name  }, {}, function (err, result) {
            if (err) {
                console.error('Error removing data from DB');
                res.sendStatus(500); // internal server error
            } else {
                var numRemoved = result.deletedCount;
                console.debug("Champion removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.debug("The Champion with name " + name +" has been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content
                } else {
                    console.warn("There are no champs to delete");
                    res.sendStatus(404); // not found
                }
            }
        });
    }
});


  



    function formatData (data) {
        return data.map((data1) => {
            delete data1._id // removes the property
            return data1;
        });
    }

};


