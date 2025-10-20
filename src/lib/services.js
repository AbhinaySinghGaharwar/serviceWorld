import axios from 'axios'

const API_URL = process.env.BASE_URL
const API_KEY = process.env.KEY

// Helper for POST requests
const postAction = async (action, data = {}) => {
  try {
    const body = { key: API_KEY, action, ...data }
    const res = await axios.post(API_URL, body, {
      headers: { 'Content-Type': 'application/json' },
    })
    return res.data
  } catch (error) {
   
    return { error: error.response?.data || error.message }
  }
}

export const getServices = async () => {
  try {
    const res = await axios.post(API_URL, {
      key: API_KEY,     // must exactly match API docs
      action: 'services' 
    }, {
      headers: { 'Content-Type': 'application/json' }
    })

    return res.data
  } catch (error) {
    console.error(error.response?.data || error.message)
    return { error: error.response?.data || error.message }
  }
}
// Create an order
export const createOrder = (data) => postAction('add', data)

// Get order status
export const getOrderStatus = (orderId) => postAction('status', { order: orderId })

// Get multiple order statuses
export const getMultipleOrderStatus = (orderIds) =>
  postAction('status', { orders: orderIds.join(',') })

// Create refill
export const createRefill = (orderId) => postAction('refill', { order: orderId })

// Create multiple refills
export const createMultipleRefills = (orderIds) =>
  postAction('refill', { orders: orderIds.join(',') })

// Get refill status
export const getRefillStatus = (refillId) => postAction('refill_status', { refill: refillId })

// Get multiple refill statuses
export const getMultipleRefillStatuses = (refillIds) =>
  postAction('refill_status', { refills: refillIds.join(',') })

// Get user balance
export const getBalance = () => postAction('balance')
