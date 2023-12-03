const express = require('express')
const app = express()
const port = 8000
const authRouter = require('./router/authRouter');
const roleRouter = require('./router/routerRole');
const userRouter = require('./router/userRouter');
const profileRouter = require('./router/profileRouter');
const predictRouter = require('./router/predictRouter');
const questionRouter = require('./router/questionRouter');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/model', express.static('D:/pelajaran kuliah/semester 7/capstone/pregnagrowth/Cloud_Computing/v1/dataset'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/predict', predictRouter);
app.use('/api/v1/question', questionRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(port, () => {
    console.log('Backend app listening on port 8000!')
    }
)