'use strict'

const ProductoHook = exports = module.exports = {}

ProductoHook.calcularPrecioFinal = async (producto) => {
  const {precio, descuento } = producto

  producto.precio_total = (precio*(1 - descuento/100)).toFixed(2)


}
