insuredMine
   - A project to store client and respective policies information in database from xlsx/csv file
   - developed in nodeJs using express framework and mongodb is used as database
   
  
  Development Server
  
    - http://localhost:3000  
    - run nodemon to start the server 
    
   Task assigned
   
       - refer app.js for connectivity to database
       - models/- this directory contains the schema.
       
    Task 1
    1) Create API to upload the attached xlsx/CSV data into Mongodb.
    =>  refer api.route.js
         localhost:3000/api/clients   
         attached file is stored in public/sheets/clientInsuredMine.csv
         
    2) Search API to find policy info with the help of username.
    =>  refer api.route.js
        localhost:3000/api/policyinfo
        in body enter a json object accountname
        {
        	"account_name": "Torie Buchanan & Glenda Ruiz"
        }
        
    3) API to provide aggregated policy by each user.
    => refer api.route.js
        localhost:3000/api/:username
        pass param agentname as username
        
    4) Consider each info as different collection in Mongodb (Agent, User, User's Account, LOB, Carrier, Policy)   
    => refer api.route.js
        localhost:3000/api/infos
        
        will fetch the the client collection and create different collection in Mongodb
               
               
     Task 2: (optional)
     1) Track real time cpu utilisation of the node server and on 70% usage restart the server.
     => still trying
     
     2) Create a post service which takes message, day and time in body parameters and it insert that message into db at that particular day and time. 
     =>  refer api.route.js
         localhost:3000/api/message
         
         pass message, day  and time in body like
        {
        	"message":"customized message",
        	"day":"11-02-2020",
        	"time":"16:29"
        }
        
        explanation- 
            create object of the current date
            match with day and time given  with the current day and time
            if matched assigned the message , day and time to database
            else give a interactive message
            
                       
