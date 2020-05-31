<?php
file_put_contents('data.log',serialize($_POST),FILE_APPEND);

	
	//获取参数
	$openid=$_POST["_openid"];
	$dataid=$_POST["_id"];
	$itag=$_POST["itag"];
	$cdow=$_POST["cdow"];
	$cstart=$_POST["cstart"];
	$notiindex=$_POST["noti_index"];
	$notitime=$cstart;
	//修改提醒时间参数
	switch($notiindex){
	case 0:
		$notitime=date('H:i:s',strtotime("$cstart-30 minute"));
		break;
	case 1:
		$notitime=date('H:i:s',strtotime("$cstart-10 minute"));
		break;

	case 2:
		$notitime=date('H:i:s',strtotime("$cstart-5 minute"));
		break;

	case 3:
		$notitime=date('H:i:s',strtotime("$cstart"));
		break;
	}

//存入课程数据库

	$dbhost="localhost";
	$dbuser="root";
	$dbpass="12345678";
	$dbname = "test";

	$conn =new mysqli($dbhost,$dbuser,$dbpass,$dbname);	
	$sql = "INSERT INTO class(openid, dataid, itag, cdow, cstart, notiindex, notitime) VALUES ('$openid','$dataid','$itag','$cdow','$cstart',$notiindex,'$notitime')";
	if ($conn->query($sql) === TRUE) {
    echo 200;
	
	
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
file_put_contents('0.log',serialize($conn),FILE_APPEND);	




?>