const collection = require('./db-setup');
const port = 8000;
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());



const table  = 'Skills'

    app.post('/insert', async function (req, res) {
        try {
            let data = await checkRequest(req.body.data);
            for (let i = 0; i < data.length; i++){
                await collection.insertUpdate(table, data[i].id, data[i]);

            }
            let responseReslut = await collection.getAllData(table);
            console.log(responseReslut)
            res.status(200).send(responseReslut);

        }
        catch (e) {
            console.log(e);

                res.status(500).send(e);
            
        }

     })


    app.listen(port, () => console.log(`api app listening on port ${port}!`));


// input formal in body {"data": [{"id":1,"skill":"react js"},{"id":7,"skill":"node js"},{"id":4,"skill":"laravel js"}]}

async function checkRequest(bodyParams) {
    if (!bodyParams) {
        throw ('invalid request params');
    }
    
    for (let i = 0; i < bodyParams.length; i++){
        if (typeof (bodyParams[i].id) != 'number' && typeof (bodyParams[i].skill != 'string')) {
            throw ('invalid request params');
        }

    }
    
    return bodyParams;
}