const {findAllApi} = require("../controllers/findAllApi")
const axios = require("axios");
const { Product, Category } = require("../db");
const { Op } = require("sequelize");

const getAllProducts =async (req, res) => {
  const { title } = req.query;

  let products;
  try {
     title
        ? (products = await findAllApi(title))
        : (products = await findAllApi());
     return res.send(products);
  } catch (e) {
     res.status(400).json({ Error: e.message });
  }
};
   

const getProductId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const searchProduct = await Product.findByPk(id, { include: { all: true } });
      if (searchProduct) {
        res.status(200).send(searchProduct);
      } else {
        res.status(400).json("ID not found");
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const getPicture = async (req, res) => {
  const { id } = req.params;
  const UrlPicture ="https://api.mercadolibre.com/items/"
  try {
    const pictures = await axios.get( `${UrlPicture}${id}`);
    const picturesHd= pictures.data.pictures.map(r => r.url)
    res.send(picturesHd);
  } catch (error) {
    console.log(error)
  }
}

const getDescription = async (req, res) => {
  const { id } = req.params;
  const UrlDescription ="https://api.mercadolibre.com/items/"
  try {
    const description = (await axios.get(`${UrlDescription}${id}/description`)).data.plain_text;
    res.send(description);
  } catch (error) {
    console.log(error)
  }
}


const postNewProduct = async (req, res) => {
  try {
    const { title, image, price, stock, category, sold, description } = req.body;
    console.log(req.body);
    if (!title || !image || !price || !stock || !sold || !description) {
      res.status(404).send("Solicitud incompleta");
    } else {
      const createProduct = await Product.create({
        id: `MLA${Math.round(Math.random() * 1000000000)}`,
        title,
        image,
        price,
        stock,
        sold,
        description,
      });
      const foundCategory = await Category.findOne({
        where: {
          name: category,
        },
      });
      await createProduct.addCategory(foundCategory);
      
      res.status(200).send("Nuevo producto creado correctamente!");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
    try {
       let productDelete = await Product.update(  {
             visible: 1, },
          {
             where: { id: id },
          }
       );
 
       res.send("producto no visible para clientes");
    } catch (error) {
       console.log(error);
       res.status(400).send(error);
    }
 };

 const modifyProduct = async (req, res) => {
  const { id } = req.params;
  const { title, image, price, category, stock, description, } = req.body;
  try {
    // busco el producto
    const product = await Product.findByPk(id);
    //sino esta
    if (!product) res.status(404).send("ID not found");
    //si esta actualizo dependiendo los datos que me ingresan
    product.title = title ? title : product.title;
    product.image = image ? image : product.image;
    product.price = price ? price : product.price;
    product.category = category ? category : product.category;
    product.stock = stock ? stock : product.stock;
    product.description = description ? description : product.description;

    await product.save(); // guardamos los cambios
    res.send("Producto Actualizado");
    //console.log(JSON.stringify(product))
  } catch (error) {
    res.send({ error: error.message });
  }
};

 // ruta para actualizar el carrito dw compras
 const addShoppingcart = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id)
    if (product) {
      const { sold, stock } = req.body
      if (stock > product.stock) return res.status(404).send("Lo sentimos la cantidad de productos que intentas comprar excede nuestro stock")
      product.stock = product.stock - stock
      product.sold = product.sold + sold
      await product.save()
      return res.send("La compra se realizó correctamente.")
    }
  } catch (error) {
    res.send({ error: error.message })
  }};

 
  module.exports = {getAllProducts, getProductId, getPicture, getDescription, postNewProduct, deleteProduct, modifyProduct, addShoppingcart};
