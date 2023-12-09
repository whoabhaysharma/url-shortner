import express from 'express'
import mongoose from 'mongoose'
import Url from './models/Url.js';

const app = express();
const port = 3000; // Change this to your desired port

mongoose.connect('mongodb+srv://taskmanager:KTCWOqvNuk6JZd5N@cluster0.ddap5qo.mongodb.net/url-shortner');

app.use(express.json());

app.listen(port, () => {
  console.log("listening");
});

app.get('/list', async (req, res) => {
    const list = await Url.find()
    if(list){
        res.send(list)
    }else{
        res.sendStatus(404)
    }
})

app.post('/new', async (req, res) => {
    const obj = await Url.findOne({full : req.body.full})
    if(obj){
        res.send(`This url already exists on short id ${obj.short}`)
    }else{
        const url = new Url({
            full : req.body.full
        })
    
        try{
            const saved = await url.save()
            res.send(saved)
        }catch(e){
            res.sendStatus(500)
        }
    }
})

app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid
    const fullUrl = await getFullUrlByShort(shortid)
    if(fullUrl){
        res.redirect(fullUrl)
    }else{
        res.sendStatus(404)
    }
})

async function getFullUrlByShort(shortid){
    const res = await Url.findOne({short : shortid})
    if(res?.full){
        return res.full
    }else{
        return null
    }
}

async function getObjectByFullUrl(url){
    const res = await Url.findOne({full : url})
    if(res){
        return res
    }else{
        return null
    }
}