$(function() {
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
			url : gp.operatePath + "signin",
			type : "POST",
			data : {name: name, password: password},
			success : function(data, status) {
				// 处理请求结果
				switch (status) {
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
					case 200 :
						location.href = jumpPath + "index";
						break;
					default :
						console.log(status);
						break;
				}
			}
		});
	});
});