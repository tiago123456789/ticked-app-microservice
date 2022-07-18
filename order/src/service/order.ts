
class Order {

    create() {
        // Find the ticket the user is trying to order in the database
        // Make sure that this ticket is not already reserved
        // Calculate an expiration date for this order
        // Build the order and save it to the database
        // Publish an event saying that an order was created
    }
}

export default Order;