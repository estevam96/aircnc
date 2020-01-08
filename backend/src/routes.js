const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardControllers = require('./controllers/DashboardController');
const BookingControllers = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/spots',upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);
routes.post('/spots/:spot_id/bookings', BookingControllers.store);

routes.get('/dashboard', DashboardControllers.show);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejects', RejectController.store);

module.exports = routes;