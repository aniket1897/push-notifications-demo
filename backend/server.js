const express = require('express');
const bodyParser = require('body-parser'); 
const webpush = require('web-push');
const { vapidKeys } = require("../config/keys");
const app = express();
const PORT = process.env.PORT ?? 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
let subscriptionDb = {subscription: null};

webpush.setVapidDetails(
  'mailto:paianiket5@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const addSubscriptionToDb = function(subscription){
  subscriptionDb.subscription = subscription;
} 

app.post('/save-subscription', function(req,res) {
  const subscription = req.body;
  addSubscriptionToDb(subscription);
  res.json({message:'Subscription added to DB'});
});

const sendNotification = function(subscription, data){
  return webpush.sendNotification(subscription, data);
}

app.get('/send-notification', async function(req,res) {
  const {subscription} = subscriptionDb;
  await sendNotification(subscription, "From Node server");
  res.json({message:'Notification sent'});
});

app.listen(PORT, () => console.log(`Express server running on ${PORT} port`));