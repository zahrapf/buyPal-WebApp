const promotion=
{
    promotionArr:[],

    init()
    {
        this.promotionArr.push({
            img: '/img/the-honest-company.jpg'
        });

        this.promotionArr.push({
            img: '/img/electronic.jpg'
        });

        this.promotionArr.push({
            img: '/img/clothes.jpg'
        });

        this.promotionArr.push({
            img: '/img/home.jpg'
        });
    },

    getAllpromotion()
    {
        return this.promotionArr;
    }
}

promotion.init();
module.exports = promotion; 