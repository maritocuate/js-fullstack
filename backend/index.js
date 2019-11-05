const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')

//init
const app = express()

//setings
app.set('port', 3000)

//MIDDLEWARES
app.use(morgan('dev'))

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})

app.use(multer({storage}).single('image'))
app.use(express.urlencoded({extended:false}))//Interpretamos los datos del formulario como un JSON
app.use(express.json())//Interpretamos las peticiones JSON


//ROUTES
app.use('/api/books', require('./routes/books'))


//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')))


//start server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'))
})