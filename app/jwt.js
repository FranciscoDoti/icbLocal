var jwt = require('jsonwebtoken');

const generateJWT = function (user, courses) {
  if (user.userType === 'student') {
    studentCourses = courses;
  } else {
    instructorCourses = courses;
  }

  var token = jwt.sign(
    {
      'sub': user.userId,
      'user_id': user.userId,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'Email': user.email,
      'C_Acct__c': 'C02777', // I do not know what this is or how it is created or used.
      'School_or_Institution__c': 'Minnesota',
      'nickname': user.nickname, // I do not know the importance of this nickname.
      'name': user.firstName + ' ' + user.lastName,
      'app_metadata': {
        'admin': user.admin,
        'course_data': {
          'student': studentCourses
        }
      },
      'user_metadata': {
        'name': user.firstName + ' ' + user.lastName,
        'firstName': user.firstName,
        'lastName': user.lastName
      },
      'LastModifiedDate': '2018-10-04T16:31:55.000+0000',
      'https://macmillantech.com/user_metadata': {
        'name': user.firstName + ' ' + user.lastName,
        'firstName': user.firstName,
        'lastName': user.lastName
      },
      'https://macmillantech.com/app_metadata': {
        'admin': user.admin,
        'course_data': {
          'student': studentCourses,
          'instructor': instructorCourses
        }
      },
      'email': user.email
    },
    'secret',
    {expiresIn: '1d'});

  return token;
}

module.exports = {
  generateJWT
}
