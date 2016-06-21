$(function() {
	// 验证是否已登录
	$.ajax({
		url : gp.operatePath + "account/isSignedIn",
		type : "GET",
		crossDomain : true,
		xhrFields: {withCredentials: true},
		success : function(data,status) {
			location.href = gp.jumpPath + "index.html";
		},
		error : function(res) {
			console.log(res.status);
		}
	});

	// 点击提交登录
	$("#submit").on("click",function() {
		var name = $.trim($("#signinForm .name input").val());
		var password = $.trim($("#signinForm .password input").val());

		// 检查用户名
		if (!name) {
			$.alert({
				title : "错误提示",
				content : "用户名不能为空！"
			});

			return;
		}

		// 检查密码
		if (!password) {
			$.alert({
				title : "错误提示",
				content : "密码不能为空！"
			});

			return;
		}

		// 发送请求
		$.ajax({
			url : gp.operatePath + "account/signin",
			type : "POST",
			dataType : "json",
			data : {
				name: name,
				password: password
			},
			crossDomain: true,
			xhrFields: {withCredentials: true},
			success : function(data, status) {
				location.href = gp.jumpPath + "index.html";
			},
			error : function(res) {
				switch (res.status) {
					case 400 :
						$.alert({
							title : "错误提示",
							content : "用户名和密码不能为空！"
						});
						break;
					case 500 :
						$.alert({
							title : "错误提示",
							content : "登录失败！"
						});
						break;
					case 404 :
						$.alert({
							title : "错误提示",
							content : "用户名或密码错误！"
						});
						break;
					default :
						console.log(status);
						break;
				}
			}
		});
	});
});