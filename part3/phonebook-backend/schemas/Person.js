const mongoose = require('../mongo.db')

const phoneValidator = {
  validator: function(value) {
    const phoneRegex = /^\d{2,3}-\d+$/;
    return phoneRegex.test(value);
  },
  message: 'Invalid phone number format. Please provide a valid phone number with the format xx(x)-xxxxxxx(x).',
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    validate: phoneValidator,
    minlength: 8
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person