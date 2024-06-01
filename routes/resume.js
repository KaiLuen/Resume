var express = require('express');
const ResumeRepo = require('../model/repo/resume_repo');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', 
//#swagger.ignore = true
swaggerUi.setup(swaggerDocument));

function responseWithSuccessMessage(message) {
    return {
        code: 0,
        message: message
    };
}

function reponseWithSuccessObject(obj) {
    return {
        code: 0,
        message: "Success",
        data: obj
    };
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
    //#swagger.ignore = true
//   const collection = req.mongoClient.db("test").collection("posts");
//   const insertResult = await collection.insertOne({ title: "Hello, MongoDB!" });
//   console.log(insertResult);

    res.render('resume', { title: '履歷', user: req.user });
});


router.get('/profile', function(req, res, next) {
/*
#swagger.description = '取得使用者已儲存的個人資料'
#swagger.tags = ['Resume']
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
        "data": {
            "profile": {
                "name": "金楷倫",
                "birth": "1988-02-13"
            },
            "educations": [
                {
                    "degree": "Bachelor of Science in Computer Science",
                    "school": "University of California, Los Angeles",
                    "yearStart": "2015",
                    "yearEnd": "2019"
                },
                {
                    "degree": "High School Diploma",
                    "school": "Los Angeles High School",
                    "yearStart": "2011",
                    "yearEnd": "2015"
                }
            ],
            "experiences": [
                {
                    "title": "Software Engineer",
                    "company": "Google",
                    "yearStart": "2019",
                    "yearEnd": "Present",
                    "description": "Developed and maintained software applications for Google's search engine."
                },
                {
                    "title": "Software Engineer Intern",
                    "company": "Facebook",
                    "yearStart": "2018",
                    "yearEnd": "2018",
                    "description": "Developed and maintained software applications for Facebook's social media platform."
                }
            ],
            "skills": [
                {
                    "name": "Java",
                    "level": "Advanced"
                },
                {
                    "name": "Python",
                    "level": "Intermediate"
                },
            ],
            "projects": [
                {
                    "name": "Project 1",
                    "yearStart": "2019",
                    "yearEnd": "2019",
                    "description": "Developed a web application using React and Node.js."
                },
                {
                    "name": "Project 2",
                    "yearStart": "2018",
                    "yearEnd": "2018",
                    "description": "Developed a mobile application using React Native."
                },
            ],
            "certifications": [
                {
                    "name": "Certification 1",
                    "skillLevel": 3
                },
                {
                    "name": "Certification 2",
                    "skillLevel": 3
                },
            ],
            "languages": [
                {
                    "name": "English",
                    "level": 5
                },
                {
                    "name": "Spanish",
                    "level": 3
                }
            ],
            "interests": [
                {
                    "name": "Reading",
                    "description": "I enjoy reading books on various topics."
                },
            ],
            "references": [
                {
                    "name": "Reference 1",
                    "title": "Manager",
                    "company": "Company 1",
                    "email": ""
                },
            ]
        }
    }
}
*/
    var user = req.user;
    var result = user;
    delete result._id;
    delete result.sessionId;
    delete result.lastAccess;

    var successObj = reponseWithSuccessObject(result);
    res.send(successObj);
});


