const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user_controller');
const home_controller = require('../controllers/home_controller');
const site_controller = require('../controllers/site_controller');

router.get('/',home_controller.home);

router.get('/app/signUp',user_controller.signUp);
router.post('/app/user',user_controller.register);

router.get('/app/signIn',user_controller.signIn);
router.post('/app/user/auth',user_controller.login);

router.post('/app/signOut',user_controller.signOut);

router.post('/app/sites/:user',site_controller.addWebsite);
router.get('/app/sites/list/:user',site_controller.listOfWebsites); 



module.exports = router;
