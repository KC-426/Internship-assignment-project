const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require("../models/user");

exports.getLoginManufacturer = (req, res, next) => {
  res.render('auth/manufacturer-login', {
    path: '/auth/manufacturer-login',
    pageTitle: 'Login'
  });
};

exports.postLoginManufacturer = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/manufacturer-login', {
      path: '/auth/manufacturer-login',
      pageTitle: 'Login'
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/manufacturer-login', {
          path: '/auth/manufacturer-login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          }
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('auth/manufacturer-login');
            });
          }
          return res.status(422).render('auth/manufacturer-login', {
            path: '/auth/manufacturer-login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/form/add-product');
        });
    })
    .catch(err => console.log(err));
};


exports.getLoginTransporter = (req, res, next) => {
  res.render('auth/transporter-login', {
    path: '/transporter-login',
    pageTitle: 'Login'
  });
};


exports.postLoginTransporter = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/transporter-login', {
      path: '/auth/transporter-login',
      pageTitle: 'Login'
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(422).render('auth/transporter-login', {
          path: '/auth/transporter-login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          }
        });
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('auth/transporter-login');
            });
          }
          return res.status(422).render('auth/transporter-login', {
            path: '/auth/transporter-login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password.',
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/form/add-product');
        });
    })
    .catch(err => console.log(err));
};

exports.getSignupManufacturer = (req, res, next) => {
  res.render('auth/manufacturer-signup', {
    path: '/auth/manufacturer-signup',
    pageTitle: 'Signup'
  });
};

exports.postSignupManufacturer= (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword

  // console.log(email,password,confirmPassword)
  // console.log(req.body)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/manufacturer-signup', {
      path: '/auth/manufacturer-signup',
      pageTitle: 'Signup',
      validationErrors: errors.array()
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/auth/manufacturer-login');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getSignupTransporter = (req, res, next) => {
  res.render('auth/transporter-signup', {
    path: '/auth/transporter-signup',
    pageTitle: 'Signup'
  });
};


exports.postSignupTransporter = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('auth/transporter-signup', {
      path: '/auth/transporter-signup',
      pageTitle: 'Signup',
      validationErrors: errors.array()
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/auth/transporter-login');
    })
    .catch(err => {
      console.log(err);
    });
};