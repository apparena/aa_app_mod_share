<?php
try
{
    if (empty($post['obj_data']['url']))
    {
        throw new \Exception('url was not sent by request in ' . __FILE__);
    }
    require_once ROOT_PATH . '/libs/bitly_api.php';
    $bitly = new \Bitly(BITLY_USER, BITLY_KEY);

    $message = $bitly->shorten($post['obj_data']['url']);
    if (empty($message))
    {
        $message = $post['obj_data']['url'];
    }

    $return['code']    = '200';
    $return['message'] = $message;
    $return['status']  = 'success';
}
catch (Exception $e)
{
    // prepare return data
    $return['code']    = $e->getCode();
    $return['status']  = 'error';
    $return['message'] = $e->getMessage();
    $return['trace']   = $e->getTrace();
}