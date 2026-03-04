import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        emoji: String,
        label: String
    },
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Journal = mongoose.model('Journal', journalSchema);
export default Journal;
