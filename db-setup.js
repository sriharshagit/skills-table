var redis = require('redis');
var redisClient = redis.createClient();
redisClient.on('connect',function(cc){
    console.log('db connection established');
    
})



module.exports = {

    insertUpdate :function(collection,key,value){
        return new Promise(function(resolve,reject){
                redisClient.hset(collection,key,JSON.stringify(value),function(err,result){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                })
        })
    },

    getByPrimaryKey : function(collection,key){
        return new Promise (function(resolve,reject){
            redisClient.hget(collection,key,function(err,result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(JSON.parse(result));
                }
            })
        })
    },

    getAllData : function(collection){
        return new Promise (function(resolve,reject){
            redisClient.hgetall(collection,function(err,result){
                if(err){
                    reject(err);
                }
                else{
                    var finalresult = [];
                    for(var prop in result){
                        finalresult.push(JSON.parse(result[prop]))
                    }
                    resolve(finalresult);
                }
            })
        })
    },

   

}