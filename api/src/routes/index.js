const { Router } = require('express');

// Importar todos los routers;
const router = Router();
// Configurar los routers


router.get('/home', (req,res) => {
    res.send('hola')
});




module.exports = router;