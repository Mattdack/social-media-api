const { Schema, model, Types } = require(`mongoose`);

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            require: true,
            default: Date.now,
            get: dateCreated,
        },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            require: true,
            default: Date.now,
            get: dateCreated,
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

const dateCreated = function (createdAt) {
    return Date(createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
};

thoughtSchema
    .virtual(`reactionCount`)
    .get(function () {
        return `${this.reactions.length}`;
    });

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;

