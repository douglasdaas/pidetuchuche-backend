'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {

    console.log("error:", error)
    console.log("nombre del error: ", error.name)
    console.log("mensaje: ", error.message)

    if (error.name === 'InvalidJwtToken' || error.name === "ExpiredJwtToken" ) {
      response.status(error.status).json({
        mensaje: 'Debe a hacer login'
      })
    } else {
      response.status(error.status).json({
        'nombre del error': error.name,
        mensaje: error.message
      })
    }

  }
    // (error.name === 'InvalidJwtToken') ||


  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
