import { Router } from 'express';
import * as VendorController from '../controllers/vendor.controller';
const router = new Router();

// Get all Vendors
router.route('/vendors').get(VendorController.getVendors);

// Get one vendor by cuid
router.route('/vendors/:cuid').get(VendorController.getVendor);

// Add a new Vendor
router.route('/vendors').post(VendorController.addVendor);

export default router;
