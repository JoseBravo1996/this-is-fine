var cartAmount = 0;
var cartElement = $("#carrito");
cartElement.html(carrito);

function afterLoad(){
    $(".card").click(function () {
        let flag = $(this).attr('flag');
        let amount = parseInt($(this).text().split("$")[1]);
        if (flag == "true") {
            $(this).attr('flag','false');
            $(this).removeAttr('style');
            $(this).children('img').removeAttr('style');
            modifyCart(amount,"remove")
        } else {
            $(this).attr('flag','true');
            $(this).css({ "background-color": "var(--colorHover)" });
            $(this).children('img').css({ "opacity": "75%" });
            modifyCart(amount,"add")
        }
    });
}

function modifyCart(amount,action) {
    switch (action) {
        case "add":
            cartAmount += amount;
            break;
        case "remove":
            cartAmount -= amount;
            break;
    }
    cartElement.html(cartAmount);
}