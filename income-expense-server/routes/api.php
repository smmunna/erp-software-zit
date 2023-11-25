<?php

use App\Http\Controllers\AttendanceProcessController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\MarketingPersonConroller;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProcessSalaryController;
use App\Http\Controllers\ReasonController;
use App\Http\Controllers\SalarySetupController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SetupcompanyController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WhoController;
use App\Http\Controllers\WorkingdaySetupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/user', [UserController::class, 'getUser']);  //Testing api;

Route::post('/add-user', [UserController::class, 'createUser']); //creating new user;
Route::get('/one-user', [UserController::class, 'getIndividualUser']); //get individual user;
Route::put('/update-user', [UserController::class, 'updateUser']); // update user
Route::patch('/update-pass', [UserController::class, 'updatePassword']); //update password
Route::delete('/delete-user', [UserController::class, 'deleteUser']); //deleting user;


Route::post('/login', [UserController::class, 'login']); //login activities;
Route::post('/add-income', [IncomeController::class, 'addIncome']); //add income
Route::post('/add-expense', [ExpenseController::class, 'addExpense']); //add expense
Route::put('/update-dues', [IncomeController::class, 'updateDueList']); //update the dues amount only
Route::put('/add-due-profit', [IncomeController::class, 'addDueProfit']); //update due and profit data
Route::put('/edit-income', [IncomeController::class, 'editIncome']); //edit income
Route::delete('/delete-income', [IncomeController::class, 'deleteIncome']); //delete income
Route::put('/edit-expense', [ExpenseController::class, 'editExpense']); //edit expense
Route::delete('/delete-expense', [ExpenseController::class, 'deleteExpense']); //delete expense

// Getting service model
Route::post('/add-service', [ServiceController::class, 'addService']); //add services
Route::put('/update-service', [ServiceController::class, 'updateService']); //update services
Route::delete('/delete-service', [ServiceController::class, 'deleteService']); //Delete services

// Getting marketing person model
Route::post('/add-marketing-person', [MarketingPersonConroller::class, 'addMarketingPerson']); //add marketing persons
Route::put('/update-marketing-person', [MarketingPersonConroller::class, 'updateMarketingPerson']); //update marketing persons
Route::delete('/delete-marketing-person', [MarketingPersonConroller::class, 'deleteMarketingPerson']); //Delete marketing persons


// Getting payment method model
Route::post('/add-payment-method', [PaymentMethodController::class, 'addPaymentMethod']); // Add payment methods
Route::put('/update-payment-method', [PaymentMethodController::class, 'updatePaymentMethod']); // Update payment methods
Route::delete('/delete-payment-method', [PaymentMethodController::class, 'deletePaymentMethod']); // Delete payment methods

// Getting reason model
Route::post('/add-reason', [ReasonController::class, 'addReason']); // Add reasons
Route::put('/update-reason', [ReasonController::class, 'updateReason']); // Update reasons
Route::delete('/delete-reason', [ReasonController::class, 'deleteReason']); // Delete reasons

// Getting who model
Route::post('/add-who', [WhoController::class, 'addWho']); // Add who
Route::put('/update-who', [WhoController::class, 'updateWho']); // Update who
Route::delete('/delete-who', [WhoController::class, 'deleteWho']); // Delete who

// Company setup all;
Route::post('/company-info', [SetupcompanyController::class, 'updateCompanyInfo']);
Route::put('/update-company', [SetupcompanyController::class, 'latestUpdateInfo']);


// Send Sms Route;
Route::post('/send-sms', [SmsController::class, 'sendSms']);



// Salary Setup;
Route::post('/setup-salary', [SalarySetupController::class, 'addSalary']);
Route::patch('/edit-salary', [SalarySetupController::class, 'editSalary']);
Route::delete('/delete-salary', [SalarySetupController::class, 'deleteSalary']);


// Workingday setup
Route::post('/add-days', [WorkingdaySetupController::class, 'addWorkingday']);
Route::patch('/edit-days', [WorkingdaySetupController::class, 'editDays']);
Route::delete('/delete-workingdays', [WorkingdaySetupController::class, 'deleteWorkingdays']);

// attendance process
Route::post('/add-attendance', [AttendanceProcessController::class, 'addAttendance']);
Route::patch('/edit-attendance', [AttendanceProcessController::class, 'updateAttendance']);



// Process Salary;
Route::post('/add-process-salary', [ProcessSalaryController::class, 'addProcessSalary']);
Route::patch('/update-finale-salary', [ProcessSalaryController::class, 'updateIndividualSalary']);




//All secure URL's
Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::get('/customer-list', [IncomeController::class, 'showCustomerList']); //all customer list
    Route::get('/due-list', [IncomeController::class, 'allDueList']); // all dues list
    Route::get('/income-list', [IncomeController::class, 'allIncomeList']); //all income list
    Route::get('/expense-list', [ExpenseController::class, 'allExpenseList']); //all expense list
    Route::get('/customer-income-data', [IncomeController::class, 'customerIncomeData']);


    Route::get('/expense-service', [ExpenseController::class, 'totalExpenseService']);  // Service wise expense;

    // total Income expense for dashboard;
    Route::get('/total-income-expense', [IncomeController::class, 'totalIncomeExpense']);
    Route::get('/increp-markperson', [IncomeController::class, 'incomeReportByMarketingPerson']);
    Route::get('/total-expense', [ExpenseController::class, 'totalExpense']);

    Route::get('/company-details', [SetupcompanyController::class, 'companydetails']); //company setup info
    Route::get('/all-who', [WhoController::class, 'getAllWho']); // who
    Route::get('/all-reasons', [ReasonController::class, 'getAllReasons']); // Getting reason model
    Route::get('/all-payment-methods', [PaymentMethodController::class, 'getAllPaymentMethods']);    // Getting payment method model
    Route::get('/all-marketing-persons', [MarketingPersonConroller::class, 'getAllMarketingPersons']);  // Getting marketing person model
    Route::get('/all-service', [ServiceController::class, 'getAllService']); // Getting service model

    // HR & Payroll Activity;
    Route::get('/show-salary', [SalarySetupController::class, 'showSetupSalariesList']);
    Route::get('/show-workingdays', [WorkingdaySetupController::class, 'showWorkingdays']);

    // Attendance Process;
    Route::get('/show-attendance', [AttendanceProcessController::class, 'showAttendanceList']);

    Route::get('/each-attendance', [AttendanceProcessController::class, 'getCurrentMonthAttendance']);

    // Joining tables between salary setup and attendace process;
    Route::get('/join-salary-attendance', [AttendanceProcessController::class, 'joinSalaryAttendance']);

    // Process salary;
    Route::get('/view-all-processed-salary', [ProcessSalaryController::class, 'viewProcessedSalary']);
    Route::get('/show-individualdata-idwise', [ProcessSalaryController::class, 'individualShowSalaryById']);

    // Current month & year attendance
    Route::get('/current-month-attendance', [AttendanceProcessController::class, 'getCurrentMonthAttendance']);

    // Individual Profile
    Route::get('/individual-profile', [IncomeController::class, 'empolyeeProfile']);

    // Profile details routes
    Route::get('/assigned-works', [IncomeController::class, 'assignedWorks']);
});

// Error Routes
Route::get('{any}', [IncomeController::class, 'errorRoutes']);
