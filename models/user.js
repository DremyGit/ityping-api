const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nick_name: String,
  created_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false },
});

UserSchema.methods = {

  create() {
    return this.save();
  },

  update(obj) {
    Object.assign(this, obj);
    return this.save();
  },

  delete() {
    return User.remove({ _id: this._id }).exec();
  },

};

UserSchema.statics = {

  getAll() {
    return User.find({}).exec();
  },

  getById(id) {
    return User.findById(id).exec();
  },

};

const User = mongoose.model('User', UserSchema);

module.exports = User;
