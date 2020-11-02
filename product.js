// ------------------------- PRODUCT DISPLAY SECTION -------------------------
function loadDetails() {
  if (localStorage.getItem("details")) {
    let details = JSON.parse(localStorage.getItem("details"));
    document.getElementById("allDetails").innerHTML = `<section>
  <div class="productContainer">
    <div class="productPhotoContainer">
      <div class="photoSidebar">
        <img
          src="${details.image1}"
          alt=""
          class="sidebar1 sidebar"
        />
        <img
          src="${details.image2}"
          alt=""
          class="sidebar2 sidebar"
        />
        <img
          src="${details.image3}"
          alt=""
          class="sidebar3 sidebar"
        />
        <img
          src="${details.image}"
          alt=""
          class="sidebar4 sidebar"
        />
      </div>
      <div class="mainPhoto">
        <img
          class="product-image main"
          src="${details.image}"
          alt=""
          id="mainPic"
        />
      </div>
    </div>
    <div class="productDetails">
      <h2 class="productName">
      ${details.name}
      </h2>
      <div class="price-item">
        <div class="price">
          <p>
            <strong>R</strong
            ><input
              type="text"
              class="item-price"
              id="total"
              value="${details.price}"
              disabled
            />
          </p>
        </div>
      </div>
      <br />
      <div class="buys">
        
          <button class="buy"
          data-price="${details.price}"
          data-img="${details.image}"
          data-name="${details.name}">add to cart</button>
        
      </div>
      <br />
      <h5 class="infoHeading">Product information</h5>
      <p class="productInfo">
        This mask helps ease the transition into a new season, which is
        when our skin can act up the most - especially for reactive skin
        types like those prone to acne and rosacea.
      </p>
      <br />
      <button class="accordion">More details</button>
      <div class="panel">
        <p>
          In fact, this mask addresses the surface level causes of
          congestion and irritation while preparing our skin deep down for
          a seasonal shift. Keeping our skin strong and balanced helps our
          skin maintain good health, reduce the chance of future
          irritation, and fade any current redness, hyperpigmentation, and
          inflammation.
        </p>
        <br />
      </div>

      <button class="accordion">Quick facts</button>
      <div class="panel">
        <ul>
          <li>Gentle and deep cleaning (great for congested skin!)</li>
          <li>
            Packed with antioxidants, vitamins, and nutrients for the skin
          </li>
          <li>Supports the skin’s microbiome with probiotics</li>
          <li>Soothing and calming for skin that needs a break</li>
          <li>Repairs and fortifies this skin</li>
          <li>No added fragrance, scents, or essential oils</li>
          <li>Formulated with clean and kind ingredients</li>
        </ul>
        <br />
      </div>

      <button class="accordion">How to use</button>
      <div class="panel">
        <p>
          Apply and massage on your body, hands, and face. For external
          use only. Avoid eye contact. If reaction occurs, discontinue
          use. This product is light sensitive. Store in a cool, dry place
          away from direct sunlight. Graininess may occur over time due to
          natural ingredients, but this does not affect the efficiency of
          the product. To reliquify, place the jar in warm water.
        </p>
        <br />
      </div>
      <button class="accordion">Ingredient Superstars</button>
      <div class="panel">
        <p>
          <strong>Essential Oil:</strong> Strengthens nerves and nervous
          system. Also aids in relieving anxiety, depression, and stress.

          <br />
          <strong>Roman Chamomile Essential Oil:</strong> Calms the skin,
          mind, and body and helps support healthy immune system function.

          <br />
          <strong>Clary Sage Essential Oil:</strong> Used for centuries to
          help hormonally support the female body. Helps relieve PMS,
          menopause, and stress. A very relaxing scent. Ylang Ylang
          Essential Oil: Helps relieve insomnia, fatigue, and other
          stress-related conditions.
          <br />
          <br />
          <strong>Full List of Ingredients:</strong> Butyrospermum Parkii
          (Shea Butter)*, Helianthus Annuus (Sunflower) Seed Oil*,
          Carthamus Tinctorius (Safflower Seed) Oil*, Theobroma Cacao
          (Cocoa) Seed Butter*, Copernicia Cerifera (Carnauba) Wax*,
          Tocopherol (Vitamin E)**, Essential Oils Of: Citrus Aurantium
          (Petitgrain)*, Anthemis Nobilis (Roman Chamomile) Flower*,
          Salvia Sclarea (Clary Sage)*, Cananga Odorata (Ylang Ylang)
          Flower* *Certified Organic **Certified Non-GMO ISO
          <br />
          <br />
          <em>
            For educational purposes only. Any statements or claims about
            the possible health benefits have not been evaluated by the
            Food & Drug Administration (FDA) and are not intended to
            diagnose, treat, prevent, or cure any diseases.</em
          >
        </p>
      </div>
    </div>
  </div>
</section>`;
  }
  let side = document.getElementsByClassName("sidebar");
  let main = document.getElementById("mainPic");

  side[0].addEventListener("click", function () {
    main.src = side[0].src;
  });

  side[1].addEventListener("click", function () {
    main.src = side[1].src;
  });

  side[2].addEventListener("click", function () {
    main.src = side[2].src;
  });

  side[3].addEventListener("click", function () {
    main.src = side[3].src;
  });

  // ----------------------------------------------------------------
  // accordion section in the product pages
  let acc = document.getElementsByClassName("accordion");

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      // Toggle between hiding and showing the active panel in the product section
      let panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
  let addToCart = document.getElementsByClassName("buy");

  for (let i = 0; i < addToCart.length; i++) {
    let button = addToCart[i];

    button.addEventListener("click", function () {
      let name = button.getAttribute("data-name");
      let price = button.getAttribute("data-price");
      let image = button.getAttribute("data-img");

      addItem(name, price, image);
    });
  }
}

// ----------------------------------------------------------------
