const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const handleOrdersRequests = require('./orders/orders-handler');
const stripeRoutes = require('./stripe/stripe-routes');
const { PORT, REACT_WEBAPP_BASE_URL } = require('./config');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: REACT_WEBAPP_BASE_URL,
  }),
);
app.use('/stripe', stripeRoutes);

//set up server and socket
const server = app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});
const io = require('socket.io')(server, {
  cors: true,
  origins: [REACT_WEBAPP_BASE_URL],
});

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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
