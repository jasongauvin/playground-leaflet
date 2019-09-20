var express = require("express");
//var CachemanMemory = require("cacheman");
//var cache = new CachemanMemory();
var router = express.Router();

// const Provider = require("../../../multicycles-api/api/temp_providers/blinkee/src/index");
// const newInstance = new Provider({
//   timeout: process.env.PROVIDER_TIMEOUT || 3000,
//   datastore: {
//     store: cache,
//     ttl: {
//       vehicles: 2 * 60
//     }
//   },
//   cacheInfo: false,
//   auth: {
//     access_token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5ibGlua2VlLmNpdHkvdjEvYXV0aC9sb2dpbiIsImlhdCI6MTU2ODM2NDYwNSwiZXhwIjoxNTY4MzY4MjA1LCJuYmYiOjE1NjgzNjQ2MDUsImp0aSI6IlY1N0R0VDJ1c0w2S0hxNmoiLCJzdWIiOjQzNzk2OSwicHJ2IjoiNTE4OTllMzZhMGIxMzk2ZmJiNWExZGU3ZGQ1ZjZkYzM3ZjUyZTFiMCJ9.uREic_xTt94sFpmwp29lRBtGGFDx-MXBqjt5knV4BQc`
//   },
//   email: "diwiyet@rich-mail.com",
//   password: "Azertyup123"
// });

// A ajouter au provider sur provider/src/index.js
// cleanCache() {
//   console.log('cacheInfo')
//   this.datastore.store.clear(function(err) {
//     if (err) throw err
//   })
// }

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/", function(req, res) {
  res.send("HELLO home page");
});
// define the moduleGetData route
// router.get("/data", function(req, res) {
//   console.log(req.query);
//   newInstance
//     .getObjects({
//       lat: req.query.lat,
//       lng: req.query.lng,
//       tokenInfo: req.query.tokenInfo
//     })
//     .then(({ body }) => {
//       //console.log(body.data);
//       // console.log("body location : ", body[1].ef76731.position.x);
//       //console.log("v : ", Array.from(body));

//       return body.data.map(v => {
//         const data = {
//           id: Buffer.from(`BLINKEE:SCOOTER:${v.id}`).toString("base64"),
//           lat: v.coordinates.latitude,
//           lng: v.coordinates.longitude,
//           attributes: ["ELECTRIC"],
//           provider: "blinkee"
//         };

//         const blinkeeType = v.canonical_type;
//         data.attributes = [];

//         switch (blinkeeType) {
//           case "scooter":
//             data.type = "MOTORSCOOTER";
//             data.attributes.push("ELECTRIC");
//             data.battery = parseInt(v.details[2].value.split(" "));
//             break;
//           case "roller":
//             data.type = "SCOOTER";
//             data.attributes.push("ELECTRIC");
//             data.battery = parseInt(v.details[2].value.split(" "));
//             break;
//           case "bike_electric":
//             data.type = "BIKE";
//             data.attributes.push("ELECTRIC");
//             break;
//           case "bike":
//             data.type = "BIKE";
//             data.attributes.push("GEARS");
//             break;
//         }
//         return data;
//       });
//     })
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// router.get("/cache", function(req, res) {
//   console.log("/cache", req.query);
//   newInstance
//     .cleanCache({})
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// router.get("/token", function(req, res) {
//   console.log("/token : ", req.query);
//   newInstance
//     .refreshAuth({})
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
module.exports = router;
