const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  // during dev/test our secret keys are accessed via this
  // 
  // in production, we've uploaded the secret keys to the server
  // env manually via eg ssh connection to AWS instance
  require('dotenv').config();
}

// stripe needs its secre key value. so we load stripe AFTER we've loaded
// the key via dotenv (for dev). in prod, it will already be in the env
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// heroku will put the port number at PORT env variable, 
// otherwise hardcode the value to be 5000
const port = process.env.PORT || 5000;

// process any requests body parts into JSON
app.use(bodyParser.json());

// make sure the url string we get, or pass out,
// are properly parsed. ie no spaces in url string
app.use(bodyParser.urlencoded({ extended: true }));

// allow different origins
// eg hosting a server on google. if another website makes
// a request from a different origin, say amazon, then
// by default a server will drop the request.
// if you allow your app to use cors, then these types
// of requests will be allowed by the google server.
//
// cors also applies to making requests from localhost client
// to localhost server which will be on different *ports*.
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // for any url the user hits
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('server running on port ' + port);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  stripe.charges.create(body, (stripeErr, stripeResponse) => {
    if (stripeErr) {
      console.log('STRIPE ERROR')
      console.log(stripeErr)
      res.status(500).send({ error: stripeErr });
    } else {
      console.log('STRIPE SUCCESS')
      res.status(200).send({ success: stripeResponse });
    }
  });
});
