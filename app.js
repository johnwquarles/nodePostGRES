var pg = require('pg');
var conString = "postgres://localhost:5432/Northwind";

var client = new pg.Client(conString);
// Object.keys(client).forEach(function(att){console.log(att);});

var clearTable = client.query('DROP TABLE IF EXISTS categoryfavorites', function(err) {if (err) console.log(err);});
var q1 = client.query('CREATE TABLE categoryfavorites(' +
                      '"FavoriteID" SERIAL PRIMARY KEY NOT NULL, ' +
                      '"CategoryID" INTEGER NOT NULL)', function(err) {if (err) console.log(err);}
                     );

q1.on('end', function() {
  console.log("============================");
  console.log("1. Create Table -- Complete ");
  console.log("============================");
});

var q2 = client.query('INSERT INTO categoryfavorites ("CategoryID") VALUES ($1), ($2), ($3), ($4)', [2, 4, 6, 8]);

q2.on('end', function() {
  console.log("===========================");
  console.log("2. Insert Data -- Complete ");
  console.log("===========================");
});

var q3 = categoryDescriptionQuery();

q3.on('row', function(row) {
  console.log(row.FavoriteID + ". " + row.Description.toString());
})

q3.on('end', function() {
  console.log("========================================================");
  console.log("3. Query for Favorite Category Descriptions -- Complete ");
  console.log("========================================================");
});

var q4 =  client.query('UPDATE categoryfavorites ' +
                       'SET "CategoryID" = 5 ' +
                       'WHERE "FavoriteID" = 2');

q4.on('end', function() {
  console.log("================================");
  console.log("4. Update Favorites -- Complete ");
  console.log("================================");
});

var q5 = categoryDescriptionQuery();

q5.on('row', function(row) {
  console.log(row.FavoriteID + ". " + row.Description.toString());
})

q5.on('end', function() {
  console.log("=============================================================");
  console.log("5. Query for Favorite Category Descriptions Redux -- Complete");
  console.log("=============================================================");
});

var q6 = client.query('DELETE FROM categoryfavorites WHERE "FavoriteID" = 3');

q6.on('end', function() {
  console.log("===================================================");
  console.log("6. Delete CategoryFavorites FavoriteID3 -- Complete");
  console.log("===================================================");
});

var q7 = client.query('INSERT INTO categoryfavorites("CategoryID") VALUES (1)');

q7.on('end', function() {
  console.log("=======================================================");
  console.log("7. Inserting Another Row With CategoryID: 1 -- Complete");
  console.log("=======================================================");
});

var q8 = categoryDescriptionQuery();

q8.on('row', function(row) {
  console.log(row.FavoriteID + ". " + row.Description.toString());
})

q8.on('end', function() {
  console.log("================================================================");
  console.log("8. Query for Favorite Category Descriptions Re-Redux -- Complete");
  console.log("================================================================");
});

client.connect();
client.on('drain', client.end.bind(client));



function categoryDescriptionQuery() {
  console.log("FavoriteID, Category Description\n" +
                                     "--------------------------------");
  var query = client.query('SELECT * FROM categoryfavorites ' +
                           'INNER JOIN categories ' +
                           'ON categoryfavorites."CategoryID" = categories."CategoryID"');
  return query;
};
