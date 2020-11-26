import httpStatus from 'http-status';
import { validationResult } from 'express-validator';

import Disk from './disk.model';
import apiError from '../utils/api.error';

class DiskController {
  async getDisks(req, res, next) {
    try {
      const disks = await Disk.find().exec();

      if (!disks) {
        return next(new apiError('Failed to get disks', httpStatus.NOT_FOUND));
      }

      const data = {
        total: disks.length,
        disks: disks
      };

      res.status(httpStatus.OK).json({
        data: data,
        message: 'success'
      });
    } catch (error) {
      next(new apiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async getDisk(req, res, next) {
    const id = req.params.id;

    try {
      const disk = await Disk.findOne({ _id: id }).exec();

      if (!disk) {
        return next(new apiError('Disk not found', httpStatus.NOT_FOUND));
      }

      res.status(httpStatus.OK).json({
        data: {
          disk: disk
        },
        message: 'success'
      });
    } catch (error) {
      next(new apiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async addDisk(req, res, next) {
    const bodyErrors = validationResult(req);

    if (!bodyErrors.isEmpty()) {
      return next(
        new apiError('Some form inputs are not valid', httpStatus.UNPROCESSABLE_ENTITY)
      );
    }

    const disk = new Disk();
    disk.title = req.body.title.toLowerCase();

    try {
      await disk.save();
    } catch (error) {
      return next(
        new apiError('Failed to create new disk', httpStatus.INTERNAL_SERVER_ERROR)
      );
    }

    res.status(httpStatus.OK).json({
      data: disk,
      message: 'Disk successfully created'
    });
  }

  async editDisk(req, res, next) {
    const bodyErrors = validationResult(req);

    if (!bodyErrors.isEmpty()) {
      return next(
        new apiError('Some form inputs are not valid', httpStatus.UNPROCESSABLE_ENTITY)
      );
    }

    const id = req.params.id;

    try {
      const disk = await Disk.findOneAndUpdate({ _id: id }, req.body, {
        new: true
      }).exec();

      if (!disk) {
        return next(
          new apiError('Disk is not found and cannot be updated', httpStatus.NOT_FOUND)
        );
      }

      res.status(httpStatus.OK).json({
        data: {
          disk: disk
        },
        message: `Disk successfully updated`
      });
    } catch (error) {
      return next(new apiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
  }

  async deleteDisk(req, res, next) {
    const id = req.params.id;

    try {
      const disk = await Disk.remove({ _id: id }).exec();

      if (!disk) {
        return next(
          new apiError('Disk is not found and cannot be deleted', httpStatus.NOT_FOUND)
        );
      }

      res.status(httpStatus.OK).json({
        data: disk,
        message: 'Disk successfully deleted'
      });
    } catch (error) {
      return next(new apiError(error.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}

export default new DiskController();
