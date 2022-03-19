$(function () {

    // hide checkout card and location input
    $('#order-card').hide()
    $('#div-location').hide()
    
    // Toggle location input on clickiing delivered checkbox
    $('#delivered').on('click', () => {
        $('#div-location').toggle()
    })

    // Order constructor
    function order (size, crust, topping, quantity, location) {
        this.size = size
        this.crust = crust
        this.topping = topping
        this.quantity = quantity
        this.location = location
    }

    // Baseprice and delivery fees
    const basePrice = 500;
    let totalPrice;
    const deliveryFee = 200;
    let deliveredAt;

    // Method used to calculate price based on user input
    order.prototype.calculatePrice = function () {

        // Determine price based on size
        if (this.size === 'small') {
            totalPrice = basePrice * this.quantity
        } else if (this.size === 'medium') {
            totalPrice = (basePrice + 200) * this.quantity
        } else if (this.size === 'large') {
            totalPrice = (basePrice + 400) * this.quantity
        } else {
            return null
        }

        // Add delivery fee if delivery is required
        if (this.location !== '') {
            totalPrice += deliveryFee
            deliveredAt= 'Will be delivered at ' + this.location
        }

        return totalPrice;
    }

    // Get form details
    $('#form').on('submit', (e) => {
        // Prevent browser refresh
        e.preventDefault()

        // Get user input from form
        const size = $('#size').val()
        const crust = $('#crust').val()
        const topping = $('#topping').val()
        const quantity = $('#quantity').val()
        const location = $('#location').val()

        
        // Create new Order object with properties from form
        const Order = new order(size, crust, topping, quantity, location)

        // Call calculate price method
        const orderPrice = Order.calculatePrice().toLocaleString('en-US', {
            style: 'currency',
            currency: 'KSH'
        })
        
        // Insert price into price card element
        $('#showPrice').text('Total: ' + orderPrice)
        
        $('#deliveredAt').text(deliveredAt)

        // Reveal card to user with price inserted
        $('#order-card').fadeIn()

        $('#success-modal').text(
            quantity + ' ' + size +' ' + ' pizza(s) ' + ' with a ' + crust + ' crust and ' + topping + ' topping coming your way. Welcome Again'
        )

        $('#modal-price').text('Total Charged: ' + orderPrice)

        // remove checkout card
        $('#checkout').on('click', () => {
            $('#order-card').fadeOut()
        })

        // hide location div again
        $('#div-location').hide()

        // reset delivery location and price 
        deliveredAt = '';
        totalPrice = 0;

        // reset form
        $('#form').trigger('reset')
    })
});