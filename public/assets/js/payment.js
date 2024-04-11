document.getElementById("total-amt").onclick = async function () {
  var totalAmt = document.getElementById("total-amt").textContent;
  var totalAmount = Number(totalAmt) * 100;
  console.log("Total amount", totalAmount);

  var response = await fetch("/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: totalAmount,
    }),
  });

  var options = {
    key: "rzp_test_WWwUvmEAQ64wLv", // Enter your Key ID
    orderId: response.id,
    amount: totalAmount, // 500 rupees in paise
    currency: "INR",
    name: "FRCRCE Canteen",
    description: "Test Transaction",
    image: "assets/images/logo.svg",
    handler: function (response) {
    alert(response.razorpay_payment_id);
      
    //console.log("Payment successful. Redirecting...");

      window.location.href = "http://127.0.0.1:5500/QR-CODE-DINING-DELIGHT-main/MINI/success.html"
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "note value",
    },
    theme: {
      color: "#595754",  
      
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
  console.log("Payment button clicked", options);
};
