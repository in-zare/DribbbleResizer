<?php

namespace App\Services;

use Image;

class ResizeService extends BaseService
{
    public function resizeForDribbble($post)
    {
        $size = explode("x", $post['size']);

        $width = $size[0];
        $height = $size[1];
        $bgColor = $this->getBgColor($post['bgColor'], $post['customColor']);
        $margin = $post['margin'] ? $post['margin'] : "0";

        //var_dump($post['file']);
        $image = Image::make($post['file']->getPathName());
        $fileName = $post['file']->getClientOriginalName();
        $filePath = "../public/img/converted/".$fileName;

        if ($image->width() < $width and $image->height() < $height) {
            $image->resizeCanvas($width, $height, 'center', false, $bgColor);
            $image->save($filePath);
            return $fileName;
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
        $image->save($filePath);

        return $fileName;
    }

    private function getBgColor($bgColor, $customColor)
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
}
