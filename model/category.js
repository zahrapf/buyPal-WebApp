const category=
{
    categoryArr:[],

    init()
    {
        this.categoryArr.push({
            description: 'Beauty and Personal Care',
            img: '/img/the-honest-company.jpg'
        });

        this.categoryArr.push({
            description: 'Electronics & Accessories',
            img: '/img/electronic.jpg'
        });

        this.categoryArr.push({
            description: 'Clothes and Shoes',
            img: '/img/clothes.jpg'
        });

        this.categoryArr.push({
            description: 'Home and Kitchen',
            img: '/img/homeandkitchen.jpg'
        });
    },

    getAllCategory()
    {
        return this.categoryArr;
    }
}

category.init();
module.exports = category; 