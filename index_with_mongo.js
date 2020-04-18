const request = require('request')
const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let search_query = "gjc"
let regexp = /a class="doc_text2" href="\/Review\/(.*?)"/g;

request.post('http://reyestr.court.gov.ua/', {
  json: {
    "SearchExpression":search_query,
    "UserCourtCode":"",
    "ChairmenName":"",
    "RegNumber":"",
    "RegDateBegin":"",
    "RegDateEnd":"",
    "ImportDateBegin":"",
    "ImportDateEnd":"",
    "CaseNumber":"",
    "Sort":"0",
    "PagingInfo.ItemsPerPage":"25000",
    "Liga":"true"
}
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)

  let matchAll = body.matchAll(regexp);


  mongoClient.connect(function(err, client){
    
    if(err){return console.log(err);}

    const db = client.db("illegal_pornhub_copy");
    const collection = db.collection("hardcore_gay_porn");
    
    for (const number of matchAll) { 
      
      collection.insertOne({'query': search_query, 'url': 'http://reyestr.court.gov.ua/Review/' + number[1]}, function(err, results){
        console.log(results);
      });

      console.log(number[1])
    }
    client.close();
});
})

