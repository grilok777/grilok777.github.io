//бібліотеки для серверної частини
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//підключення до коду
app.use(express.static('D:\\Mysor2\\Web-prog\\Kursova\\github\\CW-2024'));//шлях до папки проєкту
app.use(cors());
app.use(express.json());

//підключення до бази даних
mongoose.connect('mongodb+srv://troianvitalii:kilativ777@snakedb.yh9ecr0.mongodb.net/snakeDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));

//модель "Гравець" до бази даних 
const playerSchema = new mongoose.Schema({
  email: String,
  nickname: String,
  password: String,
  record: Number,
  imagePath: String,
  registrationDate: {
    type: Date,
    default: Date.now
  },
  version: String
});

const User = mongoose.model('Player', playerSchema);

//модель "Історія ігор" до бази даних 
const gameHistorySchema = new mongoose.Schema({
  nickname: String,
  date: Date,
  score: Number,
  version: String
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

//модель "Відгук" до бази даних 
const responseSchema = new mongoose.Schema({
  email: String,
  text: String
});

const Response = mongoose.model('Response', responseSchema);

//запит реєстрації
app.post('/register', async (req, res) => {
  const { email, nickname } = req.body;
  try {
    const existingUserWithEmail = await User.findOne({ email: email });
    //перевірка ел. адреси в базі даних
    if (existingUserWithEmail) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const existingUserWithNickname = await User.findOne({ nickname: nickname });
    //перевірка нікнейму в базі даних
    if (existingUserWithNickname) {
      return res.status(400).json({ error: 'User with this nickname already exists' });
    }
    //створення і зберігання нового користувача
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.json({ message: 'User registered!', user: savedUser.toObject()});
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
//запит авторизації
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    //наявність акаунту користувача в базі даних по ел. адресі
    if (!user) {
      return res.status(400).json({ error: 'User with this email does not exist' });
    }
    //співпадіння паролю користувача з бази даних і того, що він ввів 
    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    //успішна авторизація
    res.json({ message: 'User logged in!', user: user.toObject() }); 
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
//запит повернення топ-5 користувачів з найбільшим рекордом
app.get('/leaderBoard', async (req, res) => {
  try {
    const users = await User.find().sort({ record: -1 }).limit(5);
    res.json(users);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
// запит створення нової історії гри користувача
app.post('/gameHistory', async (req, res) => {
  const { nickname, date, score, version } = req.body;
  try {
    const gameHistory = new GameHistory({ nickname, date, score, version });
    await gameHistory.save();
    res.json({ message: 'Game history saved!' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
// запит повернення всіх історій ігор користувача(за нікнеймом)
app.get('/userGames/:nickname', async (req, res) => {
  const { nickname } = req.params;
  try {
    const games = await GameHistory.find({ nickname: nickname }).sort({ date: -1 });
    res.json(games);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
// запит повернення рекорду гравця
app.get('/getUserRecord/:nickname', async (req, res) => {
  const { nickname } = req.params;
  try {
    const user = await User.findOne({ nickname: nickname });
    // користувач відсутній в базі даних
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    res.json({ record: user.record });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
//запит оновлення рекорду гравця
app.post('/updateUserRecord/:nickname', async (req, res) => {
  const { nickname } = req.params;
  const { record, version } = req.body;
  try {
    const user = await User.findOne({ nickname: nickname });
    // користувач відсутній в базі даних
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    user.record = record;
    user.version = version;
    await user.save();

    res.json({ message: 'Record updated!' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});
// перевірка запуску серверу
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
// запит відправлення відгуку
app.post('/addResponse', (req, res) => {
  const { email, text } = req.body; 

  const newResponse = new Response({ email, text });

  newResponse.save()
    .then(() => {
      res.status(201).send('Response added successfully');
    })
    .catch(error => {
      console.error('Error adding response:', error);
      res.status(500).send('Error adding response');
    });
});