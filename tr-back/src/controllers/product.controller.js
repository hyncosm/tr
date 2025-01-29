const mongoose = require("mongoose");
const { Product } = require("../models");
const { ObjectId } = require("mongodb");

const deleteProduct = async (req, res) => {
  console.log("/DELETE product")
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.error(err);
    } else {
      return res.status(200).json('Document deleted');
    }
  });
}

const getProductsByFilter = async (req, res) => {
  console.log("/GET product by filter")
  try {
    const { main_categories, sub_categories, gender, marques } = req.query;
    let query = {};
    if (main_categories) {
      query["category.main"] = { $in: main_categories };
    }
    if (sub_categories) {
      query["category.sub"] = { $in: sub_categories };
    }
    if (marques) {
      query["brand"] = { $in: marques };
    }
    if (gender) {
      query["genders"] = { $in: [gender] };
    }
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

const alterProduct = async (req, res) => {
  console.log("/UPDATE product")
  const { product } = req.body;

  const query = {
    _id: mongoose.Types.ObjectId(product._id),
  },
    update = product,
    options = {
      upsert: true,
      new: true,
    };
  Product.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) {
      console.log("An error occured : ", error);
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(result);
    }
  });
};

const getProductsByBestSeller = async (req, res) => {
  console.log("/GET product by best seller")
  Product.find({ bestSeller: "true" }).sort({ createdAt: -1 })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getProducts = async (req, res) => {
  console.log("/GET products")
  try {
    const { limit, page, categorie, subCategorie, inputSearch, sex, marque } = req.query;

    let query = {};
    if (inputSearch) {
      query["owner.name"] = { $regex: inputSearch, $options: "i" };
    }
    if (categorie) {
      query["category.main"] = categorie;
    }
    if (subCategorie) {
      query["category.sub"] = subCategorie;
    }
    if (marque) {
      query["owner.name"] = marque;
    }
    if (sex) {
      query["genders"] = sex;
    }
    const _page = parseInt(page)
    const _limit = parseInt(limit)
    const total = await Product.countDocuments(query);
    const pages = Math.floor(total / _limit);

    Product.find(query)
      .limit(_limit)        // Limit the results to 10 posts per page
      .skip((_page - 1) * _limit)
      .sort({ createdAt: -1 })
      .then((result) => {
        return res.status(200).json({
          result,
          pagination: {
            total,    // Total number of posts
            page,
            pages
          }
        });
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ error });
      });
  } catch (error) { console.log(error) }
};

const getProductsById = async (req, res) => {
  console.log("/GET product by id")
  const { id } = req.params;
  Product.findById(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

const getProductOwners = async (req, res) => {
  console.log("/GET product brands")
  try {
    const uniqueOwnerNames = await Product.aggregate([
      { $group: { _id: "$owner.name" } },
      { $project: { _id: 0, name: "$_id" } },
    ]);

    const ownerNames = uniqueOwnerNames.map((owner) => owner.name);
    res.status(200).json(ownerNames);
  } catch (error) {
    console.error("Error fetching unique owner names:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProductsByFilter,
  alterProduct,
  getProducts,
  getProductsById,
  getProductsByBestSeller,
  getProductOwners,
  deleteProduct
};
