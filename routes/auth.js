const ResumeRepo = require('../model/repo/resume_repo');

module.exports = async function (req, res, next) {

  const repo = new ResumeRepo(req.mongoClient);

  var user = await repo.findUserViaSessionId(req.userId);

  console.log(user);
  

  const sessionId = req.userId;
  const lastTime = new Date().getTime();

  if (!user) {
    user = {
      sessionId: sessionId,
      lastAccess: lastTime
    };
  }
  user.lastAccess = lastTime;
  await repo.saveUserData(user);
  req.user = user;
  next();    
};