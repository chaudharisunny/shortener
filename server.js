const express = require('express')
const app = express()
const {connectDB}=require('./model/config')
const port = 3000
const cors=require('cors')
const Shorten = require('./model/shorten');
const indexRoutes=require('./router/index')

connectDB()
app.use(express.json())
app.use(cors())
app.use('/api',indexRoutes)

app.get('/:shortendUrl', async (req, res) => {
  try {
    const record = await Shorten.findOne({ shortendUrl: req.params.shortendUrl });
    if (!record) return res.status(404).send('Short URL not found');
    res.redirect(record.originUrl);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))