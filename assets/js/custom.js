/*************************
             Owl-carousel 
        *************************/
jQuery('.owl-carousel').each(function () {
    var $carousel = jQuery(this);
    $carousel.owlCarousel({
        items: $carousel.data("items"),
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        nav: $carousel.data("nav"),
        dots: $carousel.data("dots"),
        autoplay: $carousel.data("autoplay"),
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        navText: ["<i class='fa fa-angle-left fa-2x'></i>", "<i class='fa fa-angle-right fa-2x'></i>"],
        responsiveClass: true,
        responsive: {
            // breakpoint from 0 up
            0: {
                items: $carousel.data("items-mobile-sm"),
                nav: false,
                dots: true
            },
            // breakpoint from 480 up
            480: {
                items: $carousel.data("items-mobile"),
                nav: false,
                dots: true
            },
            // breakpoint from 786 up
            786: {
                items: $carousel.data("items-tab")
            },
            // breakpoint from 1023 up
            1023: {
                items: $carousel.data("items-laptop")
            },
            1199: {
                items: $carousel.data("items")
            }
        }
    });
});







jQuery("#contactForm").on("click", function () {
    // alert('hi');
    var signInSuccess = {
        type: "success",
        title: "Thank you",
        text: "Thanks for contacting us! Our team will be in touch with you shortly.",
    };
    // $.validator.addMethod("regExp_pan", function(value, element) {
    //     return this.optional(element) || /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/.test(value);
    // }, "PAN Number Like ASDFQ4567G");
    jQuery.validator.addMethod(
        "name_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/.test(value)
            );
        },
        "Please enter only texts."
    );

    jQuery.validator.addMethod(
        "phone_regex",
        function (value, element) {
            return this.optional(element) || /[6-9][0-9]{9}$/.test(value);
        },
        "Please Enter Valid Phone Number Format."
    );
    jQuery.validator.addMethod(
        "email_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^[-+.\w]{5,64}@[-.\w]{1,64}\.[-.\w]{2,3}$/.test(value)
            );
        },
        "Please enter a valid email address."
    );
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    jQuery(this).validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: {
                required: true,
                name_regex: true,
                minlength: 3,
                maxlength: 20,
            },
           
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10,
                phone_regex: true,
            },
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email_regex: "Please enter a valid email address.",
            },
            message: {
                required: true,
                minlength: 20,
                maxlength:200
            },
            subject: {
                required:true,
            }
        },
        // Specify validation error messages
        messages: {
            phone: {
                required: "The phone field is required.",
                maxlength: "This phone field must 10 numbers.",
                minlength: "Please enter 10 digits."
            },
            email: {
                required: "The email field is required.",
            },
            name: {
                required: "The name field is required.",
                regExp_pan: "Please enter at least 5 characters.",
                minlength: "Please enter at least 3 characters.",
            },
            message: {
                required: "The message field is required.",
                minlength: "Please enter atleast 20 characters.",
                maxlength:"Please do not enter more than 200 characters."
            },
            subject: {
                required:"The subject field is required",
            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function () {
            swal(signInSuccess);
        },
    });
    jQuery("button.confirm").on("click", function () {
        jQuery("#contactForm").find("input").val("");
        jQuery("#contactForm").find("textarea").val("");
    });
});

