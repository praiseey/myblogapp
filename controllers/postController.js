var Post = require('../models/post');
var models = require('../models');

var async = require('async');

// Display post create form on GET.
exports.post_create_get = async function(req, res, next) {
        // renders a post form
        const authors = await models.Author.findAll();
        const categories = await models.Category.findAll();
        res.render('forms/post_form', { title: 'Create Post', authors: authors, categories: categories, layout: 'layouts/detail'});
        console.log("Post form rendered successfully");
};

// Handle post create on POST.
exports.post_create_post = async function(req, res, next) {
      const categories = await models.Category.findAll();
      const post = await models.Post.create({
            post_title: req.body.post_title,
            post_body: req.body.post_body,
            AuthorId: req.body.author_id,
            categoryList: req.params.categories
            
        });
        console.log('Post id: ' + post.id);
        
        // let categoryList = req.body.categories;
        // console.log(categories);
        
        console.log('Number of categories: ' + categories.length);
        let categoryList = req.body.categories;
        console.log('Chosen categories: ' + categoryList)
        // if (categories.length == 1) {
        //   const category = await models.Category.findById(req.body.categories);
        //   if (!category) {
        //     return res.status(400);
        //   }
        //   await post.addCategory(category);
        // }
        // else {
        //   categories.forEach(id => {
        //     const category = models.Category.findById();
        //     if (!category) {
        //       return res.status(400);
        //     }
        //     post.addCategory(category);
        //   });
        // };
        
        res.redirect('/blog/posts');
        
};

// Display post delete form on GET.
exports.post_delete_get = async function(req, res, next) {
      const post = await models.Post.findById(req.params.post_id);
      // Find and remove all associations
      const categories = await post.getCategories();
      post.removeCategories(categories);
      // delete post
       models.Post.destroy({
            where: {
              id: req.params.post_id
            }
          }).then(function() {
            res.redirect('/blog/posts');
            console.log("Post deleted successfully");
          });
};

// Handle post delete on POST.
exports.post_delete_post = async function(req, res, next) {
          const post = await models.Post.findById(req.params.post_id);

          const categories = await models.Post.getCategories();
          post.removeCategories(categories);

          models.Post.destroy({
            where: {
              id: req.params.post_id
            }
          }).then(function() {
            res.redirect('/blog/posts');
            console.log("Post deleted successfully");
          });

 };

// Display post update form on GET.
exports.post_update_get = async function(req, res, next) {
        // Find the post you want to update
        console.log("ID is " + req.params.post_id);
        const categories = await models.Category.findAll();
        models.Post.findById(
                req.params.post_id
        ).then(function(post) {
               res.render('forms/post_form', { title: 'Update Post', post: post, layout: 'layouts/detail'});
               console.log("Post updated successfully.");
          });
        
};

// Handle post update on POST.
exports.post_update_post = async function(req, res, next) {
        let post_id = req.body.post_id
        console.log("ID is " + req.params.post_id);

        const post = await models.Post.findById(req.params.post_id);

        const categories = await post.getCategories();
        post.removeCategories(categories);

        let categoryList = req.body.categories;
        console.log(categoryList.length);

        if (categoryList.length == 1) {
          const category = await models.Category.findById(req.body.categories);
          if (!category) {
            return res.status(400);
          }
          await post.addCategory(category);
        }
        else {
          await req.body.categories.forEach(async(id) => {
            const category = await models.Category.findById(id);
            if (!category) {
              return res.ststus(400);
            }
            await post.addCategory(category);
          });
        };
        models.Post.update(
        // Values to update
            {
                post_title: req.body.post_title,
                post_body: req.body.post_body
            },
          { // Clause
                where: 
                {
                    id: req.params.post_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(function() { 
                res.redirect("/blog/posts");  
                console.log("Post updated successfully");
          });
};

// Display detail page for a specific post.
exports.post_detail = function(req, res, next) {
        // find a post by the Id
        models.Post.findById(
                req.params.post_id,
                {
                  include: [
                    {
                      model: models.Comment
                    },
                    {
                      model: models.Author,
                      attributes: ['id', 'first_name', 'last_name']
                    },
                    {
                      model: models.Category,
                      as: 'categories',
                      required: false,
                      attributes: ['id', 'name'],
                      through: {
                        model: models.postCategories,
                        as: 'postCategories',
                        attributes: ['post_id', 'category_id']
                      }
                  
                    }
                  ]
                }
        ).then(function(post) {
        // renders an inividual post details page
          res.render('pages/post_detail', { title: 'Post Details', post: post, layout: 'layouts/detail'} );
          console.log("Post details rendered successfully");
        });
};


// Display list of all posts.
exports.post_list = function(req, res, next) {
        // controller logic to display all posts
        models.Post.findAll({
          include: [{
            model: models.Author,
            attributes: ['id', 'first_name', 'last_name']
          },
          {
            model: models.Category,
            as: 'categories',
            required: false,
            attributes: ['id', 'name'],
            through: {
              model: models.postCategories,
              as: 'postCategories',
              attributes: ['post_id', 'category_id']
            }
          }]
        }).then(function(posts) {
        // renders a post list page
        res.render('pages/post_list', { title: 'Post List', posts: posts, layout: 'layouts/list'} );
        console.log("Posts list rendered successfully");
        });
        
};

// This is the blog homepage.
exports.index = function(req, res) {

      // find the count of posts in database
      models.Post.findAndCountAll(
      ).then(function(postCount)
      {
        models.Author.findAndCountAll(
      ).then(function(authorCount)
      {
        models.Comment.findAndCountAll(
      ).then(function(commentCount)
      {
        models.Category.findAndCountAll(
      ).then(function(categoryCount)
      {
        res.render('pages/index', {
          title: 'Homepage', 
          postCount: postCount,
          authorCount: authorCount,
          commentCount: commentCount,
          categoryCount: categoryCount ,
          layour: 'layout/main'
        });
        });
        });
        });
       
        // // find the count of authors in database
 
        // // find the count of comments in database
 
        // // find the count of categories in database
 
        // res.render('pages/index', {title: 'Homepage', postCount: postCount, layout: 'layouts/main'});
        
        // // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
        // // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});

      });
    
    
    };


 