// 1# app.js ของเอง
// const { process_params } = require("express/lib/router");

const { append } = require('express/lib/response');

if (process.env.NODE_ENV !== "production") {
    require('detenv').config();
}
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ของเอง'
// const session = req('express-session');
const MongoDBStore = require("connect-mongo")(session);

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
/*
.then((result) => {
    console.log('Mongodb connected-')
}).catch((err) => {
    console.log(err)
});
*/

// coennect to mongo
const secret = process.env.SECRET || 'password mongodb เองอะ'
const store = new MongoStore({
    url: dbUrl,
    secret: 'ของเอง',
    touchAfter: 24 * 60 * 60
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store, name: 'session',
    secret, 
    resave: false,
    saveUnitialized: true,
    cookie: {
        https: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
// app.use(flash());
// app.use(helmet());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`serving on port ${port}`)
})

// 2# .gitignore
/*
node_modules
.env
*/

// 3# .env
// npm i dotenv
/*
ใน app.js
const dotenv = require('dotenv').config;
console.log(process.env.MONGO_URL);
*/

