@extends('layouts.default')
@section('content')

<form id="dropzone" method="POST" action="/resize" enctype="multipart/form-data" class="dropzone">
{{ csrf_field() }}
<div class="panel panel-default" id="dropzone"  style="position: relative">
    <div class="drop-here">
        Drop here
    </div>
    <div class="panel-body">
        <div class="title">Upload</div>
        <div class="drag upload">
            <span class="info-text">Drag a photo or </span>
            <button type="button" class="btn btn-pink btn-browse active">Browse</button>
        </div>
        <div class="drag file-name">
        </div>
    </div>
</div>

<div class="panel panel-default">
    <div class="panel-body clearfix">
        <div style="width: 50%;float:left;">
            <input type="hidden" id="image-size" name="size" value="400x300"/>
            <div class="title">Size</div>
            <button type="button" class="btn btn-pink btn-size active">400x300</button>
            <button type="button" class="btn btn-pink btn-size">800x600</button>
        </div>
        <div style="width: 50%;float:right">
            <div class="title">Margin</div>
            <input type="text" class="margin-input" name="margin" value="0"/>
        </div>
    </div>
</div>

<div class="panel panel-default">
    <div class="panel-body">
        <div class="title">Background color</div>

        <input type="radio" id="r1" checked="checked" name="bgColor" value="white"/>
        <label for="r1"><span></span>White</label>

        <input type="radio" id="r2" name="bgColor" value="black"/>
        <label for="r2"><span></span>Black</label>

        <input type="radio" id="r3" name="bgColor" value="custom"/>
        <label for="r3"><span></span>HEX <input type="text" class="jscolor" name="customColor" value="F36E9F"></label>
    </div>
</div>
<button type="submit" class="btn btn-pink btn-resize">Resize</button>
</form>
@endsection
@section('footer_scripts')
    <script src="{{ asset('js/jscolor.min.js') }}"></script>
    <script src="{{ asset('js/home.js') }}"></script>
@stop