'use strict'

const Micelaneo = use('App/Models/Micelaneo')
const Cloudinary = use('App/Services/Cloudinary')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with micelaneos
 */
class MicelaneoController {
  /**
   * Show a list of all micelaneos.
   * GET micelaneos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const micelaneo = await Micelaneo
      .all()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Lista de todos los micelaneos',
      datos: micelaneo
    })
  }

  /**
   * Render a form to be used for creating a new micelaneo.
   * GET micelaneos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new micelaneo.
   * POST micelaneos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    console.log("Request.body::",request.body)

    const informacionMicelaneo = request.only(['nombre','pdf'])

    try{

      if(request.file('pdf') && request.file('pdf') !== undefined ){

        const archivoPDF = request.file('pdf', {
          types: ['pdf']
        })


        var cloudinary_response = await Cloudinary.upload(archivoPDF)


        informacionMicelaneo.ruta = cloudinary_response.url
      }

    }catch(error){


      return response.status(500).json({status: false, error: error })
    }

    const micelaneo = await Micelaneo.create(informacionMicelaneo)
    response.header('Access-Control-Allow-Origin', '*').status(201).json({
      mensaje: 'Nuevo Micelaneo creado correctamente.',
      datos: micelaneo
    })
  }

  /**
   * Display a single micelaneo.
   * GET micelaneos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params:{id}, request, response, view }) {
    const micelaneo = await Micelaneo.find(id)

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Micelaneo encontrado correctamente.',
      datos: micelaneo
    })
  }

  /**
   * Render a form to update an existing micelaneo.
   * GET micelaneos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update micelaneo details.
   * PUT or PATCH micelaneos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id}, request, response }) {

    const  micelaneo  = await Micelaneo.find(id)

    const informacionActualizadaMicelaneo = request.only(['nombre','pdf'])


    console.log(`informacionActualizadaMicelaneo:: ${informacionActualizadaMicelaneo}`)

    try{

      if(request.file('pdf') && request.file('pdf') !== undefined ){

        const archivoPDF = request.file('pdf', {
          types: ['pdf']
        })


        var cloudinary_response = await Cloudinary.upload(archivoPDF)


        informacionActualizadaMicelaneo.ruta = cloudinary_response.url
      }

    }catch(error){


      return response.status(500).json({status: false, error: error })
    }

    micelaneo.merge(informacionActualizadaMicelaneo)

    await micelaneo.save()


    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      mensaje: 'Micelaneo actualizado correctamente.',
      datos: micelaneo
    })
  }

  /**
   * Delete a micelaneo with id.
   * DELETE micelaneos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params:{id}, request, response }) {
    const micelaneo  = await Micelaneo.find(id)

    micelaneo.delete()

    response.header('Access-Control-Allow-Origin', '*').status(200).json({
      message: 'Borrado con exito.',
      eliminado: true
    })

  }
}

module.exports = MicelaneoController
