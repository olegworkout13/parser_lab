
const request = require('request')

let search_query = "gjc"

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
  let regexp = /a class="doc_text2" href="\/Review\/(.*?)"/g;

  let matchAll = body.matchAll(regexp);

  for (const iterator of matchAll) { console.log(iterator[1])  }

})

