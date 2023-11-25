<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Income;
use App\Models\ProcessAttendance;
use App\Models\ProcessSalary;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

use function Laravel\Prompts\select;

class IncomeController extends Controller
{
    //add data to income controller;
    public function addIncome(Request $request)
    {
        $service = $request->service;
        $marketing_person = $request->marketing_person;
        $client = $request->client;
        $email = $request->email;
        $contact_no = $request->contact_no;
        $date = $request->date;
        $project_value = $request->project_value;
        $payment_method = $request->payment_method;
        $paid = $request->paid;
        $due = $request->due;
        $profit = $request->profit;
        $details = $request->details;
        $assigned_person = $request->assigned_person;


        $income = new Income();

        $income->service  = $service;
        $income->marketing_person = $marketing_person;
        $income->assigned_person = $assigned_person;
        $income->client = $client;
        $income->contact_no = $contact_no;
        $income->email = $email;
        $income->date = $date;
        $income->project_value = $project_value;
        $income->payment_method = $payment_method;
        $income->paid = $paid;
        $income->due = $due;
        $income->profit = $profit;
        $income->details = $details;

        $income->save();

        return ['status' => 'ok'];
    }

    //Edit Income data;
    public function editIncome(Request $request)
    {
        $id = $request->query('id');

        $service = $request->service;
        $marketing_person = $request->marketing_person;
        $assigned_person = $request->assigned_person;
        $client = $request->client;
        $email = $request->email;
        $contact_no = $request->contact_no;
        $date = $request->date;
        $project_value = $request->project_value;
        $payment_method = $request->payment_method;
        $paid = $request->paid;
        $due = $request->due;
        $profit = $request->profit;
        $details = $request->details;

        $income = Income::where('id', $id)->first();

        $income->service  = $service;
        $income->marketing_person = $marketing_person;
        $income->assigned_person = $assigned_person;
        $income->client = $client;
        $income->contact_no = $contact_no;
        $income->email = $email;
        $income->date = $date;
        $income->project_value = $project_value;
        $income->payment_method = $payment_method;
        $income->paid = $paid;
        $income->due = $due;
        $income->profit = $profit;
        $income->details = $details;

        $income->save();

        return ['status' => 'ok'];
    }

