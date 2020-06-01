// Needed variables
var h1 = $('.newBurgerH1');
var kitty = $('.errorCat');
var inputGroup = $('.burgerInput, .addBurger');
var errorText;

// When the user types in the add burger field this will check and see if an error is showing
$('.burgerInput').on('keydown', function() {
    if (!kitty.hasClass('hide')) {
        hideError();
    }
});

// When the user submits a new burger
$('.newBurgerInfo').on('submit', function(event) {
    event.preventDefault();

    let burger = $('.burgerInput').val().trim();

    // Validate the burger before adding it to the db
    if (burger === '') {
        errorText = 'Field cannot be empty...';
        displayError();
        return;
    }

    else if (burger.match(/[0-9]/)) {
        errorText = 'Field cannot contain numbers...';
        displayError();
        return;
    }

    else if (burger.length > 50) {
        errorText = 'Max character limit is 50...';
        displayError();
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
});

// Function for displaying any error from the field validation
function displayError() {
    $('.error').slideUp('fast');

    // This bit of code is wrapped in setTimeout function to first the slideUp animation time to finish
    setTimeout(function() {
        h1.css('color', 'red');
        h1.text(errorText);
    
        inputGroup.css('border-color', 'red');
    
        kitty.removeClass('hide');

        $('.error').slideDown('fast');

        $('html, body').animate({scrollTop: $(document).height()}, 'fast');

    }, 500);
}

// Remove any errors on screen
function hideError() {
    $('.error').slideUp('fast');

    // This code is also wrapped in a setTimeout function to give the above slideUp animation time to finish
    setTimeout(function() {
        h1.css('color', 'black');
        h1.text('Add a new burger!');
    
        inputGroup.css('border-color', 'black');
    
        kitty.addClass('hide');
    
        $('.error').slideDown('fast');

    }, 500)

}