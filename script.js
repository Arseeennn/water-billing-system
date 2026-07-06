//app script
const webAppUrl = "https://script.google.com/macros/s/AKfycbyWaxptV-cbKBQr4bh27RE1hk3ysbofaWsjhXzBi5YYozkHoj2i57jZmqS_Z3ii8FIm/exec";


let transactionsProcessed = 0;



document.getElementById("btnGenerate").addEventListener("click", function() {
    // DOM 
    const nameInput = document.getElementById("custName").value.trim();
    const consInput = parseFloat(document.getElementById("waterCons").value);
    const typeInput = document.getElementById("custType").value;
    const formInputs = document.getElementsByClassName("form-input");
    



    // Loop
    let isValid = true;
    for (let i = 0; i < formInputs.length; i++) {
        if (formInputs[i].value === "") {
            isValid = false;
        }
    }
    
    if (!isValid || isNaN(consInput) || consInput <= 0) {
        alert("Please fill out all fields with valid data.");
        return;





    }
    
    // Conditional (if-else)
    let rate = 0;
    if (consInput >= 1 && consInput <= 20) {
        rate = 25.00;
    } else if (consInput >= 21 && consInput <= 40) {
        rate = 35.00;
    } else if (consInput >= 41 && consInput <= 60) {
        rate = 45.00;
    } else if (consInput > 60) {
        rate = 60.00;
    }
    
    let amount = consInput * rate;
    let discountRate = 0;





    
    // Discounts switch
    switch (typeInput) {
        case "Regular":
            discountRate = 0; // 0%
            break;
        case "Senior Citizen":
            discountRate = 0.25; // 25%
            break;
        case "Solo Parent":
            discountRate = 0.15; // 15%
            break;
        default:
            discountRate = 0;
    }
    
    let discount = amount * discountRate;
    let totalBill = amount - discount;
    
    
    let divider = "**********************************";
    let thinDivider = "------------------------------";
    
    let receiptText = `${divider}\n`;
    receiptText += `        WATER BILLING         \n`;
    receiptText += `${divider}\n\n`;
    receiptText += `Customer Name : ${nameInput}\n`;
    receiptText += `Customer Type : ${typeInput}\n`;
    receiptText += `Water Usage   : ${consInput} cu.m\n`;
    receiptText += `Rate          : P${rate.toFixed(2)} / cu.m\n\n`;
    receiptText += `Amount        : P${amount.toFixed(2)}\n`;
    receiptText += `Discount      : P${discount.toFixed(2)}\n`;
    receiptText += `${thinDivider}\n`;
    receiptText += `TOTAL BILL    : P${totalBill.toFixed(2)}`;





    
    // Update DOM
    document.getElementById("receiptArea").innerText = receiptText;
    
    
    transactionsProcessed++;
    document.getElementById("txCount").innerText = transactionsProcessed;




    
    // Google apps script
    const payload = {
        name: nameInput,
        consumption: consInput,
        type: typeInput,
        total: totalBill
    };
    
    const btn = document.getElementById("btnGenerate");
    btn.innerText = "Processing...";
    btn.disabled = true;
    
    fetch(webAppUrl, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Transaction saved to Google Sheets.");
    })
    .catch(error => {
        console.error("Error logging to Google Sheets", error);
    })
    .finally(() => {
        btn.innerText = "Generate Bill";
        btn.disabled = false;
    });
});






// Clear Form Logic
document.getElementById("btnClear").addEventListener("click", function() {
    // Reset input values
    document.getElementById("custName").value = "";
    document.getElementById("waterCons").value = "";
    document.getElementById("custType").value = "Regular";
    
    
    document.getElementById("receiptArea").innerText = "";
});