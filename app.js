//  Package
const express = require('express')
const bodyParser = require('body-parser')

// pemroses validator dan swagger doc
const openApiValidator = require('express-openapi-validator')
const yaml = require('yaml')
const swaggerUi = require('swagger-ui-express')

// Router
const authRouter = require('./routes/auth.js')
const transferReqRouter = require('./routes/transfer-req.js')
const productReqRouter = require('./routes/product-req.js')

// Middleware

const databaseMiddleware = require('./middleware/database.js')


// Error Handler
const errorHandlerMiddleware = require('./middleware/error-handler.js')

// Authentication

const { authenticationMiddleware } = require('./middleware/auth.js')

const app = express()
const port = process.env.PORT || 3000


// parses ke json 
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./doc/openapi.yaml', 'utf8'))))
app.use(openApiValidator.middleware({ 
  apiSpec: './doc/openapi.yaml'
}))

// database connect
app.use(databaseMiddleware)
// user
app.use('/v1/auth', authRouter)
app.use('/v1/transfer', authenticationMiddleware, transferReqRouter)
app.use('/v1/product', authenticationMiddleware, productReqRouter)

// error handler
app.use(errorHandlerMiddleware)



app.listen(port, ()=>{
    console.log(`Server Running On Port ${port}`)
})