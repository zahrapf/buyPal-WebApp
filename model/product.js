const product=
{
    productArr:[],

    init()
    {
        this.productArr.push({
            img: '/img/the-honest-company.jpg',
            title: 'abc',
            price: '1234',
            category: 'electronoc',
            bs: 'best'
        });

        this.productArr.push({
            img: '/img/electronic.jpg',
            title: 'abc',
            price: '1234',
            category: 'electronoc',
            bs: 'best'
        });

        this.productArr.push({
            img: '/img/clothes.jpg',
            title: 'abc',
            price: '1234',
            category: 'electronoc',
            bs: 'best'
        });

        this.productArr.push({
            img: '/img/home.jpg',
            title: 'abc',
            price: '1234',
            category: 'electronoc',
            bs: 'best'
        });

        this.productArr.push({
            img: '/img/home.jpg',
            title: 'abc',
            price: '1234',
            category: 'electronoc',
            bs: 'best'
        });

        this.productArr.push({
            img: '/img/home.jpg',
            title: 'abc',
            price: '1234',
            category: 'electronoc',
            bs: 'best'
        });
    },

    getAllProduct()
    {
        return this.productArr;
    }
}

product.init();
module.exports = product; 