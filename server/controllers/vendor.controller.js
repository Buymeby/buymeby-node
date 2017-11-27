import Vendor from '../models/vendor';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getVendors(req, res) {
  Vendor.find().sort('-dateAdded').exec((err, vendors) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ vendors });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addVendor(req, res) {
  if (!req.body.vendor.name || !req.body.vendor.hours || !req.body.vendor.description || !req.body.vendor.latitude || !req.body.vendor.longitude ) {
    return res.status(403).end();
  }

  const newVendor = new Vendor(req.body.vendor);

  // Let's sanitize inputs
  newVendor.name = sanitizeHtml(newVendor.name);
  newVendor.hours = sanitizeHtml(newVendor.hours);
  newVendor.description = sanitizeHtml(newVendor.description);
  newVendor.latitude = sanitizeHtml(newVendor.latitude);
  newVendor.longitude = sanitizeHtml(newVendor.longitude);

  newVendor.cuid = cuid();
  newVendor.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ vendor: saved });
  });
}
