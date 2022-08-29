import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let tweets = [];


app.post('/singup', (req,res)=>{
   const {username, avatar} = req.body;
if(!username || !avatar){
   return res.status(400).send({
      message: "Todos os campos são obrigatórios!"
   })
}

   users.push({username, avatar});
   res.status(201).send("OK");
})

app.post('/tweets', (req, res)=>{
const {tweet} = req.body;
const {user: username} = req.headers;

if(!tweet || !username){
   return res.status(400).send(
      {message:"Todos os campos são obrigatórios"}
      );
}else{
   const objTweet = {tweet, username};
tweets.push(objTweet);
return res.status(201).send("OK");
}

});

app.get('/tweets', (req,res)=>{

const Tweets = tweets.map(tt=>{
   for(let i = 0; i<users.length; i++){
      console.log(tt.username);
      if( users[i].username === tt.username){
         return {...tt, avatar: users[i].avatar}
      }
   }
 });
 let TweetsUser = Tweets.slice(-10);
console.log(TweetsUser.length);
res.send(TweetsUser);
})

app.listen(5000, ()=>{
   console.log("workinOn port 5000");
});