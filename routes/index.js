import express from 'express';
import registerController from '../controllers/auth/RegisterController';
import loginController from '../controllers/auth/loginController';
import UserController from './../controllers/auth/UserController';
import auth from './../middleware/auth';
import refreshController from './../controllers/auth/refreshController';
import Survey from './../controllers/survey/survey';

const router = express.Router();

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, UserController.me);
router.post('/token', refreshController.refreshTToken);
router.post('/logout', auth, loginController.logout);
router.post('/survey', auth, Survey.addsurvey);
router.put('/survey/:id', auth, Survey.updateSurvey);
router.delete('/survey/:id', auth, Survey.deletesurvey);
router.get('/survey', Survey.all);
router.get('/survey/:id', Survey.getone);
export default router;