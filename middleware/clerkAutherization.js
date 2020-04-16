const isAdministrator = (req,res,next)=>{

    if(req.session.userInfo.type=="InventoryClerk")
    {
        next();
    }
    
    else
    {
        res.redirect("/user/login")
    }

}

module.exports = isAdministrator;