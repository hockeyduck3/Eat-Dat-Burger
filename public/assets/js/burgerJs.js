// Needed variables
var h1 = $('.newBurgerH1');
var kitty = $('.errorCat');
var inputGroup = $('.burgerInput, .addBurger');

// Variables for if the user tries to submit nothing
var prevNum;
var errorMessage;
var errorArr = [
    {
        text: 'There\'s nothing there...',
        pic: 'pusheen-disappointed.png',
    },
    {
        text: 'You typed nothing...',
        pic: 'pusheen-upset.png',
    },
    {
        text: 'I am disappointed.',
        pic: 'pusheen-disappointed.png' 
    },
    {
        text: 'That\'s not a burger...',
        pic: 'pusheen-upset.png' 
    },
    {
        text: 'Really?',
        pic: 'pusheen-upset.png' 
    },
    {
       text: 'Not funny...',
       pic: 'pusheen-disappointed.png' 
    },
    {
       text: 'Y u no burger?',
       pic: 'pusheen-mad.png'
    },
    {
        text: 'This a joke?',
        pic: 'pusheen-mad.png'
    }
];

// When the user types in the add burger field this will check and see if an error is showing
$('.burgerInput').on('keydown', function() {
    if (!kitty.hasClass('hide')) {
        hideError();
    }
});

// This function will grab the number for the index and make sure not to grab the same number twice in a row.

// When the user submits a new burger
$('.newBurgerInfo').on('submit', function(event) {
    event.preventDefault();

    let burger = $('.burgerInput').val().trim();

    // Validate the burger before adding it to the db
    if (burger === '') {
        let index = Math.floor(Math.random() * errorArr.length);

        // Check and see if the index was previously used
        // This is used to the error message won't be the same thing twice in a row
        if (index === prevNum) {
            // If the last number of the array was picked then go to the number before
            if (index === errorArr.length - 1) {
                index = index - 1;
            } 
            
            // Else go to the next number in the array
            else { 
                index = index + 1;
            }
        }
    
        // Always set the prevNum to the current index to check again
        prevNum = index;
        errorMessage = errorArr[index];
        displayError();

        return;
    }

    else if (burger.match(/[0-9]/)) {
        errorMessage = {
            text: 'No numbers allowed.',
            pic: 'pusheen-sunglasses.png'
        };
        displayError();
        return;
    }

    else if (burger.length > 50) {
        errorMessage = {
            text: 'Max character limit is 50.',
            pic: 'pusheen-shocked.png'
        };
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

// When the user clicks on a burger name
$('.devourBtn').click(function() {
    let id = $(this).data('id');

    let devourState = {
        devoured: true
    }

    $.ajax(`/burgers/${id}`, {
        method: 'PUT',
        data: devourState
    }).then(function(data) {
        location.reload();
    })
})

// When the user clicks on the trash icon next to a burger
$('.deleteBtn').click(function() {
    let id = $(this).data('id');
   
    $.ajax(`/burgers/${id}`, {
        type: 'DELETE',
    }).then(function(data) {
        location.reload();
    });
});

// Function for displaying any error from the field validation
function displayError() {
    var emotion;
    var scroll;

    // Depending on which picture will be displayed, this will update the emotion in the alt attribute.
    // This is mainly for those who are using screen readers on the site
    switch (errorMessage.pic) {
        case 'pusheen-disappointed.png':
            emotion = 'disappointed';
            break;

        case 'pusheen-upset.png':
            emotion = 'upset';
            break;

        case 'pusheen-mad.png':
            emotion = 'mad';
            break;
    }

    $('.error').slideUp('fast');

    // This bit of code is wrapped in setTimeout function to first the slideUp animation time to finish
    setTimeout(function() {
        h1.css('color', 'red');
        h1.text(errorMessage.text);

        kitty.attr(
            {
                'src': `/assets/img/${errorMessage.pic}`,

                'alt': `Pusheen the cat is looking ${emotion} about the error.`
            },
        );

        inputGroup.css('border-color', 'red');
    
        kitty.removeClass('hide');

        // The slide down is also in a setTimeout function to allow the pusheen picture enough time to change
        setTimeout(function() {
            $('.error').slideDown('fast');

            // This will make it so that the screen doesn't scroll all the way to the bottom if the 'no numbers' error occurs
            // This is because the image for the no numbers error is taller than all the other image's
            if (errorMessage.text === 'No numbers allowed.') {
                scroll = 800;
            } else {
                scroll = 920;
            }
            
            $('html, body').animate({scrollTop: scroll}, 'fast');
        }, 300);

    }, 300);
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