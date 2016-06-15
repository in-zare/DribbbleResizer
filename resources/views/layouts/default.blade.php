<html>
<head>
    <meta charset="UTF-8">
    <title>
        @section('title')
            Dribbble Resizer
        @show
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/img/favicon/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/img/favicon/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/img/favicon/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/favicon/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/img/favicon/apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/img/favicon/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/img/favicon/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/img/favicon/apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/img/favicon/favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="Dribbble Resizer"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="/img/favicon/mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="/img/favicon/mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="/img/favicon/mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="/img/favicon/mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="/img/favicon/mstile-310x310.png" />

    <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Raleway&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <!-- global level css -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css" />
    <!-- end of global css-->
    <!-- page level styles-->
    <!-- end of page level styles-->
    <!--page level css-->
    @yield('header_styles')
    <!--end of page level css-->
    @include('meta')
</head>
<body>
@include('analytics')
<div class="shadow">
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="logo" href="/">
                    Dribbble resizer
                </a>
            </div>
        </div>
    </nav>
    <div class="container-fluid content">
        @yield('content')

        <div class="footer">
            Created by <a target="_blank" href="http://inzare.com">Iulia</a> & <a target="_blank" href="http://feh.im">Fehim</a>
        </div>
    </div>
</div>
<!-- global js -->
<script src=" {{ asset('js/jquery-1.11.1.min.js') }}" type="text/javascript"></script>
<!-- begin page level js -->
@yield('footer_scripts')

<!-- end page level js -->

</body>
</html>