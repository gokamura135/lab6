'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
	
	var url = '/project/' + idNumber;
	$.get(url, addProject);
	console.log(url);
}

function addProject(result) {

	console.log(result);

	var str = '<a href="#" class ="project">' + 
		'<img src="' + result['image'] + '" class="detailsImage">' +
		'<p>' + result['title'] + '</p>' +
		'<p><small>' + result['date'] + '</small></p></a>'+
		'<p>' + result['summary'] +'</p>';
	
	var projectID = $('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	
	//console.log(str);
	var selectingid = "#project" + String(result['id']);
	console.log(selectingid);
	//var selector = $(selectingid+".project .thumbnail .details");
	
	$(selectingid +".project .thumbnail .details").html(str);
	
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	
	var url = '/palette';
	$.get(url, changeColor);
}

function changeColor(result) {

	var colors = result['colors']['hex'];
	
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}