const axios = require("axios");
const { findCategoryDB, findDb } = require("../controllers/findAllApi");
const { Category } = require("../db");

const getCategories = async (req, res) => {
  try {
    const dbCategories = await findCategoryDB();
    if (!dbCategories.length) {
      // const URL = `https://api.mercadolibre.com/categories/`
      const id = [
        { id: "MLA125137", name: "Adaptadores" },
        { id: "MLA431033", name: "Adaptadores Bluetooth" },
        { id: "MLA126843", name: "All In One" },
        { id: "MLA6049", name: "Auriculares" },
        { id: "MLA431802", name: "Cables de Audio y Video" },
        { id: "MLA9930", name: "Cables y Adaptadores" },
        { id: "MLA4225", name: "Carcasas" },
        { id: "MLA125135", name: "Cargadores" },
        { id: "MLA3577", name: "Cargadores y Fuentes" },
        { id: "MLA7415", name: "Cartuchos de Tinta" },
        { id: "MLA83769", name: "Componentes" },
        { id: "MLA418544", name: "Coolers Externos" },
        { id: "MLA418545", name: "Coolers Internos para Laptops" },
        { id: "MLA421348", name: "Cortadoras de Fibra Óptica" },
        { id: "MLA1672", name: "Discos Rígidos y SSDs" },
        { id: "MLA430802", name: "Discos Rígidos y SSDs" },
        { id: "MLA417676", name: "Discos Vírgenes" },
        { id: "MLA1719", name: "Estabilizadores" },
        { id: "MLA416867", name: "Fuentes" },
        { id: "MLA17957", name: "Fundas" },
        { id: "MLA9729", name: "Hubs USB" },
        { id: "MLA1676", name: "Impresoras" },
        { id: "MLA72894", name: "Joysticks" },
        { id: "MLA414120", name: "Kits de Herramientas" },
        { id: "MLA6263", name: "Kits de Mouse y Teclado" },
        { id: "MLA412098", name: "Lápices 3D" },
        { id: "MLA125138", name: "Lápices Ópticos" },
        { id: "MLA9276", name: "Lectores de Código de Barras" },
        { id: "MLA1694", name: "Memorias" },
        { id: "MLA3582", name: "Memorias RAM para Laptops" },
        { id: "MLA16543", name: "Mochilas" },
        { id: "MLA14407", name: "Monitores" },
        { id: "MLA1716", name: "Mouse Pads" },
        { id: "MLA1714", name: "Mouses" },
        { id: "MLA1652", name: "Notebooks" },
        { id: "MLA82335", name: "Otros Conectores" },
        { id: "MLA454380", name: "Otros Periféricos" },
        { id: "MLA430621", name: "Pantallas Táctiles" },
        { id: "MLA3378", name: "Parlantes" },
        { id: "MLA1649", name: "PC" },
        { id: "MLA4980", name: "Pendrives" },
        { id: "MLA430179", name: "Placas de Encendido" },
        { id: "MLA430767", name: "Placas de Puertos USB" },
        { id: "MLA430905", name: "Placas de Red" },
        { id: "MLA1658", name: "Placas de Video" },
        { id: "MLA1692", name: "Placas Motherboards" },
        { id: "MLA1693", name: "Procesadores" },
        { id: "MLA55218", name: "Procesadores" },
        { id: "MLA11889", name: "Proyectores" },
        { id: "MLA36864", name: "Repuestos Motherboards" },
        { id: "MLA430901", name: "Routers" },
        { id: "MLA17662", name: "Routers portatil" },
        { id: "MLA418043", name: "Soportes" },
        { id: "MLA63262", name: "Soportes Accesorios" },
        { id: "MLA44397", name: "Soportes para pantallas" },
        { id: "MLA10089", name: "Tabletas Digitalizadoras" },
        { id: "MLA82085", name: "Tablets" },
        { id: "MLA9916", name: "Teclados" },
        { id: "MLA418448", name: "Teclados Físicos" },
        { id: "MLA3560", name: "Tóners" },
        { id: "MLA1720", name: "UPS" },
        { id: "MLA1667", name: "Webcams" },
    
      ].map((category) => {
        return {
          id: category.id,
          name: category.name,
        };
      });
      const createdCategories = await Category.bulkCreate(id);
      res.status(200).send(id);
    } else {
      res.send(dbCategories);
    }
  } catch (err) {
    console.log(err);
  }
};

const categoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const allProducts = await findDb();
    if (id) {
      let found = await allProducts.filter((product) =>
        product.category ? product.category === id : product.category.id === id
      );
      res.status(200).send(found);
    } else {
      res.status(400).send("error");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCategories, categoryId };
