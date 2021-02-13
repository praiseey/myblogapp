var Category = require('../models/category');
var models = require('../models');

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {

        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
     models.Category.create({
             name: req.body.name
     }).then(function(){
        res.redirect('/blog/categories');
        console.log('Category created successfully!');
     });
     
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
        models.Category.destroy({
                where: {
                        id: req.params.category_id
                }
        }).then(function() {
                res.redirect('/blog/categories');
                console.log('Category deleted successfully!');
        });
        
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
        models.Category.destroy({
                where: {
                        id: req.params.category_id
                }
        }).then(function() {
                res.redirect('/blog/categories');
        });
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        models.Category.findById(
                req.params.category_id

        ).then(function(category) {
                res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail' });
                console.log('Category update successful!');
        });
        
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        models.Category.update({
                name: req.body.name,
                },
                {
                        where: {
                                id: req.params.category_id
                        }
                }
        ).then(function() {
                res.redirect('/blog/categories');
                console.log('Category updated successfully!');
        });
};

// Display list of all categories.
exports.category_list = function(req, res, next) {
        models.Category.findAll({
                include: [{
                        model: models.Post,
                        as: 'posts',
                        required: false,
                        attributes: ['id', 'post_title', 'post_body'],
                        through: {
                                model: models.postCategories,
                                // as: postCategories,
                                attributes: ['post_id', 'category_id'],
                        }
                }]
        }).then(function(categories) {
                res.render('pages/category_list', { title: 'Category List',  categories: categories, layout: 'layouts/list'} );
                console.log('List of categories rendered successfully!');
        });
        
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
        models.Category.findById(
                req.params.category_id,
                {
                        include: [{
                                model: models.Post,
                                as: 'posts',
                                required: false,
                                attributes: ['id', 'post_title', 'post_body'],
                                through: {
                                        model: models.postCategories,
                                        // as: 'postCategories',
                                        attributes: ['post_id', 'category_id'],
                                }
                        }]
                }
        ).then(function(category){
                res.render('pages/category_detail', { title: 'Category Details', category: category, layout: 'layouts/detail'} );
                console.log('Category details renedered successfully');
        });
        
};

 