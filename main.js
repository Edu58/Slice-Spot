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

    // Get form details
    $('#form').on('submit', (e) => {
        e.preventDefault()

        const size = $('#size').val()
        const crust = $('#crust').val()
        const topping = $('#topping').val()
        const quantity = $('#quantity').val()
        const location = $('#location').val()

        const Order = new order(size, crust, topping, quantity, location)
        console.log(Order)
    })
});