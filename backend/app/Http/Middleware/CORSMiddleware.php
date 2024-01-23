<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CORSMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('OPTIONS')) {
            $response = \response('', 200);
        }else{
            $response = $next($request);
        }

        $response->headers->set('Access-Control-Allow-Origin',"*");
        $response->headers->set('Access-Control-Allow-Methods','PUT,GET, POST, DELETE, OPTIONS, PATCH');
        $response->headers->set('Access-Control-Allow-Headers',$request->header('access-control-request-Headers'));
        $response->headers->set('Access-Control-Allow-Credentials','true');
        $response->headers->set('Accept','application/json');
        $response->headers->set('Acces-Control-Epose-Headers','location');
        return $response;

    }
}
