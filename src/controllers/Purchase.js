const Purchase = require("../models/Purchase");
const allowedFilters = ["brandName", "category"];
const allowedConditions = ["in"];

async function save(req, res) {
  const purchase = new Purchase(req.body);
  purchase.customerId = req.customerId;
  try {
    const savedPurchase = await purchase.save();
    res.status(201).send(savedPurchase);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getAllOrders(req, res) {
  try {
    const { errors, filterCondition } = __prepareSortAndFilterQuery(req.body);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    //Adding default condition for the customerId.
    filterCondition.unshift({ customerId: { $eq: req.customerId } });
    const purchases = await Purchase.find({ $and: filterCondition });

    if (!purchases) {
      return res.sendStatus(404);
    }
    res.status(200).send(purchases);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

async function getOrderById(req, res) {
  try {
    const purchase = await Purchase.findById(req.query.id);
    if (!purchase) {
      return res.sendStatus(404);
    }
    res.status(200).send(purchase);
  } catch (err) {
    console.error(err);
    res.send(400);
  }
}

function __prepareSortAndFilterQuery(body) {
  const filterCondition = [];
  const errors = [];
  if (body.filters) {
    Object.keys(body.filters).forEach((k) => {
      if (allowedFilters.includes(k)) {
        if (
          body.filters[k].condition &&
          allowedConditions.includes(body.filters[k].condition)
        ) {
          if (body.filters[k].values && body.filters[k].values.length > 0) {
            filterCondition.push({ [k]: { $in: body.filters[k].values } });
          } else {
            errors.push(`Values for filter ${k} should at least be one`);
          }
        } else {
          errors.push(`Condition for filter ${k} is not valid`);
        }
      } else {
        errors.push(`Can not filter on property ${k}`);
      }
    });
  }
  return { errors, filterCondition };
}

module.exports = {
  save,
  getAllOrders,
  getOrderById,
};
