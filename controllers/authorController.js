var Author = require('../models/author');
var models = require('../models');

// Display author create form on GET.
exports.author_create_get = function(req, res, next) {
        // create author GET controller logic here 
        res.render('forms/author_form', { title: 'Create Author',  layout: 'layouts/detail'});
};

// Handle author create on POST.
exports.author_create_post = function(req, res, next) {
     // create author POST controller logic here
     models.Author.create({
        first_name: req.body.username,
        last_name: req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        username: req.body.username,
       
}).then(function() {
        console.log('Author created successfully!')
        res.redirect('/blog/authors');
}).catch(error => {
        console.log('Error: ' + error);
        res.status(400);
});
     
};

// Display author delete form on GET.
exports.author_delete_get = function(req, res, next) {
        models.Author.destroy({
                where: {
                        id: req.params.author_id
                }
        }).then(function() {
                res.redirect('/blog/authors');
        })
};

// Handle author delete on POST.
exports.author_delete_post = function(req, res, next) {
        models.Author.destroy({
                where: {
                        id: re.params.author_id
                }
        }).then(function() {
                res.redirect('/authors');
                console.log('Author deleted successfully!');
        })
        
};

// Display author update form on GET.
exports.author_update_get = function(req, res, next) {
        models.Author.findById(
                req.params.author_id
        ).then(function(author) {
                console.log('Author updated successfully');
                res.render('forms/author_form', { title: 'Update Author', author: author, layout: 'layouts/detail'});
        });
        
};

// Handle post update on POST.
exports.author_update_post = function(req, res, next) {
        models.Author.update(
                {
                        first_name: req.body.username,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        role: req.body.role,
                        username: req.body.username,
                },
                {
                        where: {
                        id: req.params.author_id
                        }
                }
        ).then(function(){
                res.redirect("/blog/authors");
                console.log('Author updated successfully');
        })
};

// Display list of all authors.
exports.author_list = function(req, res, next) {
        models.Author.findAll(
        ).then(function(authors) {
                res.render('pages/author_list', { title: 'Author List', authors: authors, layout: 'layouts/list'});
                console.log('List of authors rendered successfully');
        });
        
};

// Display detail page for a specific author.
// exports.author_detail = async function(req, res, next) {
//         const categories = await models.Category.findAll();
//         models.Author.findById(
//                 req.params.author_id, {
//                         include: [{
//                                 model: models.Post
//                         }]
//                 }
//         ).then(function(author) {
//                 res.render('pages/author_detail', { title: 'Author Details', author: author, categories: categories, layout: 'layouts/detail'} );
//                 console.log('Author detail rendered successfully');
//         });
        
// };

exports.author_detail = async function(req, res, next) {
        const categories = await models.Category.findAll();
        models.Author.findById(
                req.params.author_id, {
                        include: {
                                model: models.Post
                        }
                }
        ).then(function(author) {
                res.render('pages/author_detail', { title: 'Author Details', author: author, layout: 'layouts/detail'} );
                console.log('Author details rendered successfully');
        });
        
};

 