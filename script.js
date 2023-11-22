$(document).ready(function() {
    var cartVisible = false;
    var theThumbnail = [];
    var placeholder = null;

    function updateThumbnailStyles(thumbnail) {
        thumbnail.style.opacity = 0.5;
        thumbnail.style.border = "3px solid hsl(26, 100%, 55%)";
    }

    function resetThumbnailStyles() {
        if (theThumbnail.length === 1) {
            theThumbnail[0].style.opacity = 1;
            theThumbnail[0].style.border = "0";
            theThumbnail = [];
        }
    }

    function updateProductAndThumbnail(array, indexModifier) {
        resetThumbnailStyles();

        var thumbnailDiv = document.querySelector(".thumbnail-div");
        var imageArray = thumbnailDiv.querySelectorAll("div");
        var product = document.querySelector("#nozoom-pic");
        var productSrc = product.getAttribute("src");
        var imageIndex = array.indexOf(productSrc);

        var newSrc = array[(imageIndex + indexModifier + array.length) % array.length];
        product.setAttribute("src", newSrc);

        var linkArray = newSrc.split("-");
        var thumbnailLink = linkArray[2];
        var _thumbnail = document.getElementById(thumbnailLink);
        theThumbnail.push(_thumbnail);
        updateThumbnailStyles(_thumbnail);
    }

    $(".next").click(function() {
        var allThumbnails = document.querySelectorAll(".thumbnail");
        allThumbnails = Array.from(allThumbnails);
        var _imageArray = [];
        for (var a = 0; a < allThumbnails.length; a++) {
            var _img = allThumbnails[a].querySelector("img");
            _imageArray.push(_img);
        }
        
        for (var h = 0; h < _imageArray.length; h++) {
            _imageArray[h].style.opacity = 1;
            _imageArray[h].style.border = 0;
        }
        var array = getImageArray();
        updateProductAndThumbnail(array, 1);
    });

    $(".previous").click(function() {
        var allThumbnails = document.querySelectorAll(".thumbnail");
        allThumbnails = Array.from(allThumbnails);
        var _imageArray = [];
        for (var a = 0; a < allThumbnails.length; a++) {
            var _img = allThumbnails[a].querySelector("img");
            _imageArray.push(_img);
        }
        
        for (var h = 0; h < _imageArray.length; h++) {
            _imageArray[h].style.opacity = 1;
            _imageArray[h].style.border = 0;
        }
        var array = getImageArray();
        updateProductAndThumbnail(array, -1);
    });

    function getImageArray() {
        var thumbnailDiv = document.querySelector(".thumbnail-div");
        var imageArray = thumbnailDiv.querySelectorAll("div");
        var array = [];

        for (var i = 0; i < imageArray.length; i++) {
            var image = imageArray[i].querySelector("img");
            var imgSrc = image.getAttribute("src");
            imgSrc = imgSrc.replace("-thumbnail.jpg", ".jpg");
            array.push(imgSrc);
        }

        return array;
    }

    var numberOfItems = 0;
    var itemNumber = document.getElementById("item-number");
    var increase = document.getElementById("increase");
    increase.addEventListener("click", function() {
        if (cartVisible == true) {
            var shoppingCart = document.getElementById("cart-info");
            shoppingCart.style.display = "none";
        }

        if (numberOfItems == 15) {
            alert("Limited availability: Only 15 items in stock.");
        }

        else {
            numberOfItems += 1;
            itemNumber.textContent = numberOfItems;
        }
    })

    var decrease = document.getElementById("decrease");
    decrease.addEventListener("click", function() {
        if (cartVisible == true) {
            var shoppingCart = document.getElementById("cart-info");
            shoppingCart.style.display = "none";
        }

        if (numberOfItems == 0) {
            alert("Oops! Counter already at 0 😕.");
        }
        else {
            numberOfItems -= 1;
            itemNumber.textContent = numberOfItems;
        }
    })

    if (numberOfItems > 0) {
        itemNumber.textContent = numberOfItems;
    }

    var carttBtn = document.getElementById("cart");
    carttBtn.addEventListener("click", function() {
        if (cartVisible == true) {
            var shoppingCart = document.getElementById("cart-info");
            shoppingCart.style.display = "none";
        }

        if (numberOfItems > 0) {
            var cartDisplay = document.getElementById("cart-item-num");
            cartDisplay.textContent = numberOfItems;
            cartDisplay.style.display = "block";

            var productPrice = document.getElementById("price");
            var _productPrice = parseInt(productPrice.textContent);
            var total = _productPrice * numberOfItems;

            var pay = document.getElementById("pay");
            var amount = document.getElementById("amount");
            var result = document.getElementById("result");

            pay.textContent = productPrice.textContent;
            amount.textContent = numberOfItems;
            result.textContent = total.toString();
            var numberItems = document.getElementById("item-number");
            numberItems.textContent = 0;
            placeholder = numberOfItems;
            numberOfItems = 0;
        }

        else {
            alert("Nothing to add to cart ☹️.");
        }
    })

    var viewCart = document.getElementById("checkout");
    viewCart.addEventListener("click", function() {
        if (cartVisible == false) {
            if (placeholder > 0) {
                var cartInfo = document.getElementById("cart-info");
                cartInfo.style.display = "block";
                var empty = document.getElementById("empty");
                empty.style.display = "none";
                var cd = document.getElementById("cd");
                cd.style.display = "block";
                cartVisible = true;
            }
            else if (placeholder == 0 || placeholder == null) {
                var cartInfo = document.getElementById("cart-info");
                cartInfo.style.display = "block";
                var empty = document.getElementById("empty");
                empty.style.display = "block";
                var cd = document.getElementById("cd");
                cd.style.display = "none";
                cartVisible = true;
            }
        }

        else if (cartVisible == true) {
            var cartInfo = document.getElementById("cart-info");
            cartInfo.style.display = "none";
            cartVisible = false;
        }
    })

    var deleteItem = document.getElementById("item-delete");
    deleteItem.addEventListener("click", function() {
        var displayCart = document.getElementById("cd");
        displayCart.style.display = "none";

        var emptyCart = document.getElementById("empty");
        emptyCart.style.display = "block";

        var cartNumber = document.getElementById("cart-item-num");
        cartNumber.style.display = "none";

        placeholder = 0;
    })

    var checkoutBtn = document.getElementById("_checkout");
    checkoutBtn.addEventListener("click", function() {
        alert("Feature not implemented yet ☹️.\n\n*User will be redirected to payment page.\n*When payment is made, item is cleared from cart.");
    })

    $(".thumbnail").click(function() {
        var allThumbnails = document.querySelectorAll(".thumbnail");
        allThumbnails = Array.from(allThumbnails);
        var _imageArray = [];
        for (var a = 0; a < allThumbnails.length; a++) {
            var _img = allThumbnails[a].querySelector("img");
            _imageArray.push(_img);
        }
        
        for (var h = 0; h < _imageArray.length; h++) {
            _imageArray[h].style.opacity = 1;
            _imageArray[h].style.border = 0;
        }

        var theProduct = $(".product");
        var thumbnailImg = this.querySelector("img");
        var thumbnailSrc = thumbnailImg.getAttribute("src");
        var newProductSrc = thumbnailSrc.replace("-thumbnail.jpg", ".jpg");
        theProduct.attr("src", newProductSrc);
        thumbnailImg.style.opacity = 0.5;
        thumbnailImg.style.border = "3px solid hsl(26, 100%, 55%)";

        var overlay = document.getElementById("overlay");
        $("#overlay").fadeIn(1000);
        overlay.style.display = "block";
    })

    var exitZoom = document.getElementById("exit");
    exitZoom.addEventListener("click", function() {
        var overlay = document.getElementById("overlay");
        $("#overlay").fadeOut(1000, function() {
            // This code will run after the fadeOut is complete
            overlay.style.display = "none";
        });
    });

    var menu = document.getElementById("menu");
    var menuOverlay = document.getElementById("menu-overlay");
    menu.addEventListener("click", function() {
        $("#menu-overlay").fadeIn();
        $("#menu-div").fadeIn();
        menuOverlay.style.display = "block";
    });

    var exitMenu = document.getElementById("exit-menu");
    exitMenu.addEventListener("click", function() {
        $("#menu-overlay").fadeOut();
        $("#menu-div").fadeOut(1000, function() {
            // This code will run after the fadeOut is complete
            menuOverlay.style.display = "none";
        });
    });

});