router.post('/profile', function(req, res, next) {
/*
#swagger.description = '儲存使用者個人資料'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者個人資料',
    required: false,
    schema: {
        "name": "金楷倫",
        "birth": "1988-02-13"
    }
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/

    const repo = new ResumeRepo(req.mongoClient);
    var name = req.body.name;
    var birth = req.body.birth;

    var user = req.user;
    if (!user.profile) {
        user.profile = {};
    }
    user.profile.name = name;
    user.profile.birth = birth;
    repo.saveUserData(user);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/education', function(req, res, next) {
/*
#swagger.description = '儲存使用者教育資料'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者教育資料',
    required: false,
    schema: [
        {
            "degree": "Bachelor of Science in Computer Science",
            "school": "University of California, Los Angeles",
            "yearStart": "2015",
            "yearEnd": "2019"
        },
        {
            "degree": "High School Diploma",
            "school": "Los Angeles High School",
            "yearStart": "2011",
            "yearEnd": "2015"
        }
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var educations = req.body;
    var user = req.user;
    user.educations = educations;
    repo.saveUserData(user);
    console.log(educations);
    res.send(responseWithSuccessMessage("Success"));    
});

router.post('/experience', function(req, res, next) {
/*
#swagger.description = '儲存使用者工作經驗'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者工作經驗',
    required: false,
    schema: [
        {
            "title": "Software Engineer",
            "company": "Google",
            "yearStart": "2019",
            "yearEnd": "Present",
            "description": "Developed and maintained software applications for Google search engine."
        },
        {
            "title": "Software Engineer Intern",
            "company": "Facebook",
            "yearStart": "2018",
            "yearEnd": "2018",
            "description": "Developed and maintained software applications for Facebook social media platform."
        }
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var experiences = req.body;
    var user = req.user;
    user.experiences = experiences;
    repo.saveUserData(user);
    console.log(experiences);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/skill', function(req, res, next) {
/*
#swagger.description = '儲存使用者專業技能'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者專業技能',
    required: false,
    schema: [
        {
            "name": "Java",
            "level": "Advanced"
        },
        {
            "name": "Python",
            "level": "Intermediate"
        },
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var skills = req.body;
    var user = req.user;
    user.skills = skills;
    repo.saveUserData(user);
    console.log(skills);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/project', function(req, res, next) {
/*
#swagger.description = '儲存使用者專案經驗'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者專案經驗',
    required: false,
    schema: [
        {
            "name": "Project 1",
            "yearStart": "2019",
            "yearEnd": "2019",
            "description": "Developed a web application using React and Node.js."
        },
        {
            "name": "Project 2",
            "yearStart": "2018",
            "yearEnd": "2018",
            "description": "Developed a mobile application using React Native."
        },
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var projects = req.body;
    var user = req.user;
    user.projects = projects;
    repo.saveUserData(user);
    console.log(projects);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/certification', function(req, res, next) {
/*
#swagger.description = '儲存使用者證照資料'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者證照資料',
    required: false,
    schema: [
        {
            "name": "Certification 1",
            "skillLevel": 3
        },
        {
            "name": "Certification 2",
            "skillLevel": 3
        },
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var certifications = req.body;
    var user = req.user;
    user.certifications = certifications;
    repo.saveUserData(user);
    console.log(certifications);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/language', function(req, res, next) {
/*
#swagger.description = '儲存使用者語言能力'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者語言能力',
    required: false,
    schema: [
        {
            "name": "English",
            "level": 5
        },
        {
            "name": "Spanish",
            "level": 3
        },
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var languages = req.body;
    var user = req.user;
    user.languages = languages;
    repo.saveUserData(user);
    console.log(languages);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/interest', function(req, res, next) {

/*
#swagger.description = '儲存使用者興趣'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者興趣',
    required: false,
    schema: [
        {
            "name": "Reading",
            "description": "I enjoy reading books on various topics."
        },
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var interests = req.body;
    var user = req.user;
    user.interests = interests;
    repo.saveUserData(user);
    console.log(interests);
    res.send(responseWithSuccessMessage("Success"));
});

router.post('/reference', function(req, res, next) {
/*
#swagger.description = '儲存使用者推薦人'
#swagger.tags = ['Resume']
#swagger.parameters['obj'] = {
    in: 'body',
    description: '使用者推薦人',
    required: false,
    schema: [
        {
            "name": "Reference 1",
            "title": "Manager",
            "company": "Company 1",
            "email": ""
        },
    ]
}
#swagger.responses[200] = {
    schema: {
        "code": 0,
        "message": "Success",
    }
}
*/
    const repo = new ResumeRepo(req.mongoClient);
    var references = req.body;
    var user = req.user;
    user.references = references;
    repo.saveUserData(user);
    console.log(references);
    res.send(responseWithSuccessMessage("Success"));
});


router.get('/clear-all', function(req, res, next) {
    /*#swagger.ignore = true */
    const repo = new ResumeRepo(req.mongoClient);
    repo.clearAllData();
    res.send('respond with a resume');
});

module.exports = router;