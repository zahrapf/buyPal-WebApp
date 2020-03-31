const bsProduct=
{
    bsProductArr:[],

    init()
    {
        this.bsProductArr.push({
            img: '/img/facewash.jpg'
        });

        this.bsProductArr.push({
            img: '/img/glass.jpg'
        });

        this.bsProductArr.push({
            img: '/img/bag.jpg'
        });

        this.bsProductArr.push({
            img: '/img/pillow.jpg'
        });

        this.bsProductArr.push({
            img: '/img/lipstick.jpg'
        });

    },

    getAllbsProduct()
    {
        return this.bsProductArr;
    }
}

bsProduct.init();
module.exports = bsProduct; 