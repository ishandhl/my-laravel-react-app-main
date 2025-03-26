<?php

use App\Models\User;
use App\Models\Projects;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\PasswordResetController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/email/verification-notification', [VerificationController::class, 'sendVerificationEmail'])->middleware('auth:api');
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');

Route::get('/password/reset', [PasswordResetController::class, 'requestReset']);
Route::post('/password/reset', [PasswordResetController::class, 'reset'])->name('password.reset');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',  [AuthController::class, 'login'])->name('login');
Route::post('register',  [AuthController::class, 'register']);
Route::get('/home', [ProjectController::class, 'home_projects']);
Route::get('/project/{id}', [ProjectController::class, 'project']);
Route::get('user/project/{id}/updates', [UserController::class, 'project_updates']);


Route::group(['middleware' => 'api'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh',  [AuthController::class, 'refresh']);
    Route::post('me',  [AuthController::class, 'me']);
    Route::get('/projects/genre', [AdminController::class, 'project_genre']);
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('admin/users', [UserController::class, 'users']);
    Route::get('admin/user/{id}', [UserController::class, 'user']);

    Route::get('admin/users/total', function () {
        return response()->json([User::count()]);
    });
    Route::get('admin/projects/all', function () {
        return response()->json([Projects::get()->all()]);
    });
    Route::get('admin/transactions/total', function () {
        return response()->json([Transactions::count()]);
    });

    Route::get('admin/users/edit/{id}', [AdminController::class, 'user_edit']);
    Route::put('admin/user/edit/{id}/status', [AdminController::class, 'user_status']);
    Route::put('admin/user/edit/{id}', [AdminController::class, 'user_update']);

    Route::post('/projects/genre/add', [AdminController::class, 'add_project_genre']);
    Route::delete('/projects/genre/remove/{id}', [AdminController::class, 'remove_project_genre']);
    Route::put('/project/{id}/update', [AdminController::class, 'update_project']);

    Route::get('/reports/{id}', [ProjectController::class, 'reports']);
});

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('user/my_projects/{id}', [ProjectController::class, 'all_user_projects']);
    Route::get('user/involved_projects/{id}', [ProjectController::class, 'involved_project']);

    Route::post('user/projects/create', [UserController::class, 'add_project']);
    Route::get('user/project/{id}', [UserController::class, 'project_edit']);
    Route::put('user/project/{id}/details', [UserController::class, 'updateProjectDetails']);
    Route::put('user/project/{id}/images', [UserController::class, 'updateProjectImages']);
    Route::delete('user/project/{id}/image/{imageid}', [UserController::class, 'deleteProjectImages']);

    Route::post('/user/project/{id}/reward/add', [UserController::class, 'add_project_reward']);
    Route::delete('/user/project/{id}/reward/delete', [UserController::class, 'delete_project_reward']);

    Route::post('user/project/updates', [UserController::class, 'add_project_updates']);
    Route::delete('user/project/{id}/update/{updateid}', [UserController::class, 'delete_update']);
    Route::put('/user/project/{id}/complete', [UserController::class, 'project_complete']);

    Route::get('/user/{id}', [UserController::class, 'user'])->name('profile');
    Route::put('/user/{id}/update', [UserController::class, 'update_user']);

    Route::post('/transaction/add', [UserController::class, 'add_transaction']);

    Route::post('/report/add', [ProjectController::class, 'add_report']);
});
