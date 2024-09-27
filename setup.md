npm init -y
changes in package.json file 
    "main": "src/app.js"
    type: "module"
    scripts: {
        "start": "node src/app.js
    }

Inside app.js
BIOLER PLATE CODE:
        import express from "express"


const port = 3000
const app = express()

app.get("/", (req,res) => {
    res.send("eBandobast")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})



npm i express jsonwebtoken bcrypt body-parser cookie-parser dotenv uuid validator



PRISMA ORM SETUP
npm i prisma --save-dev
npx prisma 
npx prisma init


Database URl
make a schema 
npx prisma db push 
npx prisma generate

