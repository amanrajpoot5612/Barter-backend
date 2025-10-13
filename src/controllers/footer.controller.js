import Footer from "../models/footer.model.js";
import FooterSchema from "../models/footer.model.js";



// get footer route
export const getFooter = async(req, res) => {
  try {
    console.log("getFooter route called");
    
    const footer = await FooterSchema.findOne();
    if(!footer){
      return res.status(400).json({
        message: "No footer content found"
      })    }
      return res.status(200).json(footer);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

// update footer
export const updateFooter =  async(req, res) => {
    try {
        const footerData = req.body;

        let footer = await FooterSchema.findOne();

        if(footer){
            footer = await FooterSchema.findByIdAndUpdate(footer._id, footerData, {new: true});
            return res.status(200).json({
                success: true,
                footer
            })
        }
        footer = new FooterSchema(footerData);
        await footer.save();

        res.status(200).json({
            success: true,
            footer,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

// update footer item
export const updateFooterItem =  async(req, res) => {
    try {
        return res.json({
            message : "Footer item update route called"
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}