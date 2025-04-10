//user controller

import connection from "../database/connection.js";
import generalResponse from "../helpers/generalResponse.js";

export const homePage = async (req, res) => {
  res.render("user/home");
};

export const cartPage = async (req, res) => {
  res.render("user/cart");
};

export const productListngPage = async (req, res) => {
  res.render("user/shopProduct.ejs");
};

export const singleProductDetailPage = (req, res) => {
  res.render("user/singleProductView.ejs");
};

export const shopByCategories = async (req, res) => {
  res.render("user/shopByCategory.ejs");
};

export const checkoutPage = async (req, res) => {
  res.render("user/checkout"); //ravi
};

export const wishlistPage = async (req, res) => {
  res.render("user/wishlist"); //ravi
};

export const fetchAdresssForCheckoutApi = async (req, res) => {

  try{

  }catch(err){
    // generalResponse(res, 500, "Internal Server Error", err.message);
    res.status(400).send(generalResponse("something went wrong"))

  }
  // console.log(req.query, "this is query");
  let qry = `SELECT ut.user_id,ut.first_name, ut.last_name, uat.address, uat.pin_code, uat.city, uat.state
FROM user_table ut
 JOIN user_address_table uat
ON ut.user_id = uat.user_id where ut.user_id = 1;`;

  let [result] = await connection.query(qry);
  // console.log(result, "res");

  res.status(201).json(generalResponse("done", result));
};

export const wishListData = async (req, res) => {

  try{
    let qry = `SELECT w.wishlist_id, w.user_id, w.vendor_product_id, w.created_at AS wishlist_created_at,
       v.product_name, v.price, v.stock, v.available_stock, v.description, v.image_path
FROM wishlist_table w
JOIN vendor_product_details v ON w.vendor_product_id = v.vendor_product_id
WHERE w.user_id = 1; `;

  let [result] = await connection.query(qry);
  // console.log(result, "resssssssssssssss");
  res.status(200).send(generalResponse("done", result));
  }catch(err){
    res.status(400).send(generalResponse("something went wrong"));
  }
  
};

export const productDetail = async (req, res) => {
  try {
    let [result] = await connection.query(`
                        SELECT * FROM vendor_product_details`);

    // console.log(result);
    res
      .status(200)
      .send(generalResponse("Data fetched from vendor details", result));
  } catch (err) {
    console.log(err);
    res.status(404).send(generalResponse(false));
  }
};

export const singleProductDetail = async (req, res) => {
  let vendorProductId = req.query.id;
  console.log("vendor product id = ", vendorProductId);

  try {
    let [result] = await connection.query(`SELECT * FROM vendor_product_details WHERE vendor_product_id = ${vendorProductId}`);

    console.log(result);
    res
      .status(200)
      .send(generalResponse("Data fetched from vendor details", result));
  } catch (err) {
    console.log(err);
    res.status(404).send(generalResponse(false));
  }
};

export const addInWishlist = async (req, res) => {
  let data = req.body;
  console.log(data);

  let productId = data.productId;
  let userId = data.userId;

  try {
    let [result] = await connection.query(
      `INSERT INTO wishlist_table (vendor_product_id,user_id) VALUES (${productId},${userId})`
    );

    // console.log(result);
    res.status(200).send(generalResponse("Product added in wishlist", true));
  } catch (err) {
    console.log(err);
    res.status(404).send(generalResponse("Product already in wishlist", false));
  }
};

export const addInCart = async (req, res) => {
  let data = req.body;
  console.log(data);

  let productId = data.productId;
  let userId = data.userId;
  let categoryId = data.categoryId;

  try {
    let [result] = await connection.query(
      `INSERT INTO cart (category_id ,vendor_product_id,user_id) VALUES (${categoryId},${productId},${userId})`
    );

    // console.log(result);
    res
      .status(200)
      .send(generalResponse("Data inserted into cart table", result));
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") {
      let query = `update cart set quantity = quantity + 1 where user_id = 1 AND vendor_product_id = 1;`;
      let [result] = await connection.query(query);
      res.status(200).json(generalResponse("done", true));
    } else {
      res.status(400).json(generalResponse(err.message, false));
    }
  }
};

export const getCategoryData = async (req, res) => {
  try {
    let [result] = await connection.query(
      `SELECT * FROM categories WHERE parent_cat_id =0`
    );
    res
      .status(200)
      .send(generalResponse("Data fetched from categories table", result));
  } catch (err) {
    console.log(err);
    res.status(404).send(generalResponse(false));
  }
};

export const singleCategoryProducts = async (req, res) => {
  let categoryId = req.query.id;
  console.log(categoryId);
  try {
    let [result] = await connection.query(
      `SELECT * FROM vendor_product_details where category_id =${categoryId}`
    );

    // console.log(result);
    res
      .status(200)
      .send(generalResponse("Data fetched from vendor details", result));
  } catch (err) {
    console.log(err);
    res.status(404).send(generalResponse(false));
  }
};

