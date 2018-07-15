import express from 'express';
const ValidationService = require('../services/ValidationService').default;
const GetNewsFeedService = require('../services/GetNewsFeedService').default;

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/news', async (req, res, next) => {
  try {
    ValidationService.getFeed(req);
    const queryParams = req.query;
    const getNewsFeedService = new GetNewsFeedService();
    const jsonObj = await getNewsFeedService.getNewsFeed(queryParams);
    return res.json(jsonObj);
  } catch (exc) {
    return next(exc);
  }
});

export default router;