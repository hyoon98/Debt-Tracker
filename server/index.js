const express=require('express');
const app= express();
const mysql=require('mysql');
const cors=require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'DebtTracker'
})

app.post('/transaction/add',(req,res)=>{
    const name=req.body.name;
    const amount=req.body.amount;
    const payReceive=req.body.payReceive;
    const status=req.body.status;
    const description=req.body.description;
    const date=req.body.date;

    db.query('INSERT INTO Transactions (name,amount,payReceive,status,description,date) VALUES (?,?,?,?,?,?)',
        [name,amount,payReceive,status,description,date],(error, result)=> {if (error){console.log(error)} else {res.send("Values Inserted")}}
    );
});

app.listen(3001, ()=>{
    console.log("Running on 3001");
})

app.get('/transaction',(req,res)=>{
    db.query('SELECT *, DATE(date) AS date FROM DebtTracker.Transactions ORDER BY date DESC', (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get('/transaction/outstanding',(req,res)=>{
    db.query('SELECT payReceive, status, SUM(amount) AS outstanding FROM DebtTracker.Transactions WHERE status=\'unpaid\' GROUP BY payReceive, status ORDER BY payReceive ASC', (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put('/transaction/change-status',(req,res)=>{
    const status=req.body.status;
    const id=req.body.transactionID;

    db.query('UPDATE DebtTracker.Transactions SET status=? WHERE transactionID=?',[status,id],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send("Status Changed");
        }
    }
    )
})

app.delete('/transaction/delete/:id',(req,res)=>{
    const id=req.params.id;
    db.query('DELETE from DebtTracker.Transactions WHERE transactionID=?',[id],
    (error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send("Status Changed");
        }
    })
})