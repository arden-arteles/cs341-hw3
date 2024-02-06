$(() => {
	$("form#order-form").submit(formSubmit);
	orderHistory_generateDropdown();
});

function formSubmit(event) {
	event.preventDefault(); // don't want a page change as it's not stated that's desired.
	const notes = $("form#order-form textarea#notes")[0].value.trim();
		// getting instructions first for a guard clause
	if (notes.toLowerCase().includes("vegan")) {
		window.alert("Cheesecakes have dairy in them, we cannot provide a vegan option.");
		return;
	}
	// guard clause complete, let's get the other data

	const topping = $("form#order-form input[type=\"radio\"]:checked")[0].value;
		// this gets the selected topping. messy, but the best I can figure out while being precise
	const quantity = $("form#order-form select#quantity-dropdown")[0].value;
		// less messy. still sucks imo
	
	$("#toppings-confirm").text(`Topping: ${topping}`);
	$("#quantity-confirm").text(`Quantity: ${quantity}`);
	$("#notes-confirm").text(`Notes: ${notes}`);
		// generate page content from form data

	$("#form-container").addClass("hidden");
	$("#order-container").removeClass("hidden");
		// hide the form and show the submission option

}

function orderHistory_generateDropdown() {
	const container = $("div.dropdown-content")[0];
	const months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	for (const month of months) {
		var element = document.createElement("a");
		element.innerText = month;
		// element.href = "#";
		// element.setAttribute("onclick", `document.querySelector("#order-history-select-month").innerText = \"${month}\";`);
		element.href = `javascript:orderHistory_setMonth("${month}");`
		container.appendChild(element);
		container.appendChild(document.createElement("br"));
	}
}

function orderHistory_setMonth(month) {
	$("button#order-history-select-month").text(month);
}