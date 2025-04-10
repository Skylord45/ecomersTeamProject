import connection from "../database/connection.js";
import generalResponse from "../helpers/generalResponse.js";


///////////////////admin dashboard/////////////

// controller for control dashboard operations



// controller for render main dashboard page
export const dashboardControl = async (req, res) => {
  res.render("./admin/dashboard");
};



// controller for order data
export const orderOverView = async (req, res) => {
  try {
    let sqlorder_details = `select count(*) as cnt,order_status from order_details group by order_status`;

    let [results] = await connection.query(sqlorder_details);

    return res.status(200).json(generalResponse("Data of Order's", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching order details ${error.message}`,
    });
  }
};



// controller for vendor data
export const vendorOverView = async (req, res) => {
  try {
    let sqlvendor_details = `select count(*) as cnt, ca.cat_name
                            from vendor_details as vd
                            join categories as ca
                            on ca.cat_id = vd.cat_id
                            group by vd.cat_id;`;

    let [results] = await connection.query(sqlvendor_details);

    return res.status(200).json(generalResponse("Data of vendors", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching vendor details ${error.message}`,
    });
  }
};


// controller for sales data
export const salesOverView = async (req, res) => {
  try {
    let sqlsales_details = `select count(*) as cnt, ca.cat_name
                            from categories as ca
                            join products as pd
                            on ca.cat_id = pd.categories_id
                            join order_details as od
                            on pd.products_id = od.product_id
                            where od.order_status = "complete"
                            group by ca.cat_id;`;

    let [results] = await connection.query(sqlsales_details);

    return res.status(200).json(generalResponse("Data of sales", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching sales details ${error.message}`,
    });
  }
};


// controller for users data with pagination
export const usersOverView = async (req, res) => {

  let currentpage = req.query.page || 1;

  if (currentpage <= 1) {
    currentpage = 1;
  }

  try {
    let pageSize = 5;
    let offset = (currentpage - 1) * pageSize;

    let sqlusers_details = `select first_name,last_name,email from user_table order by created_at DESC limit ${pageSize} offset ${offset}`;
    let totalUser = `select count(*) as cnt from user_table`;

    let [totalPage] = await connection.query(totalUser);
    let totalNumberOfPage = Math.floor(totalPage[0].cnt / pageSize);
    let [results] = await connection.query(sqlusers_details);

    let data = {
      results: results,
      totalPage: totalNumberOfPage,
      currentpage: currentpage,
    };

    return res.status(200).json(generalResponse("Data of users", data));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching users details ${error.message}`,
    });
  }
};
//controller for product listing with pagination
export const productOverView = async (req, res) => {
  let currentpage = req.query.page || 1;

  if (currentpage <= 1) {
    currentpage = 1;
  }

  try {
    let pageSize = 5;
    let offset = (currentpage - 1) * pageSize;

    let sqlproduct_details = `select product_name,price,available_stock from vendor_product_details order by created_at DESC limit ${pageSize} offset ${offset} `;
    let totalProduct = `select count(*) as cnt from vendor_product_details`;

    let [results] = await connection.query(sqlproduct_details);
    let [totalPage] = await connection.query(totalProduct);

    let totalNumberOfPage = Math.floor(totalPage[0].cnt / pageSize);

    let data = {
      results: results,
      totalPage: totalNumberOfPage,
      currentpage: currentpage,
    };

    return res.status(200).json(generalResponse("Data of product", data));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching product details ${error.message}`,
    });
  }
};
// controller for analysis of expanse and profits
export const expenseAndProfiteOverView = async (req, res) => {
  try {
    let sqlexpense_details = `select sum(price) as total from products`;

    let [results] = await connection.query(sqlexpense_details);

    return res
      .status(200)
      .json(generalResponse("Data of profile & expense", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching profile & expense details ${error.message}`,
    });
  }
};

/////////// Admin > user dashboard /////////


//for render users page 
export const usersDetails = async (req, res) => {
  res.render("./admin/users");
};


// for render page of available product
export const availableProduct = async (req, res) => {
  res.render("./admin/availableProducts");
};


// fetch api to show user city details
export const userCityDetails = async (req, res) => {
  try {
    let sqlusers_details = `select count(*) as cnt, city from user_address_table group by city`;

    let [results] = await connection.query(sqlusers_details);

    return res
      .status(200)
      .json(generalResponse("Data of group by user city's ", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching group by user city's details ${error.message}`,
    });
  }
};

