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
    
    
    // showSlides(n) {
    //     let i;
    //     let slides = document.getElementsByClassName("promotion-pro");
        
    //     if (n > slides.length) {slideIndex = 1}
    //     if (n < 1) {slideIndex = slides.length}
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
        
    //     slides[slideIndex-1].style.display = "block";   
    // }
}

promotion.init();
module.exports = promotion; 

