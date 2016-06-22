// 时间格式化方法
function setTimeType(time) {
	var date = new Date(time);
	var Y = date.getFullYear();
	var M = getDoubleNum(date.getMonth() + 1);
	var D = getDoubleNum(date.getDate());
	var h = getDoubleNum(date.getHours());
	var m = getDoubleNum(date.getMinutes());
	var s = getDoubleNum(date.getSeconds());
	return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

function getDoubleNum(num) {
	return (num > 9 ? num : 0 + num.toString());
}

exports.setTimeType = setTimeType;