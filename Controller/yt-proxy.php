<?php

if (!isset($_GET['q'])) {
    http_response_code(400);
    exit("Missing query");
}

$query = urlencode($_GET['q']);
$url = "https://www.youtube.com/results?search_query=" . $query;

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_USERAGENT => "Mozilla/5.0",
    CURLOPT_COOKIE => "CONSENT=YES+",
]);
    
//// FORCE CERT FILE IF IN DEVELOPMENT
if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) {
    curl_setopt($ch, CURLOPT_CAINFO, "C:/wamp64/bin/php/extras/ssl/cacert.pem");
}
    
$response = curl_exec($ch);

if ($response === false) {
    echo "CURL ERROR: " . curl_error($ch);
    curl_close($ch);
    exit;
}

curl_close($ch);

echo $response;