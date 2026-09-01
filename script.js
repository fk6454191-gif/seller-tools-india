 // MARKETPLACE DYNAMIC TEXT

document.addEventListener("DOMContentLoaded", function () {

    const marketplace = document.getElementById("marketplace");
    const feeLabel = document.getElementById("marketplaceFeeLabel");
    const feeHelp = document.getElementById("marketplaceFeeHelp");

    function updateMarketplaceText() {

        if (marketplace.value === "amazon") {
            feeLabel.textContent = "Amazon Marketplace Fee";
            feeHelp.textContent =
                "Referral, closing & fulfilment charges";
        }

        else if (marketplace.value === "flipkart") {
            feeLabel.textContent = "Flipkart Marketplace Fee";
            feeHelp.textContent =
                "Commission, fixed & shipping charges";
        }

        else if (marketplace.value === "meesho") {
            feeLabel.textContent = "Meesho Marketplace Fee";
            feeHelp.textContent =
                "Enter your applicable Meesho charges";
        }

        else {
            feeLabel.textContent = "Platform Fee";
            feeHelp.textContent =
                "Payment gateway or other platform charges";
        }
    }

    marketplace.addEventListener(
        "change",
        updateMarketplaceText
    );

    updateMarketplaceText();

});
function calculateProfit() {
    let marketplace =
    document.getElementById("marketplace").value;
    
    let sellingPrice =
        Number(document.getElementById("sellingPrice").value);

    let productCost =
        Number(document.getElementById("productCost").value);

    let shippingCost =
        Number(document.getElementById("shippingCost").value);

    let packagingCost =
        Number(document.getElementById("packagingCost").value);

    let marketplaceFee =
        Number(document.getElementById("marketplaceFee").value);

    let otherCost =
        Number(document.getElementById("otherCost").value);

    let returnRate =
        Number(document.getElementById("returnRate").value);

    let returnCost =
        Number(document.getElementById("returnCost").value);

let orderCount =
    Number(document.getElementById("orderCount").value);
    
    // Basic validation
    if (sellingPrice <= 0) {
        document.getElementById("result").innerHTML =
            `<div class="result-error">
                Please enter a valid Selling Price.
            </div>`;
        return;
    }

    if (returnRate < 0 || returnRate >= 100) {
        document.getElementById("result").innerHTML =
            `<div class="result-error">
                Return Rate must be between 0% and 99%.
            </div>`;
        return;
    }


    let totalCost =
        productCost +
        shippingCost +
        packagingCost +
        marketplaceFee +
        otherCost;


    let profitBeforeReturns =
        sellingPrice - totalCost;


    let returnRateDecimal =
        returnRate / 100;


    let expectedProfitPerOrder =
        ((1 - returnRateDecimal) * profitBeforeReturns)
        -
        (returnRateDecimal * returnCost);


    let expectedMargin =
        (expectedProfitPerOrder / sellingPrice) * 100;


    let expectedROI =
        totalCost > 0
            ? (expectedProfitPerOrder / totalCost) * 100
            : 0;


    // True return-adjusted break-even price
    let breakEvenPrice =
        (
            ((1 - returnRateDecimal) * totalCost)
            +
            (returnRateDecimal * returnCost)
        )
        /
        (1 - returnRateDecimal);


    let expectedReturnsFor100 =
    orderCount * returnRateDecimal;

let successfulOrdersFor100 =
    orderCount - expectedReturnsFor100;

let profitFor100Orders =
    expectedProfitPerOrder * orderCount;

let revenueFor100Orders =
    sellingPrice * orderCount;


    let healthText;
    let healthClass;

    if (expectedProfitPerOrder < 0) {
        healthText = "LOSS";
        healthClass = "danger";
    } else if (expectedMargin < 10) {
        healthText = "THIN MARGIN";
        healthClass = "warning";
    } else if (expectedMargin < 20) {
        healthText = "DECENT";
        healthClass = "medium";
    } else {
        healthText = "HEALTHY";
        healthClass = "good";
    }


    document.getElementById("result").innerHTML = `
        <div class="profit-dashboard">
<div class="profit-top">
            <div class="marketplace-result">
    ${String(marketplace).toUpperCase()}
</div>
                <span class="profit-label">
                    Expected Profit / Order
                </span>

                <div class="profit-big-number">
                    ₹${expectedProfitPerOrder.toFixed(2)}
                </div>

                <div class="health-badge ${healthClass}">
                    ${healthText}
                </div>
            </div>


            <div class="metric-grid">

                <div class="metric-card">
                    <span>Margin</span>
                    <strong>${expectedMargin.toFixed(2)}%</strong>
                </div>

                <div class="metric-card">
                    <span>ROI</span>
                    <strong>${expectedROI.toFixed(2)}%</strong>
                </div>

                <div class="metric-card">
                    <span>Return Rate</span>
                    <strong>${returnRate.toFixed(1)}%</strong>
                </div>

                <div class="metric-card">
                    <span>Break-even</span>
                    <strong>₹${breakEvenPrice.toFixed(2)}</strong>
                </div>

            </div>


            <div class="details-block">

                <div>
                    <span>Total Cost / Order</span>
                    <strong>₹${totalCost.toFixed(2)}</strong>
                </div>

                <div>
                    <span>Profit Before Returns</span>
                    <strong>₹${profitBeforeReturns.toFixed(2)}</strong>
                </div>

            </div>


            <div class="projection-card">

                <span class="projection-label">
                    ${orderCount.toLocaleString("en-IN")} Orders Projection
                </span>

                <div class="projection-grid">

                    <div>
                        <span>Gross sales</span>
                        <strong>₹${revenueFor100Orders.toFixed(2)}</strong>
                    </div>

                    <div>
                        <span>Successful Orders</span>
                        <strong>${successfulOrdersFor100.toFixed(0)}</strong>
                    </div>

                    <div>
                        <span>Expected Returns</span>
                        <strong>${expectedReturnsFor100.toFixed(0)}</strong>
                    </div>

                    <div>
                        <span>Estimated Profit</span>
                        <strong>₹${profitFor100Orders.toFixed(2)}</strong>
                    </div>

                </div>

            </div>

        </div>
    `;
} 
function calculateGST() {

    let amount =
        Number(document.getElementById("gstAmount").value);

    let gstRate =
        Number(document.getElementById("gstRate").value);

    let gstType =
        document.getElementById("gstType").value;


    if (amount <= 0) {

        document.getElementById("gstResult").innerHTML = `
            <div class="result-error">
                Please enter a valid amount.
            </div>
        `;

        return;
    }


    let gstAmount;
    let baseAmount;
    let finalAmount;


    if (gstType === "exclusive") {

        baseAmount = amount;

        gstAmount =
            amount * (gstRate / 100);

        finalAmount =
            amount + gstAmount;

    } else {

        baseAmount =
            amount / (1 + gstRate / 100);

        gstAmount =
            amount - baseAmount;

        finalAmount =
            amount;
    }


    document.getElementById("gstResult").innerHTML = `
        <div class="profit-dashboard">

            <div class="profit-top">

                <span class="profit-label">
                    GST Amount
                </span>

                <div class="profit-big-number">
                    ₹${gstAmount.toFixed(2)}
                </div>

            </div>

            <div class="metric-grid">

                <div class="metric-card">
                    <span>Base Amount</span>
                    <strong>
                        ₹${baseAmount.toFixed(2)}
                    </strong>
                </div>

                <div class="metric-card">
                    <span>GST Rate</span>
                    <strong>
                        ${gstRate.toFixed(0)}%
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Final Amount</span>
                    <strong>
                        ₹${finalAmount.toFixed(2)}
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Mode</span>
                    <strong>
                        ${
                            gstType === "exclusive"
                                ? "GST Added"
                                : "GST Included"
                        }
                    </strong>
                </div>

            </div>

        </div>
    `;
} 
function calculateSellingPrice() {

    let productCost =
        Number(document.getElementById("spProductCost").value);

    let shippingCost =
        Number(document.getElementById("spShippingCost").value);

    let packagingCost =
        Number(document.getElementById("spPackagingCost").value);

    let marketplaceFee =
        Number(document.getElementById("spMarketplaceFee").value);

    let otherCost =
        Number(document.getElementById("spOtherCost").value);

    let targetMargin =
        Number(document.getElementById("spTargetMargin").value);


    if (targetMargin < 0 || targetMargin >= 100) {

        document.getElementById("sellingPriceResult").innerHTML = `
            <div class="result-error">
                Target Margin must be between 0% and 99%.
            </div>
        `;

        return;
    }


    let totalCost =
        productCost +
        shippingCost +
        packagingCost +
        marketplaceFee +
        otherCost;


    if (totalCost <= 0) {

        document.getElementById("sellingPriceResult").innerHTML = `
            <div class="result-error">
                Please enter your costs.
            </div>
        `;

        return;
    }


    let marginDecimal =
        targetMargin / 100;


    let suggestedPrice =
        totalCost / (1 - marginDecimal);


    let expectedProfit =
        suggestedPrice - totalCost;


    let markup =
        totalCost > 0
            ? (expectedProfit / totalCost) * 100
            : 0;


    let roundedPrice =
        Math.ceil(suggestedPrice);


    document.getElementById("sellingPriceResult").innerHTML = `
        <div class="profit-dashboard">

            <div class="profit-top">

                <span class="profit-label">
                    Suggested Selling Price
                </span>

                <div class="profit-big-number">
                    ₹${suggestedPrice.toFixed(2)}
                </div>

                <div class="health-badge good">
                    TARGET PRICE
                </div>

            </div>

            <div class="metric-grid">

                <div class="metric-card">
                    <span>Total Cost</span>
                    <strong>
                        ₹${totalCost.toFixed(2)}
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Target Margin</span>
                    <strong>
                        ${targetMargin.toFixed(1)}%
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Expected Profit</span>
                    <strong>
                        ₹${expectedProfit.toFixed(2)}
                    </strong>
                </div>

                <div class="metric-card">
                    <span>Markup</span>
                    <strong>
                        ${markup.toFixed(2)}%
                    </strong>
                </div>

            </div>

            <div class="projection-card">

                <span class="projection-label">
                    Easy Listing Price
                </span>

                <div class="profit-big-number">
                    ₹${roundedPrice}
                </div>

            </div>

        </div>
    `;
}  
/* =========================
   ENTER KEY + NUMBER INPUT FIX
========================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ENTER PRESS = CLICK CALCULATE BUTTON */
document.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") {
        return;
    }

    const activeElement = document.activeElement;

    if (
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "SELECT"
        )
    ) {

        event.preventDefault();

        const mainButton =
            document.querySelector(".main-btn");

        if (mainButton) {
            mainButton.click();
        }

    }

});
    




    /* DISABLE MOUSE WHEEL ON NUMBER INPUT */

    const numberInputs =
        document.querySelectorAll('input[type="number"]');

    numberInputs.forEach(input => {

        input.addEventListener("wheel", function (event) {

            if (document.activeElement === input) {
                event.preventDefault();
            }

        }, { passive: false });

    });

});