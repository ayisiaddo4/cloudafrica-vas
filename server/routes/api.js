'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController'),
    PostServiceController = require('../controllers/postServerController'),
    GroupServiceController = require('../controllers/groupServerController'),
    NodeMailController = require('../controllers/nodeMailer'),
    HubtelServiceController = require('../controllers/hubtelServiceController'),
    SmsRestService = require('../controllers/smsRestService'),
    McUSSDSeviceController = require('../controllers/mcussd.service.controller');


var APIRoutes = function(passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);

    router.post('/mail', NodeMailController.doPost);
    router.post('/mandmail', NodeMailController.sendMandrillMail);
    router.post('/group', GroupServiceController.createGroup);
    router.post('/post', PostServiceController.postContent);

    router.post('/receivemoney', HubtelServiceController.receiveMoney);
    router.post('/sendmoney', HubtelServiceController.sendMoney);
    router.post('/sms', SmsRestService.doPostSms);
    router.post('/smsdelivery', SmsRestService.getDeliveryReport);
    router.post('/callback', HubtelServiceController.callBack);
    router.post('/status', HubtelServiceController.geTranStatus);
    router.post('/refund', HubtelServiceController.refund);
    router.post('/ussdclientresponse', McUSSDSeviceController.ussdCallBack);
    router.post('/ussdaccountcheck', McUSSDSeviceController.acCheck);
    router.post('/ussdendpoint', McUSSDSeviceController.registerEndpoint);

  // GET Routes.
    router.get('/peoples', AuthController.peoples );
    router.get('/people/:id', AuthController.people );

    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    router.get('/groups', GroupServiceController.getAllGroups);
    router.get('/group/:id', GroupServiceController.getGroup);
    router.put('/group/update/:id', GroupServiceController.updateGroup);
    router.delete('/group/remove/:id', GroupServiceController.removeGroup);

    router.get('/posts', PostServiceController.getAllPosts);
    router.get('/post/:id', PostServiceController.getPost);
    router.put('/post/update/:id', PostServiceController.updatePost);
    router.delete('/post/remove/:id', PostServiceController.removePost);

    router.get('/status', HubtelServiceController.geTranStatus);
    router.get('/callback', HubtelServiceController.callBack);
    router.get('/smsdelivery', SmsRestService.getDeliveryReport);
    router.get('/ussdcallback', McUSSDSeviceController.ussdCallBack);
    router.get('/ussdclientresponse', McUSSDSeviceController.ussdCallBack);

  return router;
};

module.exports = APIRoutes;
