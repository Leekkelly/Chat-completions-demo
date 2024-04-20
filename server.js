const OpenAI = require("openai"); //ES6 from require to import
// import OpenAI from "openai";

require('dotenv').config()
// const dotenv = require("dotenv"); <--ES6 from require to import
// dotenv.config()
// import dotenv  from "dotenv"
// dotenv.config()

const PORT = 8000
// import express from "express"
const express = require("express")
// import cors from "cors"
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

app.post('/completion', async (req, res) => {
    const text = req.body.text
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": text},
        ],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0])
    res.send(completion.choices[0])//send response to frontend!
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))