// fetch api to fetch data of product count using category
export const productDetails = async (req, res) => {
  try {
    let sqlproduct_details = `select count(*) as cnt, cts.cat_name 
                            from products as pd
                            join categories as cts
                            on pd.categories_id = cts.cat_id
                            group by pd.categories_id`;

    let [results] = await connection.query(sqlproduct_details);

    return res
      .status(200)
      .json(generalResponse("Data of product group by categories ", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching of product group by categories  ${error.message}`,
    });
  }
};
// fetch api to fetch data of product count using category = electronics
export const electronicsProductDetails = async (req, res) => {
  try {
    let sqlelectonics_details = `select count(*) as cnt,products_name from products where categories_id = 1 group by products_name`;

    let [results] = await connection.query(sqlelectonics_details);

    return res
      .status(200)
      .json(
        generalResponse(
          "Data of product group by categories in electronics",
          results
        )
      );
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching of product group by categories in electronics  ${error.message}`,
    });
  }
};
// fetch api to fetch data of product count using category = clothes
export const clothesProductDetails = async (req, res) => {
  try {
    let sqlclothes_details = `select count(*) as cnt,products_name from products where categories_id = 2 group by products_name`;

    let [results] = await connection.query(sqlclothes_details);

    return res
      .status(200)
      .json(
        generalResponse(
          "Data of product group by categories in clothes ",
          results
        )
      );
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching of product group by categories in clothes ${error.message}`,
    });
  }
};
// fetch api to list orders with pagination
export const OdersListing = async (req, res) => {

  let currentpage = req.query.page || 1;


  if (currentpage <= 1) {
    currentpage = 1;
  }

  try {

    let pageSize = 15;
    let offset = (currentpage - 1) * pageSize;

    let sqlorder_listing = `select ut.first_name, ut.last_name, pt.products_name, pt.price, od.order_status 
                            from order_details as od 
                            join user_table as ut
                            on ut.user_id = od.user_id
                            join products as pt
                            on pt.products_id = od.product_id
                            where pt.is_sold = 0 and od.order_status = "vendorVerification" or od.order_status = "complete" 
                            order by od.order_status
                            limit ${pageSize}
                            offset ${offset};`;
                
    let totalOrders = `select count(*) as cnt
                     from order_details as od 
                     join user_table as ut
                     on ut.user_id = od.user_id
                     join products as pt
                     on pt.products_id = od.product_id
                     where pt.is_sold = 0 and od.order_status = "vendorVerification" or od.order_status = "complete" 
                     order by od.order_status;`

    let [results] = await connection.query(sqlorder_listing);
    let [totalPage] = await connection.query(totalOrders);
    let totalNumberOfPage = Math.floor(totalPage[0].cnt / pageSize);
   

    let data = {
      results: results,
      totalPage: totalNumberOfPage,
      currentpage: currentpage,
    };

    return res
      .status(200)
      .json(
        generalResponse(
          "Data of product group by categories in clothes ",
          data
        )
      );
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching of product group by categories in clothes ${error.message}`,
    });
  }
};
// fetch api to totalOrders,totalUsers,totalSales orders with pagination
export const getCardData = async (req, res) => {
  try {
    let totalOrders = `select count(*) as cnt from order_details`;
    let totalUsers = `select count(*) as cnt from user_table`;
    let totalSales = `select count(*) as cnt
                      from categories as ca
                      join products as pd
                      on ca.cat_id = pd.categories_id
                      join order_details as od
                      on pd.products_id = od.product_id
                      where od.order_status = "complete";`;

    let [orders] = await connection.query(totalOrders);
    let [users] = await connection.query(totalUsers);
    let [sales] = await connection.query(totalSales);

    let results = {
      totalOrder: [orders],
      totalUser: [users],
      totalSale: [sales],
    };

    return res
      .status(200)
      .json(generalResponse("Get all card data for admin Dashboard", results));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching Get all card data for admin Dashboard ${error.message}`,
    });
  }
};

// page for rendering user profile
export const viewProfilAdmin = async (req, res) => {
  res.render("./admin/adminprofile.ejs");
};
// fetch api to append profile data
export const getProfile = async (req, res) => {
  try {
    let adminData = `select * from admin_table limit 1`;

    let [admin] = await connection.query(adminData);

    return res
      .status(200)
      .json(generalResponse("Get Data of admin Profile", admin));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching admin profile data ${error.message}`,
    });
  }
};
// fetch api to search vendor by company_name
export const vendorSearch = async (req, res) => {
  try {
    let name = req.query.name;

    let vendorName = `select * from vendor_details where company_name LIKE "${name}%" `;

    let [vendor] = await connection.query(vendorName);

    return res
      .status(200)
      .json(generalResponse("Get Data of vendor searching..", vendor));
  } catch (error) {
    return res.status(500).json({
      message: `error in fetching vendor searching data ${error.message}`,
    });
  }
};

