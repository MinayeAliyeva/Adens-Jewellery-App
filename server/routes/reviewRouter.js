const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Review } = require("../models/review");
// const auth = require("../middlware/auth");

router.get('/:productId', async (req, res) => {
    try {
      const reviews = await Review.find({ productId: req.params.productId });
      if (!reviews.length) {
        return res.status(200).send({ reviews: [], averageRating: 0 });
      }
      const response = reviews.map(review => ({
        user: {
          id: review.user.id,
          firstName: review.user.firstName,
          lastName: review.user.lastName
        },
        rating: review.rating,
        comments: review.comments
      }));
  
      const averageRating = Math.floor(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length);
  
      res.status(200).json({ reviews: response, averageRating });
    } catch (err) {
      res.status(500).json({ error: 'Yorumlar alınamadı: ' + err.message });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const { productId, user, rating, comment } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Ürün bulunamadı.' });
      }
      const existingReview = await Review.findOne({ productId, 'user.id': user.id });
  
      // if (existingReview) {
      //   existingReview.rating = rating; 
      //   existingReview.comments.push(comment); 
      //   await existingReview.save();
      // } else {
        const newReview = new Review({ productId, user, rating, comments: [comment] });
        await newReview.save();
      //}
      const reviews = await Review.find({ productId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = (totalRating / reviews.length).toFixed(2);
      product.averageRating = averageRating;
      await product.save();
      res.status(201).json({ message: 'Yorum eklendi veya güncellendi', averageRating, reviews });
    } catch (err) {
      res.status(400).json({ error: 'Yorum eklenemedi veya güncellenemedi: ' + err.message });
    }
  });
  
  router.put('/api/reviews/:reviewId', async (req, res) => {
    try {
      const { rating, comments } = req.body;
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Yorum bulunamadı.' });
      }
      review.rating = rating || review.rating || 0;
      if (comments) {
        review.comments.push(...comments);
      }
      await review.save();
      res.json({ message: 'Yorum güncellendi', review });
    } catch (err) {
      res.status(400).json({ error: 'Yorum güncellenemedi: ' + err.message });
    }
  });
  
  router.delete('/product/:productId/user/:userId', async (req, res) => {
    try {
      const { productId, userId } = req.params;
      const deletedReviews = await Review.deleteMany({ productId: productId, 'user.id': userId });
      if (deletedReviews.deletedCount === 0) {
        return res.status(404).json({ message: 'Bu ürün için bu kullanıcıya ait yorum bulunamadı.' });
      }
      res.json({ message: `${deletedReviews.deletedCount} yorum silindi.` });
    } catch (err) {
      res.status(500).json({ error: 'Yorumlar silinemedi: ' + err.message });
    }
  });
  
  router.delete('/:productId/:userId/comment', async (req, res) => {
    try {
      const { comment } = req.body;
      const review = await Review.findOne({ productId: req.params.productId, 'user.id': req.params.userId });
      if (!review) {
        return res.status(404).json({ message: 'Yorum bulunamadı.' });
      }
      const commentIndex = review.comments.indexOf(comment);
      console.log({commentIndex});
      
      if (commentIndex !== -1) {
        review.comments.splice(commentIndex, 1);
        await review.save();
        return res.json({ message: 'Yorum silindi', review });
      } else {
        return res.status(401).json({ message: 'Silinmek istenen yorum bulunamadı.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Yorum silinemedi: ' + err.message });
    }
});
  

module.exports = router;

