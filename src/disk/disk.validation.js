import { check } from 'express-validator';

const validation = {
  add: [
    check('title').notEmpty().isString(),
    check('artists').notEmpty().isString(),
    check('styles').notEmpty().isString()
  ],
  update: [
    check('title').notEmpty().isString(),
    check('artists').notEmpty().isString(),
    check('styles').notEmpty().isString()
  ]
};

export default validation;
