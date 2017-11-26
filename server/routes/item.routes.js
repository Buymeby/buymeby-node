import { Router } from 'express';
import * as ItemController from '../controllers/item.controller';
const router = new Router();

// Get all Items
router.route('/items').get(ItemController.getItems);

// Get one vendor by cuid
// router.route('/item/:cuid').get(ItemController.getItem);

// Add a new Item
router.route('/items').post(ItemController.addItem);

export default router;
