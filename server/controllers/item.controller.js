import Item from '../models/item';
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
  if (!req.body.item.name || !req.body.item.price || !req.body.item.quantity || !req.body.item.description || !req.body.item.discount_ratio) {
    res.status(403).end();
  }

  const newItem = new Post(req.body.item);

  // Let's sanitize inputs
  newItem.price = sanitizeHtml(newItem.price);
  newItem.name = sanitizeHtml(newItem.name);
  newItem.quantity = sanitizeHtml(newItem.quantity);
  newItem.description = sanitizeHtml(newItem.description);
  newItem.discount_ratio = sanitizeHtml(newItem.discount_ratio);

  newItem.cuid = cuid();
  newItem.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ item: saved });
  });
}
