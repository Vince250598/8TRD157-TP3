import express from 'express';
import validation from './disk.validation';
import controller from './disk.controller';

const router = express.Router();

router.route('/getDisk/:id').get(controller.getDisk);

router.route('/editDisk/:id').post(controller.editDisk);

router.route('/deleteDisk/:id').delete(controller.deleteDisk);

router.route('/getDisks').get(controller.getDisks);

router.route('/addDisk').put(validation.add, controller.addDisk);

export default router;
