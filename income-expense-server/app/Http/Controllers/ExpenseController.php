<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ExpenseController extends Controller
{
    //add expense data to db;
    public function addExpense(Request $req)
    {
        $reason = $req->reason;
        $who = $req->who;
        $amount = $req->amount;
        $details = $req->details;
        $date = $req->date;

        $expense = new Expense();
        $expense->reason = $reason;
        $expense->who = $who;
        $expense->amount = $amount;
        $expense->details = $details;
        $expense->date = $date;

        $expense->save();

        return ['status' => 'ok'];
    }

    // Edit the Expense data;
    public function editExpense(Request $req)
    {
        $id = $req->query('id');

        $reason = $req->reason;
        $who = $req->who;
        $amount = $req->amount;
        $details = $req->details;
        $date = $req->date;

        $expense = Expense::where('id', $id)->first();

        $expense->reason = $reason;
        $expense->who = $who;
        $expense->amount = $amount;
        $expense->details = $details;
        $expense->date = $date;

        $expense->save();

        return ['status' => 'ok'];
    }

    // Delete Expenses;
    public function deleteExpense(Request $req)
    {
        $id = $req->query('id');
        $expense = Expense::find($id);
        if ($expense) {
            $expense->delete();
            return ['status' => 'ok'];
        } else {
            return ['status' => 'Data not found'];
        }
    }

    // Show all expense list;
    public function allExpenseList()
    {
        $expenseList = Expense::orderBy('date', 'desc')->get();
        return $expenseList;
    }

    // Get sum of each expense;
    public function totalExpense()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        // Get the first day of the previous month
        $firstDayOfPreviousMonth = Carbon::now()->subMonthNoOverflow()->startOfMonth();

        // Get the last day of the previous month
        $lastDayOfPreviousMonth = Carbon::now()->subMonthNoOverflow()->endOfMonth();

        $totalAmountCurrentMonth = Expense::whereMonth('date', $currentMonth)->sum('amount');
        $totalAmountPrevMonth = Expense::whereBetween('date', [$firstDayOfPreviousMonth, $lastDayOfPreviousMonth])->sum('amount');

        $totalAmountCurrentYear = Expense::whereYear('date', $currentYear)->sum('amount');
        $totalAmountPrevYear = Expense::whereYear('date', $currentYear - 1)->sum('amount');
        $totalAmountPrev1Year = Expense::whereYear('date', $currentYear - 2)->sum('amount');
        $totalAmountPrev2Year = Expense::whereYear('date', $currentYear - 3)->sum('amount');

        $totalAmountPrev3Year = Expense::whereYear('date', $currentYear - 4)->sum('amount');
        $totalAmountPrev4Year = Expense::whereYear('date', $currentYear - 5)->sum('amount');
        $totalAmountPrev5Year = Expense::whereYear('date', $currentYear - 6)->sum('amount');
        $totalAmountPrev6Year = Expense::whereYear('date', $currentYear - 7)->sum('amount');
        $totalAmountPrev7Year = Expense::whereYear('date', $currentYear - 8)->sum('amount');
        $totalAmountPrev8Year = Expense::whereYear('date', $currentYear - 9)->sum('amount');
        $totalAmountPrev9Year = Expense::whereYear('date', $currentYear - 10)->sum('amount');



        return [[
            'total_expense_amount_currentMonth' => $totalAmountCurrentMonth,
            'toal_expense_amount_prevMonth' => $totalAmountPrevMonth,
            'toal_expense_amount_currentYear' => $totalAmountCurrentYear,
            'toal_expense_amount_prevYear' => $totalAmountPrevYear,
            'toal_expense_amount_prev1Year' => $totalAmountPrev1Year,
            'toal_expense_amount_prev2Year' => $totalAmountPrev2Year,
            'toal_expense_amount_prev3Year' => $totalAmountPrev3Year,
            'toal_expense_amount_prev4Year' => $totalAmountPrev4Year,
            'toal_expense_amount_prev5Year' => $totalAmountPrev5Year,
            'toal_expense_amount_prev6Year' => $totalAmountPrev6Year,
            'toal_expense_amount_prev7Year' => $totalAmountPrev7Year,
            'toal_expense_amount_prev8Year' => $totalAmountPrev8Year,
            'toal_expense_amount_prev9Year' => $totalAmountPrev9Year,
        ]];
    }

    // Total Expense service wise;
    public function totalExpenseService()
    {

        $currentMonth = Carbon::now()->month;
        $prevMonth = Carbon::now()->subMonth()->month;
        $currentYear = Carbon::now()->year;
        $prevYear = Carbon::now()->subYear()->year;

        // Fetch services from the database, unique values;
        $services =  array_unique(Expense::pluck('reason')->toArray());

        $totals = [];

        foreach ($services as $service) {
            $totalAmountCurrentMonth = Expense::where('reason', $service)->whereMonth('date', $currentMonth)->sum('amount');
            $totalAmountPrevMonth = Expense::where('reason', $service)->whereMonth('date', $prevMonth)->sum('amount');
            $totalAmountCurrentYear = Expense::where('reason', $service)->whereYear('date', $currentYear)->sum('amount');
            $totalAmountPrevYear = Expense::where('reason', $service)->whereYear('date', $prevYear)->sum('amount');

            $totals[] = [
                'service' => $service,
                'total_expense_amount_currentMonth' => $totalAmountCurrentMonth,
                'total_expense_amount_prevMonth' => $totalAmountPrevMonth,
                'total_expense_amount_currentYear' => $totalAmountCurrentYear,
                'total_expense_amount_prevYear' => $totalAmountPrevYear,
            ];
        }

        // Sort the array by 'total_expense_amount_currentMonth' in descending order
        usort($totals, function ($a, $b) {
            return $b['total_expense_amount_currentMonth'] - $a['total_expense_amount_currentMonth'];
        });

        return $totals;
    }
}
