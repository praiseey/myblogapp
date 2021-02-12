var Comment = require('../models/category');
var models = require('../models');

// Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
        
        res.render('forms/comment_form', { title: 'Create Comment', layout: 'layouts/detail'});
};

// Handle comment create on POST.
exports.comment_create_post = function(req, res, next) {
        let post_id = req.body.post_id
        models.Comment.create({
               comment_body: req.body.comment_body,
               PostId: req.body.post_id
           }).then(function() {
               console.log("Comment created successfully");
               res.redirect('/blog/post/' + post_id);
         });
};

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res, next) {
        // GET logic to delete a comment here
        
        // renders delete page
        res.render('pages/comment_delete', { title: 'Delete Comment', layout: 'layouts/detail'} );
};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res, next) {
        // POST logic to delete a comment here
        
        // If a comment gets deleted successfully, we just redirect to comments list
        // no need to render a page
        res.redirect('/comments');
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res, next) {
        // GET logic to update a comment here
        
        // renders a comment form
        res.render('forms/comment_form', { title: 'Update Comment',  layout: 'layouts/detail' });
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res, next) {
        // POST logic to update a comment here
       
        // If a comment gets updated successfully, we just redirect to comments list
        // no need to render a page
        res.redirect("/comments");
};

// Display list of all comments.
exports.comment_list = function(req, res, next) {
        models.Comment.findAll(
                ).then(function(comments) {
                
                        res.render('pages/comment_list', { title: 'Comment List', comments: comments, layout: 'layouts/list'} );
                        console.log("List of comments rendered successfully");
                });
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res, next) {
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
                console.log('Comment details rendered successfully!')
                res.render('pages/comment_detail', { title: 'Comment Details', comment: comment, layout: 'layouts/detail'} );
        })
        
};

 