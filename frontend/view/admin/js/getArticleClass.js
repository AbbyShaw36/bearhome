$(function() {
	$.ajax({
		url : gp.operatePath + "articleClass/get",
		type : "GET",
		crossDomain : true,
		xhrFields: {withCredentials: true},
		success : function(data,status) {
			console.log(data);
		}
	});
});