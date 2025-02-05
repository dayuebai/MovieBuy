function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Use regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let cId = getParameterByName('cId') ? getParameterByName('cId'): "";
let cName = getParameterByName('cName') ? getParameterByName('cName'): "";
let cAmount = getParameterByName('cAmount') ? getParameterByName('cAmount'): "";
let amount = getParameterByName('amount') ? getParameterByName('amount'): "";
let action = getParameterByName('action') ? getParameterByName('action'): "";
let queryUrl= "?cId=" + cId + "&cName=" + cName + "&cAmount=" + cAmount + "&amount=" + amount + "&action=" + action;

function handleResult(resultData) {
	let alertInfoElement = jQuery("#alert_info");
	let checkoutElement = jQuery("#checkout_button");
	let cartInfoElement = jQuery("#cart_info");

	let rowHTML = "";
	
	for (let i = 0; i < resultData.length; ++i)
	{
		var mId = resultData[i]["id"];
		var mName = resultData[i]["title"];
		var mQuantity = resultData[i]["quantity"];
		
		rowHTML += "<div class='container'>" + 
						"<div class='jumbotron bg-dark'>" + 
							"<div class='row'>" + 
								"<div class='col-lg'>" + 
									"<a style='font-size: 180%; color: #c44f1f;' href='movies.html?id=" + mId + "'" + "<label>" + mName + "</label></a>" + 
								"</div>" + 
								"<div class='col-lg-5'>" + 
									"<form style='border-style: none;' class='form-inline form-control bg-dark' action='cart.html'" + ">" + 
										"<input style='margin-right: 20px; border-style: solid;' class='bg-dark rounded border-primary text-light' type='number' min='0' max='1000' placeholder=" + mQuantity + " name='amount'" + " value=" + mQuantity + " required>" + 
										"<input type='hidden' name='cId' value='" + mId + "'>" + 
										"<input type='hidden' name='cName' value='"+ mName + "'>" + 
										"<input type='hidden' name='cAmount' value=''>" + 
										"<button style='margin-right: 10px;' type='submit' class='btn btn-primary'>Update</button>" + 
										"<input class='btn btn-primary' type='submit' name='action' value='Remove'>" + 
									"</form>" + 
								"</div>" + 
							"</div>" + 
						"</div>" + 
					"</div>";
							
		
//		rowHTML += "<form class='form-inline form-control' action='cart.html'" + ">";
//		rowHTML += mId + " " + mName + " ";
//		rowHTML += "<input type='number' placeholder=" + mQuantity + " name='amount'" + " value=" + mQuantity + " required>";
//		rowHTML += "<input type='hidden' name='cId' value='" + mId + "'>";
//		rowHTML += "<input type='hidden' name='cName' value='"+ mName + "'>";
//		rowHTML += "<input type='hidden' name='cAmount' value=''>";
//		rowHTML += "<button type='submit' class='btn btn-primary'>Update</button>";
//		rowHTML += "<input class='btn btn-primary' type='submit' name='action' value='Remove'>"
//		
//		rowHTML += "</form></div>";
	}
	cartInfoElement.append(rowHTML);
	
	// Ensure checkout button only appear when something is in the shopping cart
	if (resultData.length > 0){
		let i = "<div class='container'>" +
					"<div class='row'>" +  
						"<div class='col-lg-2'>" +  
							"<a style='text-decoration: none; margin-top: 0; margin-bottom: 40px; margin-left: 15%;' class='btn btn-danger float-right' href='movies.html' role='button'>Add more to cart</a>" + 
						"</div>" + 
						"<div class='col-lg-8'>" + 
							"<div style='text-align:center;'>" + 
								"<a id='toTop' href='#top'>Back to top</a>" + 
							"</div>" + 
						"</div>" + 
						"<div class='col-lg-2'>" +  
							"<a style='text-decoration: none; margin-top: 0; margin-bottom: 40px; margin-right: 6%;' class='btn btn-danger float-right' href='checkout.html' role='button'>Proceed to checkout</a>" + 
						"</div>" + 
					"</div>" + 
				"</div>";
							
		checkoutElement.append(i);
	}
	else{
		let alertString = "<div class='container'>" + 
							"<div class='row justify-content-center'>" + 
								"<div style='margin-top: 20%;' class='col-xs'>" + 
									"<h3 style='color: #98bf3d;'>Shopping cart, no item to checkout..</h3>" +
								"</div>" + 
							"</div>" +
							"<div class='row justify-content-center'>" + 
								"<div style='margin-top: 5px;' class='col-xs'>" + 
									"<a class='tips' href='movies.html'><i>Add films to cart</i></a>" +
								"</div>" + 
							"</div>" + 
						  "</div>";
		alertInfoElement.append(alertString);
	}
	
	// For copyright footer
	let copyrightElement = jQuery(".footer");
	
    let footerString =  "<hr style='padding: 0; margin: 0; border-color: #ffffff; border-width: 2px;' noshade>" + 
					"<ul style='align: middle; padding: 0;'>" + 
						"<li><a href='index.html'>Home</a>" + 
						"<li></li>" + 
						" <li>|</li> " + 
						"<li><a href='https://www.ics.uci.edu/~dayueb/'>About Fabflix</a>" + 
						"<li></li>" + 
						" <li>|</li> " + 
						"<li><a href='login.html'>Register an Account</a>" + 
						"<li></li>" + 
						" <li>|</li> " + 
						"<li><a href='cart.html'>Checkout</a>" + 
						"<li></li>" + 
						" <li>|</li> " + 
						"<li><a href='#'>Privacy Policy</a></li>" + 
					"</ul>" + 
					"<p align='middle' class='copyright'>Copyright &copy; 2018 by Michael Wang & Dayue Bai. All rights reserved.</p>";
    copyrightElement.append(footerString);
}


jQuery.ajax( {
	datatype: "json",
	method: "GET",
	url: "cart" + queryUrl,
	success: (resultData) => handleResult(resultData)
});