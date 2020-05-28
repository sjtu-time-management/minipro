<?php
file_put_contents('data.log',serialize($_POST),FILE_APPEND);

	
	//获取参数
	$openid=$_POST["_openid"];
	$dataid=$_POST["_id"];
	$itag=$_POST["itag"];
	$idate=$_POST["iyear"];
	$idate="{$idate[0]}";
	$itime=$_POST["itime"];
	$notiindex=$_POST["noti_index"];
	
	//修改时间，变为提醒时间进行存储
	$timeset="$idate,$itime";
	switch($notiindex){
	case 0:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset-30 minute"));
		break;
	case 1:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset-10 minute"));
		break;

	case 2:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset-5 minute"));
		break;

	case 3:
		$timeset=date('Y-m-d,H:i:s',strtotime("$timeset"));
		break;
	}

	$idate=substr($timeset,0,10);
	$notitime=substr($timeset,11);
//存入数据库
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="12345678";
	$dbname = "test";

	$conn =new mysqli($dbhost,$dbuser,$dbpass,$dbname);	
	$sql = "INSERT INTO notification(openid, dataid, itag, idate, itime, notiindex, notitime) VALUES ('$openid','$dataid','$itag','$idate','$itime',$notiindex,'$notitime')";
	if ($conn->query($sql) === TRUE) {
    echo 200;
	
	
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
file_put_contents('0.log',serialize($conn),FILE_APPEND);	

?>