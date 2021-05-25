const express = require('express');
const cors = require('cors');
const babelPolyfill = require('@babel/polyfill');
//const cookieParser = require('cookie-parser');
const handleOrdersRequests = require('./orders/orders-handler');
const stripeRoutes = require('./stripe/stripe-routes');
const elavonRoutes = require('./elavon/elavon-routes');
const ordersRoutes = require('./orders/orders-routes');
const authRoutes = require('./auth/auth-routes');
const adminRoutes = require('./administration/admin-routes');
const { PORT, REACT_WEBAPP_BASE_URL } = require('./config');

const appCorsOptions = {
  origin: REACT_WEBAPP_BASE_URL,
};
const socketCorsOptions = {
  cors: true,
  origins: [REACT_WEBAPP_BASE_URL],
};

const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(appCorsOptions));

app.get('/', (req, res) => res.send('Health check OK'));
app.get('/test', (req, res) => res.send('Health check OK'));
app.use('/stripe', stripeRoutes);
app.use('/elavon', elavonRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/administration', adminRoutes);

//set up server and socket
// const server =
//   NODE_ENV == 'local_development'
//     ? app.listen(PORT, DEV_HOST, () => console.log('Listening on port: ' + PORT))
//     : app.listen(PORT, () => console.log('Listening on port: ' + PORT));
const server = app.listen(PORT, () => console.log('Listening on port: ' + PORT));

const io = require('socket.io')(server, socketCorsOptions);

//this allows us to access io from inside express routes via req.app.get('socketio')
app.set('socketio', io);

//socket handling
io.on('connection', function (socket) {
  console.log('client connected ' + socket.id);

  handleOrdersRequests({ socket, io });

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'local_development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
