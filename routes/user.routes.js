import express from "express";
import {
  addInCart,
  addInWishlist,
  allReviews, cartPage,
  getCategoryData,
  aboutUsPage,
  contactUs,
  cartDataApi,
  checkoutPage,
  fetchAdresssForCheckoutApi,
  homePage,
  productDetail,
  productListngPage,
  shopByCategories,
  singleCategoryProducts,
  singleProductDetail,
  singleProductDetailPage,
  privacyPolicy,
  termsAndConditions,
  wishListData,
  wishlistPage,
  removeItemFromCartApi,
  beforeCheckoutPageQuantityCheckApi,
  postCategoryData,
  posttermsAndConditions,
  postprivacypolicy,
} from "../controller/user.controller.js";

const routes = express.Router();

routes.all("/", homePage);

routes.get("/cart", cartPage);

routes.get("/shop", productListngPage);

routes.get("/single-product-detail", singleProductDetailPage);

routes.get("/shopByCategory", shopByCategories);

/////////////////////////////////////////////////////////////////

// Api

routes.get("/get-single-product-detail", singleProductDetail);

routes.get("/getData", productDetail);

routes.post("/addInWishlist", addInWishlist);

routes.post("/addInCart", addInCart);

routes.get("/getCategoryData", getCategoryData);

routes.get("/getCategoryProducts", singleCategoryProducts);

routes.get("/aboutUs", aboutUsPage);

routes.get("/contactUs", contactUs);

routes.get("/privacyPolicy", privacyPolicy);
routes.post("/privacypolicy",postprivacypolicy)

routes.get("/termsAndConditions", termsAndConditions);
routes.post('/termsAndConditions',posttermsAndConditions)

routes.get("/checkout", checkoutPage);

routes.get("/wishlist", wishlistPage);

routes.post('/postCategoryData', postCategoryData);

////////////////////////////////////////////////

// user api

routes.get("/fetchAdresssForCheckout", fetchAdresssForCheckoutApi);

routes.get("/fetchCartData", cartDataApi);

routes.get("/fetchWishlistData", wishListData);

routes.post('/removeItemFromCartApi', removeItemFromCartApi)

routes.post('/beforeCheckoutPageQuantityCheckApi',beforeCheckoutPageQuantityCheckApi)


routes.post('/getReviews',allReviews)

export default routes;