// page for render vendor details page
export const vendorsDetails = async (req, res) => {
  res.render("./admin/vendorsDetails");
};
// page for fetch all vendors of website
export const fetchvendorscontroller = async (req, res) => {
  try {
    let [result] = await connection.query(`SELECT * FROM vendor_details`);
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// fetch api to fetch those vendor which is not verified
export const fetchpendingverificationvendors = async (req, res) => {
  try {
    let [result] = await connection.query(
      `SELECT * FROM vendor_details where is_verified = 0 and is_deleted = 0`
    );
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// fetch api to search company name for complete pending verificatin
export const seachcompany = async (req, res) => {
  try {
    let [result] = await connection.query(
      `SELECT * FROM vendor_details where is_verified = 0 and is_deleted = 0 and company_name like "%${req.body.query}%"`
    );
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};


// fetch vendor using vendor_id
export const fetchvendorcontroller = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let [result] = await connection.query(
      `SELECT * FROM vendor_details where vendor_id="${id}"`
    );
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// page to render list of products
export const ListProductsController = async (req, res) => {
  res.render("./vendor/productListing");
};
// page to render list of orders
export const ordersDetails = async (req, res) => {
  res.render("./admin/orderDetails");
};
// page to render list of salesdetails
export const salesDetails = async (req, res) => {
  res.render("./admin/salesDetails");
};
// page to render list of pending verification
export const getpendingverification = async (req, res) => {
  res.render("./admin/pendingverification");
};
// page to render details of the company for complete verification
export const getpendingverificationgetdetails = async (req, res) => {
  let id = req.params.id;
  try {
    let [result] = await connection.query(
      `SELECT * FROM vendor_details where vendor_id="${id}"`
    );
    res.render("./admin/pvSeedetails", { result: result });
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// controller for send mail on verification reject
export const sendmailonrejection = async (req, res) => {
  try {
    let [result] = await connection.query(
      `UPDATE vendor_details SET is_deleted = 1  WHERE vendor_id= "${req.body.id}"`
    );
    return res
      .status(200)
      .json(generalResponse(`vendor is rejected due to ${req.body.name}`));
    // send mail to vendor for rejection
  } catch (error) {
    return res.status(404).json(generalResponse("success"));
  }
};
// controller for send mail on verification accept
export const sendmailonverification = async (req, res) => {
  try {
    let [result] = await connection.query(
      `UPDATE vendor_details SET is_verified = 1 , is_active = 1  WHERE vendor_id= "${req.body.id}"`
    );
    return res.status(200).json(generalResponse(`verification success`));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};
// page to render offers 
export const getofferspage = async (req, res) => {
  try {
    res.render("./admin/offers");
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};
// controller to create offer
export const postofferspage = async (req, res) => {
  try {
    let query = `INSERT INTO offers_details(offer_name, offer_start_date, offer_end_date) VALUES ("${req.body.offername}","${req.body.startdate}","${req.body.enddate}")`;
    let [result] = await connection.query(query);
    return res.status(200).json(generalResponse("offer added succesfully"));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};
// controller to update offer
export const updateoffer = async (req, res) => {
  try {
    var datetime = new Date();
    let [result] = await connection.query(
      `UPDATE offers_details SET offer_name="${req.body.offername}",offer_start_date="${req.body.startdate}",offer_end_date="${req.body.enddate}",offer_updated_at= "${datetime}" WHERE offer_id = "${req.body.id}"`
    );
    return res.status(200).json(generalResponse("offer updated succesfully"));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// controlller to fetch alll offers
export const fetchoffers = async (req, res) => {
  try {
    let [result] = await connection.query(`select * from offers_details`);
    return res
      .status(200)
      .json(generalResponse("offer fetched succesfully", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};
// controller to delete offer 
export const deleteoffers = async (req, res) => {
  try {
    let [result] = await connection.query(
      `UPDATE offers_details SET is_expired = "1" WHERE offer_id = ${req.body.id}`
    );
    return res.status(200).json(generalResponse("offer deleted successfully"));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// controller to fetch particular offer for edit
export const fetchoffer = async (req, res) => {
  try {
    let [result] = await connection.query(
      `select * from offers_details WHERE offer_id = ${req.params.id}`
    );
    res.render("admin/offeredit", { result: result });
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// fetch api to fetch active vendor data
export const fetchactivevendordata = async (req, res) => {
  try {
    let [active] = await connection.query(
      `SELECT COUNT(*) FROM vendor_details where is_active =1`
    );
    let [notactive] = await connection.query(
      `SELECT COUNT(*) FROM vendor_details where is_active =0`
    );
    let result = {
      active: Object.values(active[0])[0],
      notactive: Object.values(notactive[0])[0],
    };
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// fetch api to fetch category wise vendor data
export const fetchcatvendordata = async (req, res) => {
  try {
    let [cat1] = await connection.query(
      `SELECT COUNT(*) FROM vendor_details where cat_id = 1`
    );
    let [cat2] = await connection.query(
      `SELECT COUNT(*) FROM vendor_details where cat_id = 3`
    );
    let result = {
      electronics: Object.values(cat1[0])[0],
      clothes: Object.values(cat2[0])[0],
    };
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// fetch api to fetch data of electronic sales
export const fetchdataofelectronicsales = async (req, res) => {
  try {
    let query = `select ANY_VALUE(p.products_name) as product_name, count(o.order_id) 
                from order_details o 
							  left JOIN  products p 
                on p.products_id=o.product_id
                where p.categories_id = "1" 
                GROUP by p.products_id;`;

    let [cat1] = await connection.query(query);
    const productname = cat1.map((item) => item.product_name);
    const no = cat1.map((item) => item["count(o.order_id)"]);
    let result = { productname: productname, no: no };
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// fetch api to fetch data of category wise sales
export const fetchdatacatwise = async (req, res) => {
  try {
    let query = `	select count(*) as cnt, ca.cat_name
                      from categories as ca
                      join products as pd
                      on ca.cat_id = pd.categories_id
                      join order_details as od
                      on pd.products_id = od.product_id
                      group by ca.cat_id;
                      `;
    let [cat] = await connection.query(query);
    const total_order = cat.map((item) => item.cnt);
    const cat_id = cat.map((item) => item.cat_name);
    let result = { total_order: total_order, cat_id: cat_id };
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// fetch api to fetch data of wear sales
export const fetchdataofwearssales = async (req, res) => {
  try {
    let query = `select ANY_VALUE(p.products_name) as product_name, count(o.order_id) 
                 from order_details o 
							  left JOIN  products p 
                on p.products_id=o.product_id 
                where p.categories_id = "2" 
                GROUP by p.products_id;`;
    let [cat2] = await connection.query(query);
    const productname = cat2.map((item) => item.product_name);
    const no = cat2.map((item) => item["count(o.order_id)"]);
    let result = { productname: productname, no: no };
    return res.status(200).json(generalResponse("success", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// get request for render page of notifications
export const getcreatenotification = async (req, res) => {
  try {
    return res.render("admin/createnotification");
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// controlller for sending notification 
export const postcreatenotification = async (req, res) => {
  try {
    let query = `INSERT INTO notification_details(notification_created_by,notification_for,notification_subject,notification_content)
VALUES
        ("admin","${req.body.notifyto}","${req.body.Subject}","${req.body.Content}")`;
    let [createnotificationn] = await connection.query(query);
    return res.status(200).json(generalResponse("notification seneded"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// controller to fetch notification which is sended by admin
export const fetchnotifications = async (req, res) => {
  try {
    let query = `select notification_id,notification_for,notification_created_at,notification_subject,notification_is_readed  from notification_details where notification_created_by = "admin"`;
    let [fetchnotificationss] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("notification sended", fetchnotificationss));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// controller for render page notification which is come for admin
export const getincomingnotification = async (req, res) => {
  try {
    return res.render("admin/incomingnotification");
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// controller for notification which is come for admin and admin readed the notification
export const fetchnotificationsforadminreaded = async (req, res) => {
  try {
    let query = `select * from notification_details where notification_for = "admin" and notification_is_readed= "1"`;
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

// controller for notification which is come for admin and admin  not-readed the notification
export const fetchnotificationsforadminunreaded = async (req, res) => {
  try {
    let query = `select * from notification_details where notification_for = "admin" and notification_is_readed= "0"`;
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
// controller for notification to mark readed particular notification
export const postmarkasread = async (req, res) => {
  try {
    let query = `UPDATE notification_details SET notification_is_readed = "1" where notification_id = "${req.body.id}"`;
    let [markasreadmsg] = await connection.query(query);
    return res.status(200).json(generalResponse("success"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// controller for notification to mark readed all notifications
export const postmarkasreadall = async (req, res) => {
  try {
    let query = `UPDATE notification_details SET notification_is_readed = "1" where notification_for = "admin"`;
    let [markasreadmsg] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("all notification marked as readed"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// controller for render page of dynamic values
export const getvalues = async (req, res) => {
  res.render("admin/values");
};
// controller for create dynamic values 
export const postvalues = async (req, res) => {
  try {
    let query = `insert into dynamic_data (values_for,title,content) values ("${req.body.for}","${req.body.Key}","${req.body.Value}")`;
    let [result] = await connection.query(query);
    return res.status(200).json(generalResponse("key-value pair added"));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// controller for fetch dynamic values
export const fetchvalues = async (req, res) => {
  try {
    let query = `select * from dynamic_data where is_deleted = "0"`;
    let [result] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("key-value pair added", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};

// controller for filter values 
export const filtervalues = async (req, res) => {
  try {
    let query = `select * from dynamic_data where is_deleted = "0" and values_for = "${req.body.by}"`;
    let [result] = await connection.query(query);
    return res
      .status(200)
      .json(generalResponse("key-value pair filtered", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error.message));
  }
};
// controller for fetch particular values
export const fetchvalue = async (req, res) => {
  try {
    let [result] = await connection.query(
      `select * from dynamic_data where id = "${req.params.id}"`
    );
    res.render("admin/fetchvalue", { result: result });
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// controller for update value 
export const updatevalue = async (req, res) => {
  var datetime = new Date();
  try {
    let [result] = await connection.query(
      `update dynamic_data set title="${req.body.title}" ,content = "${req.body.value}", updated_at = "${datetime}" where id="${req.body.id}"`
    );
    return res
      .status(200)
      .json(generalResponse("key-value pair updated", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// controller delete value
export const deletevalue = async (req, res) => {
  try {
    let [result] = await connection.query(
      `update dynamic_data set is_deleted="1" where id="${req.body.id}"`
    );
    return res
      .status(200)
      .json(generalResponse("key-value pair deleted", result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};
// controller for get shipment page
export const getshipment = async (req, res) => {
  try {
    return res.render("admin/shipmentdetails");
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// controller for fetch orders with pagination
export const fetchorders = async (req, res) => {

  let currentpage = req.query.page || 1;

  if (currentpage <= 1) {
    currentpage = 1;
  }
  
  try {

    let pageSize = 10;
    let offset = (currentpage - 1) * pageSize;

    let [results] = await connection.query(
      `select order_id,order_status from order_details where order_status != "vendorVerification" limit ${pageSize} offset ${offset}`
    );
    let [totalOrders] = await connection.query(
      `select count(*) as cnt from order_details where order_status != "vendorVerification"`
    );

    let totalNumberOfPage = Math.floor(totalOrders[0].cnt / pageSize);

    let data = {
      results: results,
      totalPage: totalNumberOfPage,
      currentpage: currentpage,
    };



    return res
      .status(200)
      .json(generalResponse("key-value pair deleted", data));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};

// controller to fetch particular order for edit
export const fetchorder = async (req, res) => {
  try {
    let [result] = await connection.query(
      `select * from order_details where order_id = "${req.params.id}"`
    );
    res.render("admin/updatestatus", { result: result });
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
};
// controller to update order 
export const updatestatus = async (req, res) => {
  try {
    let [result] = await connection.query(`update order_details set order_status="${req.body.status}" where order_id="${req.body.id}"`);
    return res
        .status(200)
        .json(generalResponse("order status updated" , result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
}
// controller for search orders
export const searchorders = async (req, res) => {
  try {
    let [result] = await connection.query(`select * from order_details where order_status != "vendorVerification" and order_id LIKE "%${req.body.query}%"`);
    return res
        .status(200)
        .json(generalResponse("order fetched" , result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
}
// controlller for search user
export const usersearch  = async (req,res) => {
  try {
    let [result] = await connection.query(`select first_name,last_name,email from user_table where first_name LIKE "%${req.body.query}%" or last_name LIKE "%${req.body.query}%" or email LIKE "%${req.body.query}%" or mobile_number LIKE "%${req.body.query}%"`);
    return res
        .status(200)
        .json(generalResponse("searching user" , result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
}
// controlller for search product
export const productsearch  = async (req,res) => {
  try {
    let [result] = await connection.query(`select * from products where products_name LIKE "%${req.body.query}%"`);
    return res
        .status(200)
        .json(generalResponse("searching user" , result));
  } catch (error) {
    return res.status(404).json(generalResponse(error));
  }
}

// logout 
export const logout = async (req,res) => {
  try {
    res.clearCookie("AdminToken")
    res.redirect('/auth/admin')
  } catch (error) {
    res.send(error)
  }
}