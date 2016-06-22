var gp = {
	operatePath : "http://127.0.0.1:3000/admin/",
	jumpPath : "http://127.0.0.1:8888/admin/"
}

$(function() {
	// 退出登录
	$("#signout").on("click",function() {
		$.ajax({
			url : gp.operatePath + "account/signout",
			type : "DELETE",
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				location.reload();
			},
			error : function(res) {
				console.log(res.status);
			}
		});

		return false;
	});
});

function htmlEncode(value){
	return $('<div/>').text(value).html();
}

function htmlDecode(value){
	return $('<div/>').html(value).text();
}