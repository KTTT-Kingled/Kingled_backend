import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
//import routes
import addressRoutes from './routes/address.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';

//init app.js
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/auth', authRoutes);
app.use('/address', addressRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connected to db!'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
