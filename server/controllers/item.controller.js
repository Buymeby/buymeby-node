import Item from '../models/item';
import Vendor from '../models/vendor';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getItems(req, res) {
  Item.find().sort('-dateAdded').exec((err, items) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ items });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addItem(req, res) {
  if (!req.body.item.name ||
      !req.body.item.price ||
      !req.body.item.quantity ||
      !req.body.item.description ||
      !req.body.item.discount_ratio ||
      !req.body.item.category ||
      !req.body.item.vendor_id) {
    res.status(403).end();
  }

  Vendor.findOne({cuid: req.body.item.vendor_id}).exec((err, vendor) => {
    if (err) {
      return res.status(500).send(err);
    }

    const newItem = new Item(Object.assign({vendor: vendor._id}, req.body.item));

    // Let's sanitize inputs
    newItem.price = sanitizeHtml(newItem.price);
    newItem.name = sanitizeHtml(newItem.name);
    newItem.quantity = sanitizeHtml(newItem.quantity);
    newItem.description = sanitizeHtml(newItem.description);
    newItem.discount_ratio = sanitizeHtml(newItem.discount_ratio);
    newItem.category = sanitizeHtml(newItem.category);

    newItem.cuid = cuid();
    newItem.save((err, saved) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ item: saved });
    });
  })
}
