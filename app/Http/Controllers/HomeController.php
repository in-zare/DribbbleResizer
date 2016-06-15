<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Image;


/**
 * Class HomeController
 * @package App\Http\Controllers
 */
class HomeController extends Controller
{
    public function index()
    {
        return view('home.home');
    }

    public function getBgColor($bgColor, $customColor)
    {
        $color = "fff";
        if ($bgColor == 'white') {
            $color = "fff";
        }

        if ($bgColor == 'black') {
            $color = "000";
        }

        if ($bgColor == 'custom') {
            $color = $customColor;
        }

        return $color;
    }

    public function resize(Request $request)
    {
        $post = $request->all();
        $size = explode("x", $post['size']);

        $width = $size[0];
        $height = $size[1];
        $bgColor = $this->getBgColor($post['bgColor'], $post['customColor']);
        $margin = $post['margin'] ? $post['margin'] : "0";


        $image = Image::make($post['file']->getPathName());
        //var_dump($post['file']);exit;

        if ($image->width() < $width and $image->height() < $height) {
            $image->resizeCanvas($width, $height, 'center', false, $bgColor);
            $image->save("../storage/images/yea.jpg");
            return "yeah";
        }

        if ($image->width() > $image->height()) {
            $image->widen($width - $margin, function ($constraint) {
                $constraint->upsize();
            });
        }

        $image->heighten($height - $margin, function ($constraint) {
            $constraint->upsize();
        });

        $image->resizeCanvas($width, $height, 'center', false, $bgColor);
        $image->save("../storage/images/yea.jpg");

        return "yeah";

//
//        if ($image->height() > $image->width()) {
//
//        }
//        $image->resizeCanvas(400, 300);
//        return $image->response();
//
//        var_dump($_POST);exit;
//        var_dump($_FILES);exit;

//        $image = Image::make('img/test.jpg')->resizeCanvas(400, 300, 'center', false, 'F2F2F2');
//
//        return $image->response('jpg');
    }
}
