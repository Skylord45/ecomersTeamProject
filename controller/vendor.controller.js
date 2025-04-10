// Example route for getting the dashboard page
import connection from "../database/connection.js";
import generalResponse from "../helpers/generalResponse.js";
import multer from "multer";
import { uploadImages } from "../middleware/multerValidation.js";
import { uploadOnCloude } from "../middleware/cloudinary.js";
import { validateVendorProduct } from "../middleware/joiValidation.js";

export const getVendorDashboard = (req, res) => {
  res.render("vendor/dashboard");
};

export const getProducts = (req, res) => {
  res.render("vendor/listProducts");
};

export const showAllProducts = async (req, res) => {
  try {
    const [showProductsResult] = await connection.query(
      `SELECT * FROM vendor_product_details where vendor_id = ?`,
      [1]
    );
    console.log("abc");
    console.log(showProductsResult);
    return res
      .status(200)
      .json(
        generalResponse("show vendor details", {
          success: true,
          showProductsResult,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const getOrderChartData = async (req, res) => {
  try {
    const [orderChartDetails] = await connection.query(
      `select products_name , COUNT(order_id) AS TotalOrders FROM products LEFT JOIN order_details on products.products_id = order_details.product_id WHERE vendor_id = 1 GROUP BY products.products_name `
    );

    console.log("OrderChartDetails", orderChartDetails);
    return res
      .status(200)
      .json(
        generalResponse("Details of Order chart", {
          success: true,
          orderChartDetails,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const getInventoryChartData = async (req, res) => {
  try {
    const [getInventoryChartData] = await connection.query(
      `select product_name , available_stock from vendor_product_details where vendor_id = ?`,
      [1]
    );
    console.log("getInventoryChartData", getInventoryChartData);
    return res
      .status(200)
      .json(
        generalResponse("Details of Inventory chart", {
          success: true,
          getInventoryChartData,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const getShippingData = async (req, res) => {
  try {
    const [shippingStatusResult] = await connection.query(
      `select shipment_status , COUNT(order_details.order_id) as totalorders FROM shipment_details LEFT JOIN order_details on shipment_details.order_id = order_details.order_id WHERE order_details.vendor_id = ? GROUP BY shipment_status`,
      [1]
    );
    console.log("shipping Status Result", shippingStatusResult);
    return res
      .status(200)
      .json(
        generalResponse("Details of Shipping status", {
          success: true,
          shippingStatusResult,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const addProducts = (req, res) => {
  res.render("vendor/addProducts");
};

export const getCategories = async (req, res) => {
  try {
    // You can modify the query to fetch categories based on your requirements
    const query = `SELECT * FROM categories WHERE cat_id = ?`;
    const categoryId = req.query.cat_id || 2; // Default to 2 if no cat_id is provided
    const [categoryResult] = await connection.query(query, [categoryId]);

    console.log(categoryResult);
    return res
      .status(200)
      .json(
        generalResponse("Main category detail", {
          success: true,
          categoryResult,
        })
      );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res
      .status(500)
      .json(
        generalResponse("An error occurred while fetching categories.", {
          success: false,
        })
      );
  }
};

export const getSubCategory = async (req, res) => {
  console.log(req.body);

  try {
    const query1 = `SELECT * FROM categories where parent_cat_id = ${req.body.category_id}`;
    const [subCategoryResult] = await connection.query(query1);
    console.log(subCategoryResult);
    return res
      .status(200)
      .json(
        generalResponse("sub category detail", {
          success: true,
          subCategoryResult,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const productsData = async (req, res) => {
  uploadImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      //   code: 'LIMIT_UNEXPECTED_FILE',
      console.log("multer err:", err);

      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json(
            generalResponse("You can upload a maximum of 10MB images total.", {
              success: false,
            })
          );
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json(
            generalResponse("You can upload a maximum of 5 images.", {
              success: false,
            })
          );
      }
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("unknown err:", err);
    }

    // Everything went fine.
    console.log(req.body);
    console.log(req.files);

    // Validate uploaded images
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json(generalResponse("Please upload images.", { success: false }));
    }

    // Validate product data using Joi
    const validation = await validateVendorProduct(req.body);
    if (validation.error) {
      const messageOfError = validation.error.details[0]["message"];
      return res
        .status(400)
        .json(generalResponse(messageOfError, { success: false }));
    }

    let fileArray = req.files;
    console.log(fileArray.length);

    let allImageUrlString = "";
    for (let i = 0; i < fileArray.length; i++) {
      let path = fileArray[i].path;

      let image = await uploadOnCloude(path);

      // console.log('cloudinary image:',image);

      if (i == 0) {
        allImageUrlString = image.secure_url;
      } else {
        allImageUrlString += `,${image.secure_url}`;
      }
    }

    console.log("allImageUrlString:", allImageUrlString);

    let data = req.body;
    try {
      const query = `SELECT cat_name FROM categories WHERE cat_id = ?`;
      const [SelectCatNameResult] = await connection.query(query, [
        data.category,
      ]);
      console.log("SelectCatNameResult:", SelectCatNameResult);

      const parentCatName = SelectCatNameResult[0].cat_name;

      const query1 = `INSERT INTO vendor_product_details (category_id, parent_cat_name, vendor_id, product_name, stock, price, available_stock, description, image_path, size, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [insertVendorProductResult] = await connection.query(query1, [
        data.subCategory3,
        parentCatName,
        "1",
        data.title,
        data.stock,
        data.price,
        data.stock,
        data.description,
        allImageUrlString,
        data.size,
        data.color,
      ]);
      console.log("insertVendorProductResult:", insertVendorProductResult);
      let vendorProductId = insertVendorProductResult.insertId;

      const query2 = `INSERT INTO products (product_name, vendor_product_id, price, description) VALUES (?, ?, ?, ?)`;

      for (let i = 0; i < data.stock; i++) {
        var [insertProductResult] = await connection.query(query2, [
          data.title,
          vendorProductId,
          data.price,
          data.description,
        ]);
      }
      console.log("insertProductResult:", insertProductResult);

      return res
        .status(200)
        .json(generalResponse("product added successfully", { success: true }));
    } catch (error) {
      console.log(error);
    }
  });
};

export const renderEditProduct = async (req, res) => {
  res.render("vendor/editProduct");
};

export const getProductDetail = async (req, res) => {
  console.log("in getProductDetails");
  let vendorProductID = req.query.vendorProductID;
  console.log("Vendor Product id ", vendorProductID);
  try {
    const [editProductDeatilResult] = await connection.query(
      `select * from vendor_product_details where vendor_product_id = ?`,
      [vendorProductID]
    );
    console.log("editProductDeatilResult", editProductDeatilResult);
    return res
      .status(200)
      .json(
        generalResponse("Details of Product", {
          success: true,
          editProductDeatilResult: editProductDeatilResult,
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const postProductDetails = async (req, res) => {
  uploadImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer error:", err);
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json(
            generalResponse("You can upload a maximum of 10MB images total.", {
              success: false,
            })
          );
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json(
            generalResponse("You can upload a maximum of 5 images.", {
              success: false,
            })
          );
      }
    } else if (err) {
      console.log("Unknown error:", err);
      return res
        .status(500)
        .json(
          generalResponse("An unknown error occurred.", { success: false })
        );
    }

    // // Validate uploaded images
    // if (!req.files || req.files.length === 0) {
    //   return res
    //     .status(400)
    //     .json(generalResponse({ success: false }, "Please upload images."));
    // }

    // Validate product data using Joi
    // const validation = await validateVendorProduct(req.body);
    // if (validation.error) {
    //   const messageOfError = validation.error.details[0]["message"];
    //   return res
    //     .status(400)
    //     .json(generalResponse({ success: false }, messageOfError));
    // }

    // Upload images to Cloudinary
    let allImageUrlString = await Promise.all(
      req.files.map((file) => uploadOnCloude(file.path))
    ).then((images) => images.map((image) => image.secure_url).join(","));

    const data = req.body;
    const vendorProductID = req.query.vendorProductID;

    try {
      // Update vendor product details
      await connection.query(
        `UPDATE vendor_product_details SET product_name = ?, description = ? WHERE vendor_product_id = ?`,
        [data.title, data.description, vendorProductID]
      );

      // Update products
      await connection.query(
        `UPDATE products SET products_name = ?, description = ? WHERE vendor_product_id = ?`,
        [data.title, data.description, vendorProductID]
      );

      return res
        .status(200)
        .json(
          generalResponse("Product data updated successfully.", {
            success: true,
          })
        );
    } catch (error) {
      console.error("Database error:", error);
      return res
        .status(500)
        .json(
          generalResponse("An error occurred while updating the product.", {
            success: false,
          })
        );
    }

    // If you want to insert a new product instead, you can uncomment the following code
    /*
    try {
      const query = `SELECT cat_name FROM categories WHERE cat_id = ?`;
      const [SelectCatNameResult] = await connection.query(query, [data.category]);
      const parentCatName = SelectCatNameResult[0].cat_name;

      const query1 = `INSERT INTO vendor_product_details (category_id, parent_cat_name, vendor_id, product_name, stock, price, available_stock, description, image_path, size, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [insertVendorProductResult] = await connection.query(query1, [data.subCategory3, parentCatName, '1', data.title, data.stock, data.price, data.stock, data.description, allImageUrlString, data.size, data.color]);
      const vendorProductId = insertVendorProductResult.insertId;

      const query2 = `INSERT INTO products (product_name, vendor_product_id, price, description) VALUES (?, ?, ?, ?)`;
      for (let i = 0; i < data.stock; i++) {
        await connection.query(query2, [data.title, vendorProductId, data.price, data.description]);
      }

      const query3 = `INSERT INTO vendor_stock_history (vendor_product_id, total_previous_stock, total_available_stock, added_stock, price) VALUES (?, ?, ?, ?, ?)`;
      await connection.query(query3, [vendorProductId, 0, data.stock, 0, data.price]);

      return res.status(200).json(generalResponse({ success: true }, "Product added successfully."));
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json(generalResponse({ success: false }, "An error occurred while adding the product."));
    }
    */
  });
};

export const editStock = async (req, res) => {
  try {
    let vendorProductID = req.body.VendorProductID;
    let inputValue = req.body.inputValue;

    console.log(
      "id of submit stock button(Vendor Product ID)",
      vendorProductID
    );
    console.log("Input value of stock", inputValue);

    const [selectStockDetail] = await connection.query(
      `select stock , available_stock, price FROM vendor_product_details where vendor_product_id = ?`,
      [vendorProductID]
    );
    console.log(
      "SELECT STOCK DETAILS RESULT BEFORE UPDATING",
      selectStockDetail
    );

    let stock = selectStockDetail[0].stock;
    console.log("stock is ", stock);
    let available_stock = selectStockDetail[0].available_stock;
    console.log("Available stock", available_stock);
    let price = selectStockDetail[0].price;
    console.log(price);

    const [insertStockHistory] = await connection.query(
      `insert into vendor_stock_history(vendor_product_id , total_previous_stock , total_available_stock , added_stock ,price) VALUES(?,?,?,?,?)`,
      [vendorProductID, stock, available_stock, inputValue, price]
    );

    const [updateStock] = await connection.query(
      `update vendor_product_details SET stock = stock + ${inputValue} ,available_stock = available_stock + ${inputValue}  where vendor_product_id = ?`,
      [vendorProductID]
    );

    return res
      .status(200)
      .json(generalResponse("Added stock successfully", { success: true }));
  } catch (error) {
    console.log(error);
  }
};

export const getcontacttoadmin = async (req, res) => {
  try {
    return res.render("vendor/contacttoadmin");
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

export const postcontacttoadmin = async (req, res) => {
  try {
    // fetch vendorname using middleware
    let vendor = "vendorr";
    let query = `INSERT INTO notification_details(notification_created_by,notification_for,notification_subject,notification_content)
        VALUES
        ("${vendor}","${req.body.admin}","${req.body.Subject}","${req.body.Content}")`;
    let [createnotificationn] = await connection.query(query);
    return res.status(200).json(generalResponse("notification seneded"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
export const getnotifications = async (req, res) => {
  try {
    return res.render("vendor/notifications");
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

export const getincomingnotification = async (req, res) => {
  try {
    return res.render("admin/incomingnotification");
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

export const fetchnotificationsforvendorreaded = async (req, res) => {
  // fetch vendor using jwt decoding
  let vendor = "abc@gmail.com";
  try {
    let query = `select * from notification_details where (notification_for = "${vendor}" or notification_for = "all") and notification_is_readed= "1"`;
    let [fetchnotificationsforadminn] = await connection.query(query);
    return res
      .status(200)
      .json(
        generalResponse("notifications fetched", fetchnotificationsforadminn)
      );
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
export const fetchnotificationsforvendorunreaded = async (req, res) => {
  let vendor = "abc@gmail.com";
  try {
    let query = `select * from notification_details where (notification_for = "${vendor}" or notification_for = "all") and notification_is_readed= "0"`;
    let [fetchnotificationsforadminn] = await connection.query(query);
    return res
      .status(200)
      .json(
        generalResponse("notifications fetched", fetchnotificationsforadminn)
      );
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

export const postmarkasread = async (req, res) => {
  try {
    let query = `UPDATE notification_details SET notification_is_readed = "1" where notification_id = "${req.body.id}"`;
    let [markasreadmsg] = await connection.query(query);
    return res.status(200).json(generalResponse("success"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
export const postmarkasreadall = async (req, res) => {
  // fetch vendor using jwt decoding
  let vendor = "abc@gmail.com";
  try {
    let query = `UPDATE notification_details SET notification_is_readed = "1" where notification_for = "${vendor}"`;
    let [markasreadmsg] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("all notification marked as readed"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
