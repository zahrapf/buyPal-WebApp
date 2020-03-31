const product=
{
    productArr:[],

    init()
    {
        this.productArr.push({
            img: '/img/macbook.jpg',
            title: 'MacBook',
            price: 'Starts from $1200',
            category: 'Computers & Accessories',
            bestSeller: false
        });

        this.productArr.push({
            img: '/img/headphone.jpg',
            title: 'Sony Headphone',
            price: '$50',
            category: 'Headphones',
            bestSeller: true
        });

        this.productArr.push({
            img: '/img/mouse.jpg',
            title: 'Apple Mouse',
            price: '$110',
            category: 'Accessories & Supplies',
            bestSeller: true
        });

        this.productArr.push({
            img: '/img/airpod.jpg',
            title: 'Apple Airpod',
            price: '$120',
            category: 'Headphones',
            bestSeller: false
        });

        this.productArr.push({
            img: '/img/remoteControl.jpg',
            title: 'Remote Control',
            price: '$35',
            category: 'Accessories & Supplies',
            bestSeller: true
        });

        this.productArr.push({
            img: '/img/iphone.jpg',
            title: 'Apple iphone',
            price: 'Starts from $900',
            category: 'Phones & Accesories',
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