    // Delete Income;
    public function deleteIncome(Request $req)
    {
        $id = $req->query('id');
        $income = Income::find($id);
        if ($income) {
            $income->delete();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'data not found'];
        }
    }

    // Showing the distinct income list;
    public function showCustomerList()
    {
        $customer_list = Income::select('client', 'email', 'contact_no', 'date')
            ->distinct()
            ->orderBy('date', 'desc')
            ->get();

        return $customer_list;
    }

    // public function showCustomerList(Request $request)
    // {
    //     // Get the page number and limit from the request
    //     $page = max(1, $request->query('page', 1)); // Ensure page is at least 1
    //     $limit = $request->query('limit', 5); // Set a default limit if not provided

    //     // Calculate the offset based on the page number and limit
    //     $offset = ($page - 1) * $limit;

    //     // Fetch paginated customer list
    //     $customerList = Income::select('client', 'email', 'contact_no', 'date')
    //         ->distinct()
    //         ->orderBy('date', 'desc')
    //         ->offset($offset)
    //         ->limit($limit)
    //         ->get();

    //     return $customerList;
    // }


    // Showing all Income list;
    public function allIncomeList()
    {
        $incomeList = Income::orderBy('date', 'desc')->get();
        return $incomeList;
    }
    // public function allIncomeList(Request $request)
    // {
    //     $page = max(1, $request->query('page', 1)); // Ensure page is at least 1
    //     $limit = $request->query('limit', 5); // Set a default limit if not provided

    //     // Calculate the offset based on the page number and limit
    //     $offset = ($page - 1) * $limit;

    //     $incomeList = Income::select('id','client','marketing_person','assigned_person','service','project_value','paid','due','profit', 'date')
    //     ->orderBy('date','desc')
    //     ->offset($offset)
    //     ->limit($limit)
    //     ->get();

    //     $total = Income::count();

    //     return [['income'=>$incomeList, 'total'=>$total]];

    // }

    // Get individual income list 
    public function customerIncomeData(Request $req)
    {
        $id = $req->query('id');
        $income_data = Income::where('contact_no', $id)->get();
        return $income_data;
    }

    // Showing all dues list from the customer;
    public function allDueList()
    {
        $dueList = Income::select('id', 'service', 'client', 'email', 'contact_no', 'paid', 'due', 'date', 'profit', 'updated_at')
            ->where('due', '>', 0)
            ->orderByDesc('due')
            ->get();

        return $dueList;
    }


    // Update the due list data;
    public function updateDueList(Request $req)
    {
        $id = $req->query('id');
        $amount = $req->input('new_amount');
        $newpaid = $req->input('paid');
        $dueList = Income::where('id', $id)->first();
        $dueList->due =  $amount;
        $dueList->paid = $newpaid;
        $dueList->save();
        return ['status' => 'ok'];
    }

    // add Due & Profit;
    public function addDueProfit(Request $req)
    {
        $id = $req->query('id');
        $income = Income::where('id', $id)->first();
        // $due = $req->input('totalDue');
        $profit = $req->input('totalProfit');
        // $totalPaid = $req->input('totalPaid');

        // $income->due = $due;
        $income->profit = $profit;
        // $income->paid = $totalPaid;
        $income->save();

        return ['status' => 'ok'];
    }

    // Total Income + Expense List showing;
    public function totalIncomeExpense()
    {

        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Get the first day of the previous month
        $firstDayOfPreviousMonth = Carbon::now()->subMonthNoOverflow()->startOfMonth();

        // Get the last day of the previous month
        $lastDayOfPreviousMonth = Carbon::now()->subMonthNoOverflow()->endOfMonth();


        $totalPaidAmountCurrentMonth = Income::whereMonth('date', $currentMonth)->sum('paid');
        $totalPaidAmountPrevMonth = Income::whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])->sum('paid');

        $totalDueAmountCurrentMonth = Income::whereMonth('date', $currentMonth)->sum('due');
        $totalDueAmountPrevMonth = Income::whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])->sum('due');

        $totalProfitAmountCurrentMonth = Income::whereMonth('date', $currentMonth)->sum('profit');
        $totalProfitAmountPrevMonth = Income::whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])->sum('profit');

        $totalPaidAmountCurrentYear = Income::whereYear('date', $currentYear)->sum('paid');
        // $totalPaidAmountPrevYear = Income::whereYear('date', $currentYear - 1)->sum('paid');
        // $totalPaidAmountPrev1Year = Income::whereYear('date', $currentYear - 2)->sum('paid');
        // $totalPaidAmountPrev2Year = Income::whereYear('date', $currentYear - 3)->sum('paid');

        // $totalPaidAmountPrevYear = Income::whereYear('date', $currentYear - 1)->sum('paid');
        // $totalPaidAmountPrev1Year = Income::whereYear('date', $currentYear - 2)->sum('paid');
        // $totalPaidAmountPrev2Year = Income::whereYear('date', $currentYear - 3)->sum('paid');
        // $totalPaidAmountPrev3Year = Income::whereYear('date', $currentYear - 4)->sum('paid');
        // $totalPaidAmountPrev4Year = Income::whereYear('date', $currentYear - 5)->sum('paid');
        // $totalPaidAmountPrev5Year = Income::whereYear('date', $currentYear - 6)->sum('paid');
        // $totalPaidAmountPrev6Year = Income::whereYear('date', $currentYear - 7)->sum('paid');
        // $totalPaidAmountPrev7Year = Income::whereYear('date', $currentYear - 8)->sum('paid');
        // $totalPaidAmountPrev8Year = Income::whereYear('date', $currentYear - 9)->sum('paid');
        // $totalPaidAmountPrev9Year = Income::whereYear('date', $currentYear - 10)->sum('paid');



        $totalDueAmountCurrentYear = Income::whereYear('date', $currentYear)->sum('due');
        $totalDueAmountPrevYear = Income::whereYear('date', $currentYear - 1)->sum('due');

        $totalProfitAmountCurrentYear = Income::whereYear('date', $currentYear)->sum('profit');
        $totalProfitAmountPrevYear = Income::whereYear('date', $currentYear - 1)->sum('profit');
        $totalProfitAmountPrev1Year = Income::whereYear('date', $currentYear - 2)->sum('profit');
        $totalProfitAmountPrev2Year = Income::whereYear('date', $currentYear - 3)->sum('profit');
        $totalProfitAmountPrev3Year = Income::whereYear('date', $currentYear - 4)->sum('profit');
        $totalProfitAmountPrev4Year = Income::whereYear('date', $currentYear - 5)->sum('profit');
        $totalProfitAmountPrev5Year = Income::whereYear('date', $currentYear - 6)->sum('profit');
        $totalProfitAmountPrev6Year = Income::whereYear('date', $currentYear - 7)->sum('profit');
        $totalProfitAmountPrev7Year = Income::whereYear('date', $currentYear - 8)->sum('profit');
        $totalProfitAmountPrev8Year = Income::whereYear('date', $currentYear - 9)->sum('profit');
        $totalProfitAmountPrev9Year = Income::whereYear('date', $currentYear - 10)->sum('profit');


        // Monthly paid amount, and expense amount
        $monthlyPaidAmounts = [];

        for ($month = 1; $month <= 12; $month++) {
            // Calculate the total paid amount for the current month
            $totalPaidAmount = Income::whereMonth('date', $month)->sum('paid');
            $totalExpenseAmount = Expense::whereMonth('date', $month)->sum('amount');
            $totalProfitAmount = Income::whereMonth('date', $month)->sum('profit');

            // Store the total paid amount for the current month in the array
            $monthlyPaidAmounts[] = [
                'month' => $month,
                'total_paid' => $totalPaidAmount,
                'total_expense' => $totalExpenseAmount,
                'total_profit' => $totalProfitAmount
            ];
        }

        // End of monthly paid amount




        return response()->json([
            [
                'monthly_paid_amounts' => $monthlyPaidAmounts,
                'total_paid_currentMonth' => $totalPaidAmountCurrentMonth,
                'total_paid_prevMonth' => $totalPaidAmountPrevMonth,

                'total_paid_currentYear' => $totalPaidAmountCurrentYear,
                'total_paid_prevYear' => Income::whereYear('date', $currentYear - 1)->sum('paid'),
                'total_paid_prev1Year' => Income::whereYear('date', $currentYear - 2)->sum('paid'),
                'total_paid_prev2Year' => Income::whereYear('date', $currentYear - 3)->sum('paid'),
                'total_paid_prev3Year' => Income::whereYear('date', $currentYear - 4)->sum('paid'),
                'total_paid_prev4Year' => Income::whereYear('date', $currentYear - 5)->sum('paid'),
                'total_paid_prev5Year' => Income::whereYear('date', $currentYear - 6)->sum('paid'),
                'total_paid_prev6Year' => Income::whereYear('date', $currentYear - 7)->sum('paid'),
                'total_paid_prev7Year' => Income::whereYear('date', $currentYear - 8)->sum('paid'),
                'total_paid_prev8Year' => Income::whereYear('date', $currentYear - 9)->sum('paid'),
                'total_paid_prev9Year' => Income::whereYear('date', $currentYear - 10)->sum('paid'),



                'total_due_currentMonth' => $totalDueAmountCurrentMonth,
                'total_due_prevMonth' => $totalDueAmountPrevMonth,
                'total_due_currentYear' => $totalDueAmountCurrentYear,
                'total_due_prevYear' => $totalDueAmountPrevYear,
                'total_profit_currentMonth' => $totalProfitAmountCurrentMonth,
                'total_profit_prevMonth' => $totalProfitAmountPrevMonth,
                'total_profit_currentYear' => $totalProfitAmountCurrentYear,
                'total_profit_prevYear' => $totalProfitAmountPrevYear,
                'total_profit_prev1Year' => $totalProfitAmountPrev1Year,
                'total_profit_prev2Year' => $totalProfitAmountPrev2Year,
                'total_profit_amount_prev3Year' => $totalProfitAmountPrev3Year,
                'total_profit_amount_prev4Year' => $totalProfitAmountPrev4Year,
                'total_profit_amount_prev5Year' => $totalProfitAmountPrev5Year,
                'total_profit_amount_prev6Year' => $totalProfitAmountPrev6Year,
                'total_profit_amount_prev7Year' => $totalProfitAmountPrev7Year,
                'total_profit_amount_prev8Year' => $totalProfitAmountPrev8Year,
                'total_profit_amount_prev9Year' => $totalProfitAmountPrev9Year,
                'current_month' => $currentMonth,
                'prev_month' => $currentMonth - 1,
                'current_year' => $currentYear,
                'prev_year' => $currentYear - 1,
            ]
        ]);
    }


    //Income reports by Marketing person & assigned person;
    public function incomeReportByMarketingPerson()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Get the first day of the previous month
        $firstDayOfPreviousMonth = Carbon::now()->subMonthNoOverflow()->startOfMonth();

        // Get the last day of the previous month
        $lastDayOfPreviousMonth = Carbon::now()->subMonthNoOverflow()->endOfMonth();


        $salesByPersonCurrentMonth = Income::whereMonth('date', $currentMonth)
            ->select('marketing_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();

        // Previous Months Sales by each marketing person;
        $salesByPersonPrevMonth = Income::whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])
            ->select('marketing_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();


        // Current Year Sales by each marketing person;
        $salesByPersonCurrentYear = Income::whereYear('date', $currentYear)
            ->select('marketing_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();

        // Previous Year Sales by each marketing person;
        $salesByPersonPrevYear = Income::whereYear('date', $currentYear - 1)
            ->select('marketing_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();


        // Sales by Assigned Person;
        $salesByAssignedPersonCurrentMonth = Income::whereMonth('date', $currentMonth)
            ->select('assigned_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('assigned_person')
            ->orderByDesc('total_sales')
            ->get();
        $salesByAssignedPersonPrevMonth = Income::whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])
            ->select('assigned_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('assigned_person')
            ->orderByDesc('total_sales')
            ->get();

        $salesByAssignedPersonCurrentYear = Income::whereYear('date', $currentYear)
            ->select('assigned_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('assigned_person')
            ->orderByDesc('total_sales')
            ->get();
        $salesByAssignedPersonPrevYear = Income::whereYear('date', $currentYear - 1)
            ->select('assigned_person', Income::raw('SUM(paid) as total_sales'), Income::raw('SUM(profit) as total_profit'), Income::raw('SUM(due) as total_due'))
            ->groupBy('assigned_person')
            ->orderByDesc('total_sales')
            ->get();


        // Top sales services and their total paid amount;
        $topServices = Income::select(
            'service',
            Income::raw('COUNT(*) as total_sales'),
            Income::raw('SUM(paid) as total_paid')
        )
            ->whereYear('date', $currentYear)
            ->groupBy('service')
            ->orderByDesc('total_sales')
            ->get();


        // $topServices = Income::select(
        //     'service',
        //     Income::raw('COUNT(*) as total_sales'),
        //     Income::raw('SUM(paid) as total_paid'),
        // )
        //     ->groupBy('service')
        //     ->orderByDesc('total_sales')
        //     ->take(3)
        //     ->get();


        // Marketing person ranking current year;
        $marketingPersonsRanking = Income::selectRaw('marketing_person, SUM(paid) as total_sales')
            ->whereYear('date', $currentYear)
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();

        // Marketing person ranking previous year;
        $marketingPersonsRankingPrevYear = Income::selectRaw('marketing_person, SUM(paid) as total_sales')
            ->whereYear('date', $currentYear - 1)
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();

        // Marketing person ranking current Month;
        $marketingPersonsRankingCurrMonth = Income::selectRaw('marketing_person, SUM(paid) as total_sales')
            ->whereMonth('date', $currentMonth)
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();

        // Marketing person ranking Prev Month;
        $marketingPersonsRankingPrevMonth = Income::selectRaw('marketing_person, SUM(paid) as total_sales')
            ->whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])
            ->groupBy('marketing_person')
            ->orderByDesc('total_sales')
            ->get();

        // Last 10 Income data;
        $last10IncomeRecords = Income::orderBy('date', 'desc')->take(10)->get();
        $last10ExpenseRecords = Expense::orderBy('date', 'desc')->take(10)->get();


        return response()->json([[
            'last10Income' => $last10IncomeRecords,
            'last10Expense' => $last10ExpenseRecords,
            'top_services' => $topServices,
            'top_seller' => $marketingPersonsRanking,
            'top_sellerPrevYear' => $marketingPersonsRankingPrevYear,
            'top_sellerCurrMonth' => $marketingPersonsRankingCurrMonth,
            'top_sellerPrevMonth' => $marketingPersonsRankingPrevMonth,
            'sales_by_person_currentMonth' => $salesByPersonCurrentMonth,
            'sales_by_person_prevMonth' => $salesByPersonPrevMonth,
            'sales_by_person_currentYear' => $salesByPersonCurrentYear,
            'sales_by_person_prevYear' => $salesByPersonPrevYear,
            'sales_by_assigned_person_currentMonth' => $salesByAssignedPersonCurrentMonth,
            'sales_by_assigned_person_prevMonth' => $salesByAssignedPersonPrevMonth,
            'sales_by_assigned_person_currentYear' => $salesByAssignedPersonCurrentYear,
            'sales_by_assigned_person_prevYear' => $salesByAssignedPersonPrevYear,
            'current_Month' => $currentMonth,
            'current_year' => $currentYear,

        ]]);
    }


    // Individual profile and their details..
    public function empolyeeProfile(Request $request)
    {
        $year = $request->query('year');
        $month = $request->query('month');
        $email = $request->query('email');
        $final_salary = ProcessSalary::where(['year' => $year, 'month' => $month, 'email' => $email])
            ->select('name', 'email', 'basic_salary', 'advance', 'ta', 'bonus', 'total_attendance', 'final_salary')
            ->get();

        return [
            'salary' => $final_salary
        ];
    }

    // Get assigned person, income by marketing person and attendance shows
    public function assignedWorks(Request $request)
    {
        $year = $request->query('year');
        $month = $request->query('month');
        $person = $request->query('person');
        $email = $request->query('email');

        $assigned_works = Income::whereMonth('date', $month)
            ->whereYear('date', $year)
            ->where('assigned_person', $person)
            ->select('service', 'client', 'marketing_person', 'assigned_person', 'date')
            ->get();

        $marketing_income = Income::whereMonth('date', $month)
            ->whereYear('date', $year)
            ->where('marketing_person', $person)
            ->select('service', 'client', 'marketing_person', 'assigned_person', 'project_value', 'paid', 'due', 'date')
            ->get();

        $person_attendance = ProcessAttendance::whereMonth('date', $month)
            ->whereYear('date', $year)
            ->where('email', $email)
            ->select('attendance_status', 'date')
            ->orderBy('date', 'desc')
            ->get();

        return [
            'assigned_works' => $assigned_works,
            'marketing_income' => $marketing_income,
            'person_attendance' => $person_attendance
        ];
    }

    // Public Error routes;
    public function errorRoutes()
    {
        return view('error');
    }
}
