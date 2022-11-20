const Router = require('koa-router');
const controller = require('../controllers').event;

const router = new Router();

router.post('/create', controller.createEvent);
router.delete('/delete', controller.deleteEvent);
router.get('/search', controller.searchEvents);
router.post('/follow-up', controller.addFollowUp);
router.post('/join', controller.join);
router.post('/rate', controller.rate);

module.exports = router;
