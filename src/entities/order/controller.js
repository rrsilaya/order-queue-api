import Order from './model';
import { getErrors } from '../utils';

/**
 * @api {get} /order getOrders
 * @apiGroup Order
 * @apiName getOrders
 *
 * @apiSuccess {Object[]} data
 * @apiSuccess {String} data._id ID of the order
 * @apiSuccess {String} data.name Name of the person who ordered
 * @apiSuccess {String} data.order Order name
 * @apiSuccess {Boolean} data.isProcessed Order process status
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": [
 *       {
 *         "_id": "5a800cffafc3fd4a438b76d9",
 *         "name": "Sam Sepiol",
 *         "order": "Lasagna",
 *         "isProcessed": false
 *         "__v": 0
 *       },
 *       {
 *         "_id": "5a800d0dafc3fd4a438b76da",
 *         "name": "Dolores Haze",
 *         "order": "Sisig",
 *         "isProcessed": false
 *         "__v": 0
 *       }
 *     ]
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "errors": [
 *       "Something went wrong with our servers. :("
 *     ]
 *   } 
 */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      data: orders
    });
  } catch (err) {
    res.status(500).json({ errors: ['Internal server error while getting orders'] });
  }
};

/**
 * @api {post} /order addOrder
 * @apiGroup Order
 * @apiName addOrder
 *
 * @apiParam (Body Params) {String} name Name of the person who ordered
 * @apiParam (Body Params) {String} order Order name
 *
 * @apiSuccess {Object} data New order created
 * @apiSuccess {String} data._id ID of the order
 * @apiSuccess {String} data.name Name of the person who ordered
 * @apiSuccess {String} data.order Order name
 * @apiSuccess {Boolean} data.isProcessed Order process status
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "_id": "5a800cffafc3fd4a438b76d9",
 *       "name": "Sam Sepiol",
 *       "order": "Lasagna",
 *       "isProcessed": false
 *       "__v": 0
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "errors": [
 *       "Something went wrong with our servers. :("
 *     ]
 *   }  
 */
export const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    await newOrder.save();

    res.status(200).json({
      data: newOrder
    });
  } catch (err) {
    const errors = getErrors(err);
    res.status(500).json({ errors });
  }
}

/**
 * @api {put} /order/:_id updateOrder
 * @apiGroup Order
 * @apiName updateOrder
 *
 * @apiParam (URL Params) {String} _id ID of the order
 * @apiParam (Body Params) {Boolean} isProcessed Order process status
 *
 * @apiSuccess {Object} data Updated order
 * @apiSuccess {String} data._id ID of the order
 * @apiSuccess {String} data.name Name of the person who ordered
 * @apiSuccess {String} data.order Order name
 * @apiSuccess {Boolean} data.isProcessed Order process status
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "_id": "5a800cffafc3fd4a438b76d9",
 *       "name": "Sam Sepiol",
 *       "order": "Lasagna",
 *       "isProcessed": false
 *       "__v": 0
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "errors": [
 *       "Something went wrong with our servers. :("
 *     ]
 *   }  
 */
export const updateOrder = async (req, res) => {
  try {
    const { _id } = req.params;

    await Order.findByIdAndUpdate(_id, req.body);
    const order = await Order.findById(_id);

    res.status(200).json({
      data: order
    });
  } catch (err) {
    const errors = getErrors(err);
    res.status(500).json({ errors });
  }
}

/**
 * @api {delete} /order/:_id deleteOrder
 * @apiGroup Order
 * @apiName deleteOrder
 *
 * @apiParam (URL Params) {String} _id ID of the order
 *
 * @apiSuccess {Object} data Deleted order
 * @apiSuccess {String} data._id ID of the order
 * @apiSuccess {String} data.name Name of the person who ordered
 * @apiSuccess {String} data.order Order name
 * @apiSuccess {Boolean} data.isProcessed Order process status
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "_id": "5a800cffafc3fd4a438b76d9",
 *       "name": "Sam Sepiol",
 *       "order": "Lasagna",
 *       "isProcessed": false
 *       "__v": 0
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "errors": [
 *       "Something went wrong with our servers. :("
 *     ]
 *   }  
 */
export const deleteOrder = async (req, res) => {
  try {
    const order = Order.findById(req.params._id);

    await Order.findOneAndRemove({ _id });
    res.status(200).json({ data: order });
  } catch (err) {
    const errors = getErrors(err);
    res.status(500).json({ errors });
  }
}