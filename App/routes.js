var bodyParser = require('body-parser');

var appRouter = function (app, conn, server) {
  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  // app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.send('Hello World');
  });

  app.all('/proxy/*', async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    try {
      res.json({
        message: 'Proxy request successful and this is a sample response',
      });
    } catch (ex) {
      console.error(ex);
      return res.status(500).json({ error: 'An error occurred' });
    }
  });
};
module.exports = appRouter;
//http://localhost:3000/account?username=nraboy
