const express = require('express'); // Import express
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    
    res.json(parseReqHeaders(req.headers));
});

function parseReqHeaders(headers){
    var result = {
        ip_address: null,
        language: null,
        operating_system: null
    }

    let langauges = headers["accept-language"].split(',');
    let operatingSystems = headers["user-agent"].split('');
    let tempOS = [];
    let pushValue = false;
    let stopPushing = false;

    for(var i = 0; i < operatingSystems.length; i++){ 

        if(stopPushing){
            break;
        }

        if(operatingSystems[i] == "("){
            pushValue = true;
            i++;
        }else if(operatingSystems[i] == ")"){
            stopPushing = true;
            pushValue = false;
        }

        if(pushValue){
            tempOS.push(operatingSystems[i]);
        }
    }


    result.ip_address = headers["x-forwarded-for"];
    result.language = langauges[0];
    result.operating_system = tempOS.join('');

    return result;
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});