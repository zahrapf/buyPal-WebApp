const bsProduct=
{
    bsProductArr:[],

    init()
    {
        this.bsProductArr.push({
            img: '/img/the-honest-company.jpg'
        });

        this.bsProductArr.push({
            img: '/img/electronic.jpg'
        });

        this.bsProductArr.push({
            img: '/img/clothes.jpg'
        });

        this.bsProductArr.push({
            img: '/img/home.jpg'
        });
    },

    getAllbsProduct()
    {
        return this.bsProductArr;
    }
}

bsProduct.init();
module.exports = bsProduct; 