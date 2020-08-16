const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// @route     GET api/post
// @desc      Get post
// @access    Public
router.get('/', (req, res) => {
  Post
  .find()
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({nopostfound: 'No post found with this id'}));
});

// @route     GET api/post/:id
// @desc      Get post by id
// @access    Public
router.get('/:id', (req, res) => {
  Post
  .findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

// @route     POST api/posts
// @desc      Create post
// @access    Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const p = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  p.save().then(post => res.json(post));
});

// @route     DELETE api/post/:id
// @desc      Delete post by id
// @access    Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile
  .findOne({user: req.user.id})
  .then(profile => {
    Post
    .findById(req.params.id)
    .then(post => {
      if (post.user.toString() != req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }
      Post
      .remove()
      .then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
});

// @route     POST api/post/like/:id
// @desc      Like post by id
// @access    Private
router.post('/like/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile
  .findOne({user: req.user.id})
  .then(profile => {
    Post
    .findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' });
      }
      post.likes.unshift({ user: req.user.id });
      post.save().then(post => {
        res.json(post);
      })
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
});

// @route     POST api/post/unlike/:id
// @desc      Like post by id
// @access    Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile
  .findOne({user: req.user.id})
  .then(profile => {
    Post
    .findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ notliked: 'User has not liked this post' });
      }
      const index = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
      post.likes.splice(index, 1);
      post.save().then(post => {
        res.json(post);
      });
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });
});

// @route     POST api/post/comment/:id
// @desc      Add comment by id
// @access    Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  };
  Post
  .findById(req.params.id)
  .then(post => {
    const comment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };
    post.comments.unshift(comment);
    post.save().then(post => res.json(post));
  })
  .catch(err => res.status(404).json({ 'postnotfound': 'No post found' }));
});

// @route     DELETE api/post/comment/:id
// @desc      Delete comment from post
// @access    Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Post
  .findById(req.params.id)
  .then(post => {
    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({'commentnotexists':'Comment does not exist'});
    };
    const index = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(index, 1);
    post.save().then(post => {
      res.json(post);
    });
  })
  .catch(err => res.status(404).json({ 'postnotfound': 'No post found' }));
});

module.exports = router;