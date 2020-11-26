import { Schema, model } from 'mongoose';

class Disk extends Schema {
  constructor() {
    super({
      title: {
        type: String,
        required: true
      },
      artists: {
        type: [String],
        required: true
      },
      released: {
        type: Date,
        default: Date.now
      },
      styles: {
        type: [String],
        required: true
      }
    });
  }
}

export default model('Disk', new Disk());
