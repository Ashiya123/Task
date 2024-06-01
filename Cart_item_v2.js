function Updatecart() {
    console.log("Updatecart function called.");

    const apiUrl = 'https://blank-sunglasses.com/products/john.js';

    // Make a GET request using the Fetch API
    fetch(apiUrl)
        .then(response => {
            console.log("Fetch response received:", response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(userData => {
            //console.log('User Data:', userData);
            addPopularProductToCart(userData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function addPopularProductToCart(userData) {
        const cartDrawerElement = document.getElementById('cart-drawer');
        const existingPopularProduct = cartDrawerElement.querySelector('.popular-product');

        if (!existingPopularProduct) {
            const newElement = `
                <div class="cart-drawer__items popular-product">
                    <line-item class="line-item">
                        <img id="variantImage" src="//cdn.shopify.com/s/files/1/0532/8070/2649/products/classic-545673.jpg?v=1643435364&amp;width=1667" alt="CLASSIC. - Blank Sunglasses" sizes="(max-width: 699px) 70px, 120px" class="line-item__media">
                        <div class="line-item-info">
                            <div class="v-stack justify-items-start gap-2">
                                <div class="v-stack justify-items-start gap-1">
                                    <a href="/products/classic?variant=38722218721465" class="h6">John.</a>
                                    <price-list class="price-list popular-product-price" id="price">
                                        <sale-price class="h6 text-subdued">
                                            <span class="sr-only">Sale price</span>Price: $3600.00
                                        </sale-price>
                                    </price-list>
                                </div>
                                <div class="v-stack justify-items-start gap-1">
                                    <select name="options" id="options" style="border: 1px solid black;"></select>
                                </div>
                                <form method="post" action="/cart/add" id="product-form-6237407019193-template--20526001127752__main" accept-charset="UTF-8" class="shopify-product-form popular-product-btn-form" enctype="multipart/form-data" is="product-form">
                                    <input type="hidden" name="form_type" value="product">
                                    <input type="hidden" name="utf8" value="✓">
                                    <input type="hidden" name="id" value="38722259091641" id="variant-id-input">
                                    <div class="v-stack gap-4 popular-product-item">
                                        <buy-buttons class="buy-buttons" template="" form="product-form-6237407019193-template--20526001127752__main">
                                            <button type="submit" class="button w-full popular-product-item-add-to-btn">Add to cart</button>
                                        </buy-buttons>
                                    </div>
                                    <input type="hidden" name="product-id" value="6237407019193">
                                    <input type="hidden" name="section-id" value="template--20526001127752__main">

                                    <line-item-quantity class="h-stack gap-4">
                                        <quantity-selector class="quantity-selector quantity-selector--sm popular-product-item-quantity">
                                            <a href="#" id="decrement-btn" class="quantity-selector__button">
                                                <span class="sr-only">Decrease quantity</span>
                                                <svg aria-hidden="true" focusable="false" fill="none" width="10" class="icon icon-minus" viewBox="0 0 12 12">
                                                    <path d="M0 6h12" stroke="currentColor" stroke-width="1"></path>
                                                </svg>
                                            </a>
                                            <input class="quantity-selector__input text-sm" type="number" id="quantity-input" name="quantity" value="1" inputmode="numeric" max="1000" aria-label="Change quantity" style="--quantity-selector-character-count: 1ch;">
                                            <a href="#" id="increment-btn" class="quantity-selector__button">
                                                <span class="sr-only">Increase quantity</span>
                                                <svg aria-hidden="true" focusable="false" fill="none" width="10" class="icon icon-plus" viewBox="0 0 12 12">
                                                    <path d="M6 0v12M0 6h12" stroke="currentColor" stroke-width="1"></path>
                                                </svg>
                                            </a>
                                        </quantity-selector>
                                    </line-item-quantity>
                                </form>
                            </div>
                        </div>
                    </line-item>
                </div>`;

            cartDrawerElement.insertAdjacentHTML('afterbegin', newElement);

            /*******************************************************************/

            const dropdown = document.getElementById('options');
            const priceElement = document.getElementById('price');
            const imageElement = document.getElementById('variantImage');
            const variantIdInput = document.getElementById('variant-id-input');
            const quantityInput = document.getElementById('quantity-input');
            const incrementBtn = document.getElementById('increment-btn');
            const decrementBtn = document.getElementById('decrement-btn');

            // Populate dropdown options
            userData.variants.forEach(variant => {
                const option = document.createElement('option');
                option.value = variant.id;
                option.textContent = variant.title;
                dropdown.appendChild(option);
            });

            // Function to update price, image, and variant ID based on selected variant
            function updateVariantDetails() {
                const selectedVariantId = parseInt(dropdown.value);
                const selectedVariant = userData.variants.find(variant => variant.id === selectedVariantId);

                if (selectedVariant) {
                    const quantity = parseInt(quantityInput.value) || 1;
                    // Update price
                    priceElement.textContent = `Price: $${((selectedVariant.price / 100) * quantity).toFixed(2)}`;

                    // Update image
                    if (selectedVariant.featured_image) {
                        imageElement.src = selectedVariant.featured_image.src;
                        imageElement.alt = selectedVariant.featured_image.alt;
                    }

                    // Update hidden input value for variant ID
                    variantIdInput.value = selectedVariantId;
                }
            }

            // Event listener for dropdown change
            dropdown.addEventListener('change', updateVariantDetails);

            // Event listeners for quantity changes
            incrementBtn.addEventListener('click', function(event) {
                event.preventDefault();
                let currentQuantity = parseInt(quantityInput.value);
                if (!isNaN(currentQuantity) && currentQuantity < 1000) {
                    quantityInput.value = currentQuantity + 1;
                    updateVariantDetails(); // Update price based on new quantity
                }
            });

            decrementBtn.addEventListener('click', function(event) {
                event.preventDefault();
                let currentQuantity = parseInt(quantityInput.value);
                if (!isNaN(currentQuantity) && currentQuantity > 1) {
                    quantityInput.value = currentQuantity - 1;
                    updateVariantDetails(); // Update price based on new quantity
                }
            });

            // Trigger change event on page load to show the first variant details
            dropdown.dispatchEvent(new Event('change'));

            console.log("Cart updated with new element.");
        } else {
            console.log("Popular product already in cart.");
        }
    }
}

// Use MutationObserver to call Updatecart when the cart status element changes
const targetNode = document.getElementById('cart-drawer');
if (targetNode) {
    console.log("Cart drawer element found. Setting up MutationObserver...");
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log("Mutation observed. Calling Updatecart...");
                Updatecart();
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
} else {
    console.error("Cart drawer element not found. MutationObserver not set up.");
}

// Call Updatecart on page load
document.addEventListener('DOMContentLoaded', Updatecart);
