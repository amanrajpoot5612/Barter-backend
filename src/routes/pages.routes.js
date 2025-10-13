import e from "express";
import { getPages, updatePages, testPages, createPages } from "../controllers/page.controller.js";

const pageRouter = e.Router();


pageRouter.get('/get-pages', getPages);

pageRouter.post("/update-pages", updatePages);

pageRouter.post("/create-pages", createPages);

pageRouter.get("/test", testPages);


export default pageRouter;
