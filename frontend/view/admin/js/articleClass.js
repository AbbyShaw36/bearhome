$(function() {
	$("#createClass_btn").on("click",function() {
		var className = $.trim($("#createClass_input").val());

		if (!className) {
			alert("分类名称不能为空！");
		}

		$.ajax({
			url : gp.operatePath + "articleClass/create",
			type : "POST",
			dataType : "json",
			data : "name=" + className,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				console.log(data);
			}
		});
	});
});