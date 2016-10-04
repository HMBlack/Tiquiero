<?php
header('Content-type:text/html; charset="utf-8"');

/*
API:
	getPics.php

		参数
		cpage : 获取数据的页数

	isset()在php中用来检测变量是否设置，该函数返回的是布尔类型的值，即true/false。
	打开网页URL获得网页内容，比较常用的函数是fopen()和file_get_contents()
	iconv函数可以将一种已知的字符集文件转换成另一种已知的字符集文件
*/
$cpage = isset($_GET['cpage']) ? $_GET['cpage'] : 1;

$url = 'http://www.wookmark.com/api/json/popular?page=' . $cpage;

$content = file_get_contents($url);
$content = iconv('gbk', 'utf-8', $content);

echo $content;

?>


