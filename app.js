var express=require('express');
var app=express();
var bodyParser = require('body-parser');

var MongoClient=require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/calv1/:num1/:num2',(req,res)=>{
    console.log(req.params);
    res.send(`Addition of ${req.params['num1']} and ${req.params['num2']} is ${parseInt(req.params['num1']) + parseInt(req.params['num2'])}`);
});

app.post('/calv2',(req,res)=>{
   // console.log("Post Functions");
   let custRes={}
    console.log(req.body);
    if(req.body.operations === "+"){
        let num1= req.body.num1;
        let num2= req.body.num2;
        custRes={
            "status":200,
            "value":` Addition of ${req.body.num1} and ${req.body.num2} is ${num1+num2}`
        }
    }
    else{
        custRes={
            "status":400,
            "message":`Operation is not found`
        }
    }
    res.send(custRes);
})



app.post('/registration',(req,res)=>{
    console.log(req.body);
    let emp={
        "empUsername":req.body.empUsername,
        "empPassword":req.body.empPassword,
        "empEmail":req.body.empEmail

    };

    MongoClient.connect('mongodb://localhost:27017/emp',function (err, db) {
        if(err){
            throw err;
        }
        else{
            let custRes={       
            }
            db.collection('employee').insertOne(emp,function(err,result){
                if(err){
                    
                    custRes={
                        "status":400,
                        "error":err
                    }
                }
                else{
                   custRes={
                       "status":200,
                       "result":result
                   }
                    
                }

                res.json(custRes);
            });
           
            //res.send("Database Connected ...!");
        }
    });
   
});


app.get('/employee',(req,res)=>{
     MongoClient.connect('mongodb://localhost:27017/emp',function (err, db) {
        if(err){
            throw err;
        }
        else{
           // db.collection('person').find().toArray(function (err, result) {
            db.collection('employee').find().toArray(function(err,result){
                

                res.json(result);
            });
           
            //res.send("Database Connected ...!");
        }
    });
   
});



app.listen(3001, () => 
console.log('Example app listening on port 3000!'))

