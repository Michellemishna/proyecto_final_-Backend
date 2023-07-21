const clearProductsApi =(arr) =>
    arr.flat().map((product) => {
        return{
            id:product.id,
            title:product.title,
            image:product.thumbnail,
            price:product.price,
            stock:product.available_quantity,
            category:product.category_id,
            sold:product.sold_quantity,
            descripion:"",
        }
    });

module.exports= clearProductsApi;
