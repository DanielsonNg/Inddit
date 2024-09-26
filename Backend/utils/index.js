const Comment = require("../models/comments.model");


const deleteCommentAndChildren = async (commentId) => {
    // Find all comments where the parent_id is the current commentId
    const childComments = await Comment.find({ parent_id: commentId });

    // Recursively delete each child comment and its children
    for (const childComment of childComments) {
        await deleteCommentAndChildren(childComment._id); // Recursion for child comments
    }

    // Once all children are deleted, delete the parent comment itself
    await Comment.findByIdAndDelete(commentId);
}
module.exports = {
    deleteCommentAndChildren,
} 