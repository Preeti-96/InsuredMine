const express = require("express");
const router = express.Router();
const csvTojson = require("csvtojson");

const Client = require('../models/client.model');
const Agent = require('../models/agent.model');
const Carrier = require('../models/carrier.model');
const LOB = require('../models/lob.model');
const Policy = require('../models/policy.model');
const UserAccount = require('../models/user.account.model');
const User = require('../models/user.model');
const Message=require('../models/message.model');

let policyInfo = {
    policy_number: '',
    policy_start_date: '',
    policy_end_date: '',
    policy_category: '',//category_name
    collection_id: '',//agency_id
    user_id: ''//applicant_id
};

// API to store csv file data into database
router.post('/clients', (req, res, next) => {

    //csvToJson is used to convert csv file into JSON format
    csvTojson().fromFile("./public/sheets/clientInsuredMine.csv")
        .then(csvData => {
            //  console.log(csvData);
            for (let i = 0; i < csvData.length; i++) {
                let client = new Client({
                    "agent": csvData[i]['agent'],
                    "userType": csvData[i]['userType'],
                    "policy_mode": csvData[i]['policy_mode'],
                    "producer": csvData[i]['producer'],
                    "policy_number": csvData[i]['policy_number'],
                    "premium_amount_written": csvData[i]['premium_amount_written'],
                    "premium_amount": csvData[i]['premium_amount'],
                    "policy_type": csvData[i]['policy_type'],
                    "company_name": csvData[i]['company_name'],
                    "category_name": csvData[i]['category_name'],
                    "policy_start_date": csvData[i]['policy_start_date'],
                    "policy_end_date": csvData[i]['policy_end_date'],
                    "csr": csvData[i]['csr'],
                    "account_name": csvData[i]['account_name'],
                    "email": csvData[i]['email'],
                    "gender": csvData[i]['gender'],
                    "firstname": csvData[i]['firstname'],
                    "city": csvData[i]['city'],
                    "account_type": csvData[i]['account_type'],
                    "phone": csvData[i]['phone'],
                    "address": csvData[i]['address'],
                    "state": csvData[i]['state'],
                    "zip": csvData[i]['zip'],
                    "dob": csvData[i]['dob'],
                    "primary": csvData[i]['primary'],
                    "Applicant_ID": csvData[i]['Applicant ID'],
                    "agency_ID": csvData[i]['agency_id'],
                    "hasActive_ClientPolicy": csvData[i]['hasActive ClientPolicy']
                });
                // Adding to database
                client.save((err, client) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(client);
                    }
                });
            }
        });
});

// Search API to find policy info with the help of username.
router.get('/policyInfo', (req, res, next) => {
    console.log(req.body.account_name);
    console.log("policy info");
    Client.find({
        account_name: req.body.account_name
    }, (err, clients) => {
        if (err) throw err;
        let policyInfos = [];
        for (let i = 0; i < clients.length; i++) {
            policyInfo.policy_number = clients[i]['policy_number'];
            policyInfo.policy_start_date = clients[i]['policy_start_date'];
            policyInfo.policy_end_date = clients[i]['policy_end_date'];
            policyInfo.policy_category = clients[i]['category_name'];
            policyInfo.collection_id = clients[i]['agency_id'];
            policyInfo.user_id = clients[i]['applicant_id'];
            policyInfos.push(policyInfo);
        }
        res.send(policyInfos)
    })
});

//Consider each info as different collection in Mongodb (Agent, User, User's Account, LOB, Carrier, Policy).
router.get('/infos', (req, res, next) => {
    console.log('infos');
    Client.find((err, clients) => {
        if (err)
            console.log('Error in getting client' + err);
        else {
            console.log(clients);
            for (let i = 0; i < clients.length; i++) {

                // creating agent collection
                let agent = new Agent({
                    "agent_name": clients[i]['agent']
                });
                agent.save((err, agent) => {
                    if (err)
                        console.log("error in creating Agent collection" + err);
                    else
                        console.log(agent);
                });

                //creating user collection
                let user = new User({
                    "firstname": clients[i]['firstname'],
                    "dob": clients[i]['dob'],
                    "address": clients[i]['address'],
                    "phone": clients[i]['phone'],
                    "state": clients[i]['state'],
                    "zip": clients[i]['zip'],
                    "email": clients[i]['email'],
                    "gender": clients[i]['gender'],
                    "userType": clients[i]['userType']
                });
                user.save((err, user) => {
                    if (err)
                        console.log("error in creating User Collection");
                    else
                        console.log(user);
                });
                //creating user's Account collection
                let userAccount = new UserAccount({
                    "account_name": clients[i]['account_name']
                });
                userAccount.save((err, userAccount) => {
                    if (err)
                        console.log('error in creating User Account collection');
                    else
                        console.log(userAccount);
                });

                //creating lob collection
                let lob = new LOB({
                    "category_name": clients[i]['category_name']
                });
                lob.save((err, lob) => {
                    if (err)
                        console.log('error in creating lob collection');
                    else
                        console.log(lob);
                });

                //creating carrier collection
                let carrier = new Carrier({
                    "company_name": clients[i]['company_name']
                });
                carrier.save((err, carrier) => {
                    if (err)
                        console.log('error in creating carrier collection');
                    else {
                        console.log(carrier);
                    }
                });

                //creating policy Info collection
                let policy = new Policy({
                    "policy_number": clients[i]['policy_number'],
                    "policy_start_date": clients[i]['policy_start_date'],
                    "policy_end_date": clients[i]['policy_end_date'],
                    "category_name": clients[i]['category_name'],
                    "agency_ID": clients[i]['agency_ID'],
                    "Applicant_ID": clients[i]['Applicant_ID']
                });
                policy.save((err, policy) => {
                    if (err)
                        console.log(err);
                    else
                        console.log(policy);
                });
            }
        }
    })
});


//API to provide aggregate policy of each user
router.get('/:username', (req, res, next) => {
    Client.find({
        agent: req.params.username
    }, (err, clients) => {
        if (err) throw err;
        res.send(clients);
    })
});

//Create a post service which takes message, day and time in body parameters and it insert that message into db at that particular day and time.
router.post('/message', (req, res, next) => {

    let day = (req.body.day).split('-');
    let time = (req.body.time).split(':');

    let message=new Message({
        "message":req.body.message,
        "day":req.body.day,  // dd-mm-yyyy
        "time":req.body.time //hh:mm:ss
    });


    let date = new Date();
    if (day[0] === ("0" + date.getDate()).slice(-2).toString() && day[1] === ("0" + (date.getMonth() + 1)).slice(-2).toString() && day[2] === date.getFullYear().toString()) {
        if (time[0] === date.getHours().toString() && time[1]=== date.getMinutes().toString() && time[2]===date.getSeconds().toString()){
            console.log('true');
            message.save((err,message)=>{
                if(err)
                    console.log(err);
                else
                   console.log(message);
            })
        }
        else{
            console.log('time mismatch');
        }
    } else {
        console.log('day and time mismatch');
    }
});


// API to delete the client documents.
router.delete('/delete', (req, res, next) => {
    Client.deleteMany((err) => {
        if (err)
            console.log(err);
        else
            console.log('clients deleted');
    });
});

module.exports = router;
