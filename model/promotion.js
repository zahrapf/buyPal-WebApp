const promotion=
{
    promotionArr:[],

    init()
    {
        this.promotionArr.push({
            img: '/img/discount.jpg'
        });


    },

    getAllpromotion()
    {
        return this.promotionArr;
    }
    
}

promotion.init();
module.exports = promotion; 