export const cartDataApi = async (req, res) => {
  try {
    let qry = `SELECT c.cart_id, v.description, c.user_id, c.quantity, c.vendor_product_id, v.product_name, v.price,v.image_path
    FROM cart c
    JOIN vendor_product_details v ON c.vendor_product_id = v.vendor_product_id
    WHERE c.user_id = 1 AND c.is_deleted = 0;`;

    let [result] = await connection.query(qry);
    console.log(result);

    res.status(200).json(generalResponse("done", result));
  } catch (error) {
    // console.log(error);
    if (err.code == "ER_DUP_ENTRY") {
      let query = `update cart set quantity = quantity + 1 where user_id = 1 AND vendor_product_id = 1;`;
      let [result] = await connection.query(query);
      res.status(200).json(generalResponse("done", result));
    } else {
      res.status(400).json(generalResponse(error.message, null));
    }
  }
};

export const removeItemFromCartApi = async (req, res) => {
  console.log(req.body,"remove cart id")
  let cartId = req.body.cart_id
try{
  let qry = `UPDATE cart
SET is_deleted = 1
WHERE cart_id= ${cartId};`;

let [result] = await connection.query(qry);
res.status(200).json(generalResponse("done"));
}catch(err){
  console.log(err)
  res.status(400).json(generalResponse("something went wrong"));
  
}
  
};


// export const beforeCheckoutPageQuantityCheckApi = async (req, res) => {
//   let data = req.body
//   console.log(data,"jjjjjjjjjj")
//   let sqlId = ''
// for(let item of data){
//     sqlId += item.venderProductId + ","

// }
// // console.log(sqlId,"kkk")
// let sq_ids = sqlId.slice(0,sqlId.length-1)
// // console.log(sq_ids,"lklklkl")

 
//   let qry = `SELECT stock
// FROM vendor_product_details
// WHERE vendor_product_id IN (${sq_ids});`
   
// let [result] = await connection.query(qry);
// console.log(result,"result")

//   console.log(req.body)
// };


export const  beforeCheckoutPageQuantityCheckApi = async (req, res) =>{

  const quantities = req.body; 
  console.log(quantities,"qun")


  try {


      const vendorProductIds = quantities.map(item => item.venderProductId);



      const [rows] = await connection.query(

          `SELECT vendor_product_id, available_stock FROM vendor_product_details 

           WHERE vendor_product_id IN (?)`,

          [vendorProductIds]

      );



      const stockMap = {};

      rows.forEach(row => {

          stockMap[row.vendor_product_id] = row.available_stock;

      });
      console.log(stockMap,"stockmap")



      const errors = [];

      quantities.forEach(item => {

          const availableStock = stockMap[item.venderProductId];

          if (availableStock === undefined) {

              errors.push(`Product ID ${item.venderProductId} does not exist.`);

          } else if (item.quantity > availableStock) {

              errors.push(` Insufficient stock for ##${item.venderProductId}## Available: ${availableStock}, Requested: ${item.quantity}`);

          }

      });



      if (errors.length > 0) {
        console.log(errors)

          return res.status(202).json(generalResponse(false,errors));

      }


      return res.status(200).json(generalResponse(`All quantities are valid`));


  } catch (error) {

      console.error('Database error:', error);

      return res.status(500).json({ success: false, message: 'Internal server error.' });

  }

}



export const postCategoryData = async (req, res) => {
  try {
    let [result] = await connection.query(`select * from categories where parent_cat_id = (?)`, [req.body.id]);
    res.status(200).json(generalResponse("done", result));
  } catch (error) {
    res.status(400).json(generalResponse(error.message, null));
  }

}

export const allReviews = async (req, res) => {
  let productId = req.body.productId;
  console.log("Product id = ", productId);

  let userId = req.body.userId;
  console.log("Current user id : ", userId);

  try {
    let [result] = await connection.query(`SELECT  ut.user_id, ut.first_name , 
                                                ut.last_name , rt.image_path,
                                                rt.review_rating,rt.review_text
                                                FROM review_table rt JOIN 
                                                user_table ut ON 
                                                rt.user_id = ut.user_id 
                                                where rt.vendor_product_id =${productId}`);

    let [containUser] = await connection.query(
      `Select order_id FROM order_details WHERE user_id =${userId}`
    );
    console.log("Is order detail contains user = ", containUser.length);

    if (containUser.length > 0) {
      res.status(200).send(
        generalResponse("Data fetched from reviews", {
          result: result,
          canUserReview: true,
        })
      );
    } else {
      res.status(200).send(
        generalResponse("Data fetched from reviews", {
          result: result,
          canUserReview: false,
        })
      );
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(404).send(generalResponse(false));
  }
};

export const aboutUsPage = async (req, res) => {
  res.render("user/aboutUs");
};

export const contactUs = async (req, res) => {
  res.render("user/contactUs");
};

export const privacyPolicy = async (req, res) => {
  res.render("user/privacyPolicy");
};


// dynamic t and c
export const termsAndConditions = async (req, res) => {
  res.render("user/T&C");
};
export const posttermsAndConditions = async (req,res) => {
  try {
    let query = `select * from dynamic_data where values_for = "terms-and-condition" and  is_deleted = "0"`
    let [result] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("t&c fetched" , result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
}
export const postprivacypolicy = async (req,res) => {
  try {
    let query = `select * from dynamic_data where values_for = "privacy-policy" and  is_deleted = "0"`
    let [result] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("privacy policies fetched" , result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
}
