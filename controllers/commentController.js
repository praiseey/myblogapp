var Comment = require('../models/category');
var models = require('../models');

var async = require('async');

// Display comment create form on GET.
exports.comment_create_get = async function(req, res, next) {
        const posts = await models.Post.findAll();
        res.render('forms/comment_form', { title: 'Create Comment', posts: posts, layout: 'layouts/detail'});
        console.log('Comment rendered successfully');
};

// Handle comment create on POST.
exports.comment_create_post = async function(req, res, next) {
        let post_id = req.body.post_id;
        const comment = await models.Comment.create({
                comment_title: req.body.comment_title,
                comment_body: req.body.comment_body,
                PostId: post_id
           }).then(function() {
               console.log("Comment created successfully");
               res.redirect('/blog/comments');
         });
};

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res, next) {
        models.Comment.destroy({
                where: {
                        id: req.params.comment_id
                }
        }).then(function() {
                res.redirect('/blog/comments');
                console.log('Comment deleted successfully!');
        });

};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res, next) {
        models.Comment.destroy({
                where: {
                        id: req.params.comment_id
                }
        }).then(function() {
                res.redirect('blog/comments');
        });
        
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res, next) {
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
                res.render('forms/comment_form', { title: 'Update Comment', comment: comment, layout: 'layouts/detail'});
                console.log('Comment updated successfully!');
        });
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res, next) {
        let post_id = req.body.post_id
        models.Comment.update({
                comment_title: req.body.comment_title,
                comment_body: req.body.comment_body
        
           },
           {
                   where: {
                           id: req.params.comment_id
                   }
           }).then(function() {
               console.log("Comment updated successfully");
               res.redirect('/blog/post' + post_id);
         });
        
};

// Display list of all comments.
exports.comment_list = async function(req, res, next) {
        const posts = await models.Comment.findAll();
        models.Comment.findAll(
                ).then(function(comments) {
                        res.render('pages/comment_list', { title: 'Comment List', comments: comments, layout: 'layouts/list'} );
                        console.log("List of comments rendered successfully");
                });
};

// Display detail page for a specific comment.
exports.comment_detail = async function(req, res, next) {
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
                console.log('Comment details rendered successfully!')
                res.render('pages/comment_detail', { title: 'Comment Details', comment: comment, layout: 'layouts/detail'} );
        })
        
};

 