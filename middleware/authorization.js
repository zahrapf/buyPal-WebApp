const dashBoardLoader = (req,res)=>{

    if(req.session.userInfo.type=="InventoryClerk")
    {
        res.render("user/inventoryClerk", {
            title: "Register: buyPal.ca",
            headingInfo: "buyPal"
        });
    }
    
    else
    {
        res.render("user/userDashboard", {
            title: "Register: buyPal.ca",
            headingInfo: "buyPal"
        });
    }

}

module.exports = dashBoardLoader;