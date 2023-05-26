const express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Password123',
    database : 'forms'
  });

var cors =require('cors') 
   
app=express()
app.use(express.json())
app.use(cors())
connection.connect();

app.get('/getall',(req,res)=>{
    connection.query('SELECT * from users where isActive=1;', function (error, results) {
        if (error){
            console.log(error);
        }
        console.log('The solution is: ', results);
        res.json(results)
    
      });
    });

app.post('/insert',(req,res)=>{
        // console.log(req.body,"gfgtt")
        // connection.query(`insert into users (username,email,subjects,message) values ('${req.body.username}','${req.body.email}','${req.body.subjects}','${req.body.message}')`, function (error, results) {
          connection.query('insert into users (username,email,subjects,message) values(?,?,?,?)', [req.body.username,req.body.email,req.body.subjects,req.body.message], function (error, results) {
         if (error) {
        console.log(error);
         }
        res.json(results)
        })
      })
      
    
    

app.put('/update',(req,res)=>{
    
       connection.query('update users set username=?,email=?,subjects=?,message=? where id=?',[req.body.username,req.body.email,req.body.subjects,req.body.message,req.body.id],function (error, results) {
 if (error) {
                console.log(error);       
        }        
        res.json(results)
        });
        
        })

app.put('/delete',(req,res)=>{
    
          connection.query('update users set isActive=? where id=?',[0,req.body.id],function (error, results) {
    if (error) {
                   console.log(error);       
           }        
           res.json(results)
           });
           
           })

// app.get('/get',(req,res)=>{
    
//             connection.query('select * from users',[1,req.body.id],function (error, results) {
//       if (error) {
//                      console.log(error);       
//              }        
//              res.json(results)
//              });
             
//              })

app.listen(3000,()=>{
  console.log("Listening on port 3000");
})  
