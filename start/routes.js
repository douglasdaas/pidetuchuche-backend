'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//Productos
Route.resource('productos', 'ProductoController')
    .middleware(new Map([
      [['store', 'update', 'destroy'], ['auth']],
      [['show', 'update', 'destroy'], ['findProducto']]
    ]))
    .apiOnly()
    .formats(['json'])

Route.post('productos/venta/:id', 'ProductoController.venta')
  .middleware('auth')
  .middleware('findProducto')
  .formats(['json'])

Route.get('productos-principal', 'ProductoController.principal')
  .formats(['json'])

//Usuarios
Route
  .post('login', 'UserController.login')

Route
  .post('signup', 'UserController.signup')

//Categorias
Route
  .resource('categorias', 'CategoriaController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']],
    [['show', 'update', 'destroy'], ['findCategoria']]
  ]))
  .apiOnly()
  .formats(['json'])

Route.get('categorias-principal/:id', 'CategoriaController.principal')
  .formats(['json'])

//Miselaneo
Route
  .resource('miselaneos', 'MicelaneoController')
  .middleware(new Map([
    [['store', 'update', 'destroy'], ['auth']]
  ]))
  .apiOnly()
  .formats(['json'])
