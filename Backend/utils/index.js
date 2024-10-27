const Comment = require("../models/comments.model");


const deleteCommentAndChildren = async (commentId, count) => {
    // Find all comments where the parent_id is the current commentId
    const childComments = await Comment.find({ parent_id: commentId });

    // Recursively delete each child comment and its children
    for (const childComment of childComments) {
        count = await deleteCommentAndChildren(childComment._id, count); // Reassign count here
    }

    // Increment count after deleting the current comment itself
    count++;
    await Comment.findByIdAndDelete(commentId);

    // Return the updated count so that it propagates back up the call stack
    return count;
}

module.exports = {
    deleteCommentAndChildren,
} 