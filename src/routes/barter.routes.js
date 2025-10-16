import { Router } from "express";
import {
  getFooter,
  updateFooter,
  updateFooterItem,
} from "../controllers/footer.controller.js";
import {
  getNavbar,
  postNavbar,
  updateNavbarItem,
} from "../controllers/navbar.controller.js";
// import { getPage } from "../controllers/page.controller.js";
import { getTestimonial, updateTestimonial } from '../controllers/testimonial.controller.js'

const barterRouter = Router();

console.log("Barter router called");

/* =================Navbar routes===================== */

// get navbar
barterRouter.route("/navbar").get(getNavbar);

// update navbar: admin
barterRouter.route("/navbar").post(postNavbar);

// update navbar item : admin
barterRouter.route("/navbar/item/:_id").patch(updateNavbarItem);

/* =================Footer routes===================== */

// get Footer route
barterRouter.route("/get-footer").get(getFooter);

// update Footer route
barterRouter.route("/update-footer").post(updateFooter);

// update Footer-item route
barterRouter.route("/update-footer-item").patch(updateFooterItem);

/* =================Page routes===================== */

// get page: normal
// barterRouter.route("/get-page").get(getPage);



/* =================Testimonial routes===================== */

// get testomonial route : normal
barterRouter.route("/get-testimonial").get(getTestimonial);

// update testimonial route: admin
barterRouter.route("/update-testimonial/:id").post(updateTestimonial)


// update images: admin
// update page: admin
// update layout: admin
// get testimonial: normal
// update testmonial: admin
// get footer: normal
// update footer: admin

/* =================Fallback route===================== */

// fallback route define
export const fallbackRoute = async (req, res) => {
  try {
    res.status(200).json({
      message: "Fallback route hitted",
    });
  } catch (error) {
    return res.status(500).json({
        message: "Path couldn't be reached",
      error: error.message,
    });
  }
};

// fallback route
barterRouter.route("/fallback").get(fallbackRoute);

export default barterRouter;
