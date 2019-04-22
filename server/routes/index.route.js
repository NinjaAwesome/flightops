const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const dbRoutes = require('./db.route');
const aircraftRoutes = require('./aircraft.route');
const crewRoutes = require('./crew.route');
const mailRoutes = require('./mail.route');
const chatRoutes = require('./chat.route');
const licenceRoutes = require('./licence.route');
const saleRoutes = require('./sale.route');
const flightRoutes = require('./flight.route');
const routeRoutes = require('./route.route');
const airportRoutes = require('./airport.route');
const handlerRoutes = require('./handler.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/db', dbRoutes);
router.use('/aircraft', aircraftRoutes);
router.use('/crew', crewRoutes);
router.use('/mail', mailRoutes);
router.use('/chat', chatRoutes);
router.use('/licence', licenceRoutes);
router.use('/sale', saleRoutes);
router.use('/flight', flightRoutes);
router.use('/route', routeRoutes);
router.use('/airport', airportRoutes);
router.use('/handler', handlerRoutes);

module.exports = router;
