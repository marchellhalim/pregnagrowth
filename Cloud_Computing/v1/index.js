const express = require('express')
const app = express()
const port = 8000
const authRouter = require('./router/authRouter');
const roleRouter = require('./router/routerRole');
const userRouter = require('./router/userRouter');
const profileRouter = require('./router/profileRouter');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/profile', profileRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
    }
)

app.listen(port, () => {
    console.log('Example app listening on port 8000!')
    }
)