import { check } from 'express-validator';

const validation = {
  addAndUpdate: [
    check('title').notEmpty().isString(),
    check('artists').notEmpty().isArray(),
    check('styles').notEmpty().isArray()
  ]
};

export default validation;
