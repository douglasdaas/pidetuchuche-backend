'use strict'

const Producto = use('App/Models/Producto')
const Categoria = use('App/Models/Categoria')

const ProductoHook = exports = module.exports = {}

ProductoHook.calcularPrecioFinal = async (producto) => {
  const {precio, descuento } = producto

  producto.precio_total = (precio*(1 - descuento/100)).toFixed(2)
}

ProductoHook.validarProductoPrincipal = async (producto) => {
  const cuenta = await Producto.query().where('principal',true).getCount()
  console.log(`cuenta:: ${cuenta}`)

  if (cuenta >= 5 ) {
    throw new Error('Maxima capacidad de productos principales alcanzada, desmarque algun prodcuto principal para poder mostrar este')
  }
}
