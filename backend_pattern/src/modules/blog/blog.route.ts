import { Router } from 'express';
import * as blogController from './blog.controller';
import { CreateBlogSchema, UpdateBlogSchema, BlogQuerySchema } from '../../common/validators/blog.validator';
import { protect, restrictTo } from '../../common/middleware';
import { validateWithZod } from '../../common/middleware/zod-validate.middleware';

const router = Router();

// Public routes
router.get('/', validateWithZod(BlogQuerySchema, 'query'), blogController.getAllBlogs);
router.get('/slug/:slug', blogController.getBlogBySlug);
router.get('/:id', blogController.getBlogById);

// Protected routes (Admin only)
router.post('/', protect, restrictTo('admin'), validateWithZod(CreateBlogSchema), blogController.createBlog);
router.put('/:id', protect, restrictTo('admin'), validateWithZod(UpdateBlogSchema), blogController.updateBlog);
router.delete('/:id', protect, restrictTo('admin'), blogController.deleteBlog);

export default router;
