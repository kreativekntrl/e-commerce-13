const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single tag
router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });

    if (!tagsData) {
      res.status(404).json({
        message: 'No Tags found with that id!'
      });
      return;
    }

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE tag by id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,
    }, {
      where: {
        id: req.params.id,
      },
    }, );

    res.json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a Tag
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deletedTag) {
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
