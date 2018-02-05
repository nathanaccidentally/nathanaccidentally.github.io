// Here's an example for pulling data from the GarlicTrader API

function getAPI() {
    const api = "https://nathanaccidentally.us/GarlicTrader/api/getSellerTransactions/getSellerTransactions.json"; // API location.
    var apiResp; // Our response variable.

    fetch(api, {
        method: 'get'
    }).then(function(apiResp) {
        console.log('%c OK ', 'color: green;');

        return apiResp.json();
    }).then(function(apiRespJSON) {
        console.log(apiRespJSON);
    })
}