$("#signin_form").on("click", function () {
    var signInSuccess = {
        type: "success",
        title: "Thank You !",
        text: "You Have Signed In Successfully.",
    };
    // $.validator.addMethod("regExp_pan", function(value, element) {
    //     return this.optional(element) || /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/.test(value);
    // }, "PAN Number Like ASDFQ4567G");
    $.validator.addMethod(
        "name_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/.test(value)
            );
        },
        "Please enter only texts"
    );

    $.validator.addMethod(
        "phone_regex",
        function (value, element) {
            return this.optional(element) || /^[6-9][0-9]{9}$/.test(value);
        },
        "Enter Valid Phone Number Format"
    );

    $.validator.addMethod(
        "email_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^[A-Za-z]+([\._-]?\w+){2}@\w+([\.-]?\w+)*(\.\w{2,3})$/.test(
                    value
                )
            );
        },
        "Enter Valid Email Format"
    );
    $.validator.addMethod(
        "password_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                    value
                )
            );
        },
        "Enter a Minimum 6 characters, at least one letter, one number and one special character"
    );
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $(this).validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: {
                required: true,
                name_regex: true,
                minlength: 3,
                maxlength: 30,
            },
            message: "required",
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10,
                phone_regex: true,
            },
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email_regex: "Enter Valid Email Format",
            },
            // password: {
            //     required: true,
            //     maxlength: 30,
            //     password_regex: true,
            // },
        },
        // Specify validation error messages
        messages: {
            phone: {
                required: "The phone field is required!",
                maxlength: "This phone field must be 10 digits",
            },
            email: {
                required: "The email field is required!",
            },
            name: {
                required: "The name field is required!",
                regExp_pan: "Please enter atleast 5 characters",
                minlength: "Please enter atleast 3 characters",
                maxlength: "Please enter no more than 30 characters",
            },
            password: {
                required: "The password field is required!",
            },
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function () {
            swal(signInSuccess);
        },
    });
    $("button.confirm").on("click", function () {
        $("#signin_form").find("input").val("");
        $("#signin_form").find("textarea").val("");
    });
});

$("#signup_form").on("click", function () {
    var signInSuccess = {
        type: "success",
        title: "Welcome !",
        text: "Your Account Has been created",
    };
    // $.validator.addMethod("regExp_pan", function(value, element) {
    //     return this.optional(element) || /[a-zA-z]{5}\d{4}[a-zA-Z]{1}/.test(value);
    // }, "PAN Number Like ASDFQ4567G");
    $.validator.addMethod(
        "name_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$/.test(value)
            );
        },
        "Please enter only texts"
    );

    $.validator.addMethod(
        "phone_regex",
        function (value, element) {
            return this.optional(element) || /[6-9][0-9]{9}$/.test(value);
        },
        "Please Enter Valid Phone Number Format"
    );
    $.validator.addMethod(
        "email_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^[A-Za-z]+([\._-]?\w+){2}@\w+([\.-]?\w+)*(\.\w{2,3})$/.test(
                    value
                )
            );
        },
        "Please enter Valid email format!"
    );
    $.validator.addMethod(
        "password_regex",
        function (value, element) {
            return (
                this.optional(element) ||
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                    value
                )
            );
        },
        "Enter a Minimum 6 characters, at least one letter, one number and one special character"
    );
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $(this).validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: {
                required: true,
                name_regex: true,
                minlength: 3,
                maxlength: 30,
            },
            message: "required",
            phone: {
                required: true,
                minlength: 10,
                maxlength: 10,
                phone_regex: true,
            },
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email_regex: "Please enter Valid email format!",
            },
            password: {
                required: true,
                maxlength: 30,
                password_regex: true,
            },
            agree: {
                required:true,
            }
        },
        // Specify validation error messages
        messages: {
            phone: {
                required: "The phone field is required!",
                minlength: "Please enter 10 digits",
                maxlength: "Please enter no more than 10 digits",
            },
            email: {
                required: "The email field is required!",
            },
            name: {
                required: "The name field is required!",
                regExp_pan: "Please enter atleast 5 characters",
                minlength: "Please enter atleast 3 characters",
                maxlength: "Please enter no more than 30 characters",
            },
            password: {
                required: "The password field is required!",
            },
            agree: {

            }
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function () {
            swal(signInSuccess);
        },
    });
    $("button.confirm").on("click", function () {
        $("#signup_form").find("input").val("");
        $("#signup_form").find("textarea").val("");
        $('#agree').prop('checked', false); // Unchecks it
    });
});





$('.big-image').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  nextArrow: '.next_caro',
  prevArrow: '.previous_caro'
});
