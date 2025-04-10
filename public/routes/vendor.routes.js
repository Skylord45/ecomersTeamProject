//protect routes for vendor
import express from "express";
import {
  fetchnotificationsforvendorreaded,
  fetchnotificationsforvendorunreaded,
  getcontacttoadmin,
  getnotifications,
  getInventoryChartData,
  getOrderChartData,
  getProducts,
  getShippingData,
  getVendorDashboard,
  postcontacttoadmin,
  postmarkasread,
  postmarkasreadall,
  showAllProducts,
  addProducts,
  getCategories,
  getSubCategory,
  productsData,
  getProductDetail,
  renderEditProduct,
  postProductDetails,
  editStock,
} from "../controller/vendor.controller.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const routes = express();
// const upload = multer;

routes.all("/dashboard", getVendorDashboard);
routes.get("/contact-to-admin", getcontacttoadmin);
routes.post("/contacttoadmin", upload.none(), postcontacttoadmin);
routes.get("/notifications", getnotifications);
routes.post("/fetchreadednotification", fetchnotificationsforvendorreaded);
routes.post("/fetchunreadnotification", fetchnotificationsforvendorunreaded);
routes.post("/markasread", upload.none(), postmarkasread);
routes.post("/markallasread", upload.none(), postmarkasreadall);
routes.get("/getOrderChartData", getOrderChartData);
routes.get("/getInventoryData", getInventoryChartData);
routes.get("/getShippingData", getShippingData);
routes.get("/getProducts", getProducts);
routes.get("/getAllProducts", showAllProducts);
routes.get("/editProduct", renderEditProduct);
routes.get("/getEditProductDetails", getProductDetail);
routes.post("/postEditProductDetails", postProductDetails);
routes.post("/editStock", editStock);

routes.get("/addProducts", addProducts);
routes.get("/getCategories", getCategories);
routes.post("/getSubCategory", getSubCategory);
routes.post("/productsData", productsData);

export default routes;
