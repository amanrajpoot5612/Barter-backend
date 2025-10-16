import PageSchema from "../models/page.model.js";

// get page route
export const getPages = async (req, res) => {
  try {
    console.log("getPage controller called");
    const page = await PageSchema.find();
    if (!page) {
      return res.status(404).json({
        message: "No page found",
      });
    }
    res.status(200).json({ message: "pages fetched successfully", page });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createPages = async (req, res) => {
  try {
    const pageData = req.body;
    const page = new PageSchema(pageData);
    await page.save();

    return res.status(200).json({
      message: "Page created successfully",
      page,
    });
  } catch (error) {
    console.error("Error in createPage", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePages = async (req, res) => {
  try {
    const { pages } = req.body;

    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No pages provided for update",
      });
    }

    const updatedPages = [];

    for (const pageData of pages) {
      if (!pageData._id) {
        return res.status(400).json({
          success: false,
          message: "Each page must have an _id to update",
        });
      }

      const updatedPage = await PageSchema.findByIdAndUpdate(
        pageData._id,
        pageData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (updatedPage) updatedPages.push(updatedPage);
    }

    return res.status(200).json({
      success: true,
      message: "Pages updated successfully",
      pages: updatedPages,
    });
  } catch (error) {
    console.error("Error in updatePages", error);
    return res.status(500).json({
      success: false,
      message: error.message,
      slug: "Pages could not be updated",
    });
  }
};



// export const updatePages = async (req, res) => {
//   try {
//     const pageData = req.body;
//     let page = await PageSchema.findOne();
//     // const pages = data.json();
//     if (!page) {
//       page = new PageSchema(pageData);
//       await page.save();

//       return res.status(200).json({
//         message: "pages finally created",
//         page,
//       });
//     }
//     page = await PageSchema.findByIdAndUpdate(page._id, pageData, {
//       new: true, // return updated doc
//       runValidators: true,
//     });
//     return res.status(200).json({
//       message: "pages finnaly updated",
//       page,
//     });
//   } catch (error) {
//     console.error("Error in  updatePages", error);    
//     return res.status(500).json({
//       success: false,
//       message : error.message,
//       slug: "Page can't be updated",
//     });
//   }
// };

export const testPages = async (req, res) => {
  res.status(200).json({
    message: "page route is successfully fetched",
  });
};

// update page order

// update single page content
