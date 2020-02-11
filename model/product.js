const product=
{
    productArr:[],

    init()
    {
        this.productArr.push({
            img: '/img/macbook.jpg',
            title: 'MacBook',
            price: 'Starts from $1200',
            category: 'electronoc',
            bestSeller: false
        });

        this.productArr.push({
            img: '/img/headphone.jpg',
            title: 'Sony Headphone',
            price: '$50',
            category: 'electronoc',
            bestSeller: true
        });

        this.productArr.push({
            img: '/img/mouse.jpg',
            title: 'Apple Mouse',
            price: '$110',
            category: 'electronoc',
            bestSeller: true
        });

        this.productArr.push({
            img: '/img/airpod.jpg',
            title: 'Apple Airpod',
            price: '$120',
            category: 'electronoc',
            bestSeller: false
        });

        this.productArr.push({
            img: '/img/remoteControl.jpg',
            title: 'abc',
            price: '$35',
            category: 'electronoc',
            bestSeller: true
        });

        this.productArr.push({
            img: '/img/iphone.jpg',
            title: 'Apple iphone',
            price: 'Starts from $900',
            category: 'electronoc',
            bestSeller: false
        });
    },

    getAllProduct()
    {
        return this.productArr;
    }
}

product.init();
module.exports = product; 