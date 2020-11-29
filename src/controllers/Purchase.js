const Purchase = require("../models/Purchase");
const allowedFilters = ["brandName", "category"];
const allowedFilterConditions = ["in"];
const allowedSortParameters = ["totalPurchaseAmount", "brandName", "time"];

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

function getAllOrders(req, res) {
  try {
    const { errors, filterCondition } = __prepareFilterQuery(req.body);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    //Adding default condition for the customerId.
    filterCondition.unshift({ customerId: { $eq: req.customerId } });

    const { sortErrors, sortCondition } = __prepareSortQuery(req.body);
    if (sortErrors.length > 0) {
      return res.status(400).send(sortErrors);
    }

    Purchase.find({ $and: filterCondition })
      .sort(sortCondition)
      .exec((err, purchases) => {
        if (err) {
          throw err;
        }
        if (!purchases) {
          return res.sendStatus(404);
        }
        res.status(200).send(purchases);
      });
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

function __prepareFilterQuery(body) {
  const filterCondition = [];
  const errors = [];
  if (body.filters) {
    for (k in body.filters) {
      if (allowedFilters.includes(k)) {
        if (
          body.filters[k].condition &&
          allowedFilterConditions.includes(body.filters[k].condition)
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
    }
  }
  return { errors, filterCondition };
}

function __prepareSortQuery(body) {
  const sortCondition = {},
    sortErrors = [];
  //Adding default sort
  if (body.sort) {
    for (k in body.sort) {
      if (allowedSortParameters.includes("totalPurchaseAmount")) {
        if (body.sort[k].toUpperCase() === "ASC") {
          sortCondition[k] = 1;
        } else if (body.sort[k].toUpperCase() === "DESC") {
          sortCondition[k] = -1;
        } else {
          sortErrors.push(`Condition for sort ${k} is not valid`);
        }
      } else {
        sortErrors.push(`Can not sort on property ${k}`);
      }
    }
  } else {
    sortCondition._id = -1;
  }
  return { sortErrors, sortCondition };
}

module.exports = {
  save,
  getAllOrders,
  getOrderById,
};
