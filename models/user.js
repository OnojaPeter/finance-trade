const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fName: { type: String, required: true},
    lName: { type: String, required: true},
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: {
        type: String,
        enum: ['user', 'admin'],
      }
})

// Hash password before saving
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        
        user.password = hash;
        next();
      });
    });
  });
  
  // Compare hashed password with plain text password
  userSchema.methods.comparePassword = function(userPassword, cb) {
    bcrypt.compare(userPassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User