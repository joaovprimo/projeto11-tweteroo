import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];


app.post('/singup', (req,res)=>{
   const user = req.body;
   users.push(user);
   res.send("OK");
})

app.post('/tweets', (req, res)=>{
const tweet = req.body.tweet;
const user = req.headers.username;

const objTweet = {tweet, user};
tweets.push(objTweet);
res.send("ok");
})

app.get('/tweets', (req,res)=>{
   let Newtweets = [];
   let avatar = users[0].avatar;
   for(let i = tweets.length-1; i>tweets.length-11; i--){
      Newtweets.push(tweets[i]);
   }
   console.log(Newtweets);
let Tweets = Newtweets.map(tt=>{
   return {...tt, avatar: avatar}
 });
console.log(Tweets);
res.send(Tweets);
})

app.listen(5000, ()=>{
   console.log("workinOn");
});