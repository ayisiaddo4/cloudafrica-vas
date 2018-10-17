'use strict';
var config = require('../config'),
    request = require('request'),
    db = require('../models/database'),
    logger = require("./logger"),
    utils = require("../utils/utils"),
    locallydb = require('locallydb'),
    db = new locallydb('../models'),
    collection = db.collection('monsters'),
    // smpp = require('smpp'),
    // session = new smpp.Session({ host: '54.163.215.114', port: 1817 }),
    MCSmpp = {};

// Step 2: Bind Transceiver
// MCSmpp.doSmpp = function(req, res) {
//     console.log('call doSmpp ...');
//     session.bind_transceiver({
//         system_id: 'CldAfr1',
//         password: 'C1D2A3f4'
//     }, function(pdu) {
//         console.log('pdu', pdu);
//         if (pdu.command_status == 0) {
//             // Successfully bound
//             console.log('checking success for pdu')
//             session.submit_sm({
//                 destination_addr: '233552492165',
//                 short_message: 'Hello!'
//             }, function(pdu) {
//                 if (pdu.command_status == 0) {

//                     // Message successfully sent
//                     console.log('packet data unit id >>>',pdu);
//                     res.send({ pdu: pdu })
//                 }
//             });
//         }
//     });

// }

// module.exports = MCSmpp;