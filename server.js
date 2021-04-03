const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const port = 8000;
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongo.connect(url, { useNewUrlParser: true }, (err, client) => { 
    if (err) {
        console.error(err);
        return;
    }
    const db = client.db('SKILLDB');
    const collection = db.collection('Skills');

    app.post('/insert', async function (req, res) {
        try {
            let data = await checkRequest(req.body.data);
            let dbResult = await collection.insertMany(data);
            for (let i = 0; i < dbResult.ops.length; i++){
                delete dbResult.ops[i]._id
            }
            res.status(200).send(dbResult.ops);

        }
        catch (e) {
            console.log(e);
            if (e == 'invalid request params') {
                res.status(422).send('Invalid parameters Found');
            }
            else {
                res.status(500).send(e);
            }
        }

     })


    app.listen(port, () => console.log(`api app listening on port ${port}!`));
})

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

