/* eslint-disable import/order */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
const express = require('express');
const randomUUID = require('crypto');
const nodemailer = require('nodemailer');
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'my_db'
// });

// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });
// connection.end();

require('dotenv');
// micro provides http helpers
const { createError, json, send } = require('micro');
// microrouter provides http server routing
//const { router, get, post } = require('microrouter');
// serve-handler serves static assets
const staticHandler = require('serve-handler');
// async-retry will retry failed API requests
const retry = require('async-retry');

const logger = require('./controller/logger');
const { ApiError, client: square } = require('./controller/square');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 7000;

async function createPayment(req, res) {
  const payload = await json(req);
  logger.debug(JSON.stringify(payload));
  await retry(async (bail, attempt) => {
    try {
      logger.debug('Creating payment', { attempt });

      const idempotencyKey = payload.idempotencyKey || nanoid();
      //   const amount = payload.amount * 100;
      const createCustomer = {
        givenName: 'Jong',
        familyName: 'Postnicov',
        address: {
          addressLine1: '1455 Market St',
          addressLine2: 'San Francisco, CA 94103'
        },
        idempotencyKey
      };
      const createCustomerResponse = await square.customersApi.createCustomer(createCustomer);

      const { customer } = createCustomerResponse.result;
      console.log(customer);

      const payment = {
        idempotencyKey,
        locationId: payload.locationId,
        sourceId: payload.sourceId,
        customerId: customer.id,
        // While it's tempting to pass this data from the client
        // Doing so allows bad actor to modify these values
        // Instead, leverage Orders to create an order on the server
        // and pass the Order ID to createPayment rather than raw amounts
        // See Orders documentation: https://developer.squareup.com/docs/orders-api/what-it-does
        amountMoney: {
          // the expected amount is in cents, meaning this is $1.00.
          amount: 4900,
          // If you are a non-US account, you must change the currency to match the country in which
          // you are accepting the payment.
          currency: 'USD'
        }
      };
      if (payload.verificationToken) {
        payment.verificationToken = payload.verificationToken;
      }

      const { result, statusCode } = await square.paymentsApi.createPayment(payment);

      logger.info('Payment succeeded!', { result, statusCode });
      console.log('resultIs:', result, 'statusIs:', statusCode);
      send(res, statusCode, {
        success: true,
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          receiptUrl: result.payment.receiptUrl,
          orderId: result.payment.orderId
        }
      });
    } catch (ex) {
      if (ex instanceof ApiError) {
        logger.error(ex.errors);
        bail(ex);
      } else {
        logger.error(`Error creating payment on attempt ${attempt}: ${ex}`);
        throw ex; // to attempt retry
      }
    }
  });
}

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'topwebdev.0612@gmail.com',
    pass: 'topwebdev061207310321'
  },
  secure: true
});

async function saveBookData(req, res) {
  const payload = await json(req);
  // console.log(payload);
  const { dateOfBooking, personalData, selectedPackage } = payload;
  const serviceType = payload.serviceTypeData.type;

  const text = serviceType;
  // eslint-disable-next-line no-template-curly-in-string
  const html = '<b>Client name: `${personalData.name}`</b><br>Client email: `${personalData.email}</br>`';

  const mailData = {
    from: 'topwebdev.0612@gmail.com',
    to: 'topwebdev.0612@gmail.com',
    subject: selectedPackage ? 'Booking request' : 'Call request',
    text,
    html
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: 'mail send', message_id: info.messageId });
  });

  // res.status(200).send([payload]);
  // await send({
  //   success: true,
  //   data: 'this is response!!!'
  // });
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
  next();
});

app.post('/payment', createPayment);
app.post('/save-bookdata', saveBookData);

app.listen(PORT, () => {
  console.log(`I am running again on port ${PORT}`);
});
