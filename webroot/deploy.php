<?php
/*
    DEPLOYMENT SCRIPT
    accepts a GitHub "Webhooks" payload and deploys
*/

$origin = "git@github.com:ecomstock/eric-comstock.git"; // "origin"
$secret = "85af050a1070u2a05ed97caa3ev56b50bcd6a9bp"; // this should be different for every repo
$branches = [
    'prod' => 'master',
    'stage' => 'develop'
];
$homedirs = [
    'prod' => 'ecomstock'
];

$env = getenv('PHP_ENV');
if (!$env) {
    $env = (strpos($_SERVER["HTTP_HOST"], "stag") !== false) ? "stage" : "prod";
}

$branch = $branches[$env];
$homedir = $homedirs[$env];

// Show all errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(401);
    exit;
}

define("SECRET", $secret);

if (!function_exists("getallheaders")) {
    function getallheaders () {
        $headers = array();
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) === "HTTP_") {
                $headers[str_replace(" ", "-", ucwords(strtolower(str_replace("_", " ", substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

function report($message)
{
    echo $message;
    error_log($message);
}

$body      = file_get_contents("php://input");
$signature = "sha1=" . hash_hmac("sha1", $body, SECRET);

$headers   = getallheaders();
if ($signature !== $headers["X-Hub-Signature"]) {
    report("Invalid signature : " . var_export($headers, true));
    http_response_code(401);
    exit;
}

$body = json_decode($body);
if (json_last_error() !== JSON_ERROR_NONE) {
    report("Invalid json : " . file_get_contents('php://input'));
    http_response_code(500);
    exit;
}

if (!$branch || !strstr($body->ref, $branch)) {
    report("Invalid branch : expecting {$branch}, received {$body->ref}");
    exit;
}

function execute($command)
{
    exec($command, $output, $success);
    $posixUser = "NULL/NOT POSIX";
    if (function_exists("posix_getuid")) {
        $pwu_data = posix_getpwuid(posix_geteuid());
        $username = $pwu_data['name'];
        $posixUser = $username;
    }
    if ($success !== 0 ) {
        $cmd = shell_exec($command . " 2>&1");
        $error = "Error: " . var_export($cmd, true);
        $username = "Running as: " . exec("whoami") . ". Posix: " . $posixUser . ". ";
        $deployStep = "Deploy step: {$command}.  ";
        $errorMsg = $username . $deployStep . $error;
        report($errorMsg);
        exit;
    }
}

execute("cd /home/{$homedir} && git pull {$origin} {$branch}");

report("Success!");
