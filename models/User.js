const { Schema, model } = require (`mongoose`);

const validateEmail = function (email) {
    var isEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return isEmail.test(email);
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            validate: [validateEmail, `Please enter a valid email address!`]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
    }
);

userSchema
    .virtual('friendCount')
    .get(function() {
        return `${this.friends.length}`;
    });

const User = model(`user`, userSchema);

module.exports = User;