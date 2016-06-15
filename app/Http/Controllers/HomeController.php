<?php

namespace App\Http\Controllers;

use App\Services\ResizeService;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    public function resize(Request $request, ResizeService $resizeService)
    {
        $post = $request->all();
        $fileName = $resizeService->resizeForDribbble($post);

        return new JsonResponse([
            'file' => $fileName
        ]);
    }
}
