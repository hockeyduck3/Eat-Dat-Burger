$('.newBurgerInfo').on('submit', function(event) {
    event.preventDefault();

    let burger = $('.burgerInput').val().trim();


    // Validate the burger before adding it to the db
    if (burger === '') {
        return;
    }

    else if (burger.match(/[0-9]/)) {
        return;
    }

    else if (burger.length > 50) {
        return;
    }

    
    let newBurger = {
        burger_name: burger
    }

    // Post the new burger to the db 
    $.ajax('/burger', {
        type: 'POST',
        data: newBurger
    }).then(function(data) {
        location.reload();
    });
})