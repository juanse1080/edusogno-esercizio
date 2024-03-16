<?php
include_once "route/route.php";

Route::post('/api/login', 'AuthController@login');
Route::post('/api/logout', 'AuthController@logout');
Route::post('/api/register', 'AuthController@register');
Route::post('/api/forgot-password', 'AuthController@forgotPassword');
Route::post('/api/reset-password', 'AuthController@resetPassword');

Route::get('/api/me', 'AuthController@me');
Route::put('/api/me', 'AuthController@updateProfile');
Route::put('/api/me/change-password', 'AuthController@changePassword');

Route::get('/api/me/event', 'AuthController@findMyEvents');
Route::post('/api/me/event/{id}', 'AuthController@joinEvent');

Route::get('/api/event', 'EventController@index');
Route::post('/api/event', 'EventController@create');

Route::get('/api/event/{id}', 'EventController@find');
Route::put('/api/event/{id}', 'EventController@update');
Route::delete('/api/event/{id}', 'EventController@delete');
Route::post('/api/event/{id}/join', 'EventController@addUsers');

Route::get('/api/user', 'UserController@index');
Route::post('/api/user', 'UserController@create');
Route::get('/api/user/{id}', 'UserController@find');
Route::put('/api/user/{id}', 'UserController@update');
Route::delete('/api/user/{id}', 'UserController@delete');
