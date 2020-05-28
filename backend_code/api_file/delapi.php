<?php
file_put_contents('delete.log',serialize($_POST),FILE_APPEND);
	

	$dataid=$_POST["_id"];
	
	/*$dbhost="localhost";
	$dbuser="root";
	$dbpass="12345678";
	$dbname = "notification";*/
$conn =new mysqli("localhost","root","12345678","test");
//根据cdow变量检验删除课程还是事件
if($_POST["cdow"]===null)
{     
	$sql = "DELETE FROM notification WHERE dataid='$dataid'";
}
else{
	
	$sql = "DELETE FROM class WHERE dataid='$dataid'";
}	
if ($conn->query($sql) === TRUE) {
    echo 251;
	
	
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
	

?>