<?php
$servername="localhost";
$username="root";
$password="12345678";
$dbname = "test";
$date=date('Y-m-d');
$week=date("w",strtotime("$date"));
$time=date('H:i:s');
$time1=substr($time,0,5);
$weekray=array("周日","周一","周二","周三","周四","周五","周六");
$openid="oh14r0r_Kp1YdM2zTgtWS-wGypus";
$templateid_2="dTE5adql6y1LO8Y0Mj7gnbbOu7CNCIaaS7u3lDVpebk";
$appId='wxc82d658122a014d3';
$secret='cc8e6d0d25d3e085708b04a11be2c98a';

$Url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appId&secret=$secret";

$conn = mysqli_connect($servername, $username, $password);
if(! $conn )
{
    die('连接失败: ' . mysqli_error($conn));
}
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");
 
$sql = "SELECT openid, itag, cstart, cdow
        FROM class
	
	WHERE notitime LIKE '$time1%' AND cdow=$week";

 
mysqli_select_db( $conn, 'test' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('无法读取数据: ' . mysqli_error($conn));
}
//数据库中找提醒时间到的记录
while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC))
{

    
    //$openid=$row['openid'];     //使用测试号无法识别openid
    $itag=$row['itag'];
    $cstart=$row['cstart'];
    $cdow=$row['cdow'];
    //获取accesstoken
    $accesstoken=file_get_contents($Url);
    $accesstoken=json_decode($accesstoken);
    $ACCESS_TOKEN=$accesstoken->access_token;

    $url="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=$ACCESS_TOKEN";
    //封装数据
	$str_data=array
	(
		"touser"=>$openid,
		"template_id"=>$templateid_2,
		"topcolor"=>"#FF0000",
		"data"=>
			array(
				"text"=>
					array( 
						"value"=>$itag,
						"color"=>"#173177"
					),
				"time"=>
					array(
						"value"=>$cstart,
						"color"=>"#173177"
					),
				"date"=>
					array(
						"value"=>$date,
						"color"=>"#173177"
					),
				"week"=>
					array(
						"value"=>$weekray[$cdow],
						"color"=>"#173177"
					)

				)
	);
	//发送公众号提醒
	$data=json_encode($str_data);
	file_put_contents('7.log',serialize($data),FILE_APPEND);
	$curl=curl_init($url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	$response=curl_exec($curl);
	curl_close($curl);
	file_put_contents('8.log',serialize($response),FILE_APPEND);

}


mysqli_close($conn);


?>