

const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const commentSchema = new mongoose.Schema({
    comment: String,
    mood: String,
  });
  
  const Comment = mongoose.model('Comment', commentSchema);
  
  // POST endpoint to save comment and mood
  const endDriverComment =  async (req, res) => {
    const { comment, mood } = req.body;
  
    try {
      const newComment = new Comment({ comment, mood });
      await newComment.save();
      res.status(201).json({ message: 'Comment saved successfully' });
    } catch (err) {
      console.error('Error saving comment:', err);
      res.status(500).json({ error: 'Failed to save comment' });
    }
  };

  module.exports = {
    endDriverComment
};
