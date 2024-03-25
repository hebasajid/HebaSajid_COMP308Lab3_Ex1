//USER MODEL
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    } ,
	firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    
    email: {
		type: String,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
    
    password: {
		type: String,
        required: true,
		// validation password length. above 6 characters.
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	}
});


// hash the passwords before saving
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
    this.password = hashedPassword;
})

module.exports = mongoose.model('User', userSchema);
