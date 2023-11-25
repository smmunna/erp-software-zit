import { createBrowserRouter } from "react-router-dom";
import Login from "../shared/Login/Login";
import Main from "../layout/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AddIncome from "../pages/Dashboard/AddIncome/AddIncome";
import AddExpense from "../pages/Dashboard/AddExpense/AddExpense";
import IncomeReport from "../pages/Dashboard/Report/IncomeReport/IncomeReport";
import ExpenseReport from "../pages/Dashboard/Report/ExpenseReport/ExpenseReport";
import CustomerList from "../pages/Dashboard/Report/CustomerList/CustomerList";
import DueList from "../pages/Dashboard/Report/DueList/DueList";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import CustomerView from "../pages/Dashboard/Report/CustomerList/CustomerView";
import DueListEdit from "../pages/Dashboard/Report/DueList/DueListEdit";
import AddDueProfit from "../pages/Dashboard/Report/AddDueProfit/AddDueProfit";
import EditIncomeReport from "../pages/Dashboard/Report/IncomeReport/EditIncomeReport";
import EditExpense from "../pages/Dashboard/Report/ExpenseReport/EditExpense";
import CompanyProgress from "../pages/Dashboard/CompanyProgress/CompanyProgress";
import AddDueProfitIncome from "../pages/Dashboard/Report/AddDueProfit/AddDueProfitIncome";
import CompanySetup from "../pages/Dashboard/CompanySetup/CompanySetup";
import AddService from "../pages/Dashboard/CompanySetup/ServiceSection/AddService";
import AddMarketingPerson from "../pages/Dashboard/CompanySetup/MarketingPerson/AddMarketingPerson";
import PaymentMethod from "../pages/Dashboard/CompanySetup/PaymentMethod/PaymentMethod";
import Reason from "../pages/Dashboard/CompanySetup/Reason/Reason";
import Who from "../pages/Dashboard/CompanySetup/Who/Who";
import ViewIncome from "../pages/Dashboard/Report/IncomeReport/viewIncome";
import ResetUser from "../pages/Dashboard/ResetUser/ResetUser";
import EditUser from "../pages/Dashboard/ResetUser/EditUser";
import EditDueFull from "../pages/Dashboard/Report/DueList/EditDueFull";
import SalarySetup from "../pages/Dashboard/HrPayroll/SalarySetup/SalarySetup";
import SetupWorkingdays from "../pages/Dashboard/HrPayroll/SetupWorkingdays/setupWorkingdays";
import AttendanceProcess from "../pages/Dashboard/HrPayroll/AttendanceProcess/AttendanceProcess";
import ViewAttendance from "../pages/Dashboard/HrPayroll/AttendanceProcess/ViewAttendance";
import SalaryProcess from "../pages/Dashboard/HrPayroll/SalaryProcess/SalaryProcess";
import ViewFinalProcess from "../pages/Dashboard/HrPayroll/ViewFinalProcess/ViewFinalProcess";
import EditFinalProcessSalary from "../pages/Dashboard/HrPayroll/ViewFinalProcess/EditFinalProcessSalary";
import EditAttendance from "../pages/Dashboard/HrPayroll/AttendanceProcess/EditAttendance";
import Profile from "../pages/Dashboard/HrPayroll/User/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Main /></PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
                children: [
                    {
                        path: '',
                        element: <PrivateRoutes><DashboardHome /></PrivateRoutes>
                    },
                    {
                        path: 'company-setup',
                        element: <PrivateRoutes><CompanySetup /></PrivateRoutes>
                    },
                    {
                        path: 'services',
                        element: <PrivateRoutes><AddService /></PrivateRoutes>
                    },
                    {
                        path: 'marketing-persons',
                        element: <PrivateRoutes><AddMarketingPerson /></PrivateRoutes>
                    },
                    {
                        path: 'payment-method',
                        element: <PrivateRoutes><PaymentMethod /></PrivateRoutes>
                    },
                    {
                        path: 'reason',
                        element: <PrivateRoutes><Reason /></PrivateRoutes>
                    },
                    {
                        path: 'who',
                        element: <PrivateRoutes><Who /></PrivateRoutes>
                    },
                    {
                        path: 'company-progress',
                        element: <PrivateRoutes><CompanyProgress /></PrivateRoutes>
                    },
                    {
                        path: 'add-income',
                        element: <PrivateRoutes><AddIncome /></PrivateRoutes>
                    },
                    {
                        path: 'add-expenses',
                        element: <PrivateRoutes><AddExpense /></PrivateRoutes>
                    },
                    {
                        path: 'income-report',
                        element: <PrivateRoutes><IncomeReport /></PrivateRoutes>
                    },
                    {
                        path: 'income-invoice/:id',
                        element: <PrivateRoutes><ViewIncome /></PrivateRoutes>
                    },
                    {
                        path: 'expense-report',
                        element: <PrivateRoutes><ExpenseReport /></PrivateRoutes>
                    },
                    {
                        path: 'customer-list',
                        element: <PrivateRoutes><CustomerList /></PrivateRoutes>
                    },
                    {
                        path: 'due-list',
                        element: <PrivateRoutes><DueList /></PrivateRoutes>
                    },
                    {
                        path: 'edit-due-full/:id',
                        element: <PrivateRoutes><EditDueFull /></PrivateRoutes>
                    },
                    {
                        path: 'due-list-edit/:id',
                        element: <PrivateRoutes><DueListEdit /></PrivateRoutes>
                    },
                    {
                        path: 'view-customer/:id',
                        element: <PrivateRoutes><CustomerView /></PrivateRoutes>
                    },
                    {
                        path: 'add-dueprofit/:id',
                        element: <PrivateRoutes><AddDueProfit /></PrivateRoutes>
                    },
                    {
                        path: 'add-dueprofit-income/:id',
                        element: <PrivateRoutes><AddDueProfitIncome /></PrivateRoutes>
                    },
                    {
                        path: 'edit-incomereport/:id',
                        element: <PrivateRoutes><EditIncomeReport /></PrivateRoutes>
                    },
                    {
                        path: 'edit-expense/:id',
                        element: <PrivateRoutes><EditExpense /></PrivateRoutes>
                    },
                    {
                        path: 'reset-user',
                        element: <PrivateRoutes><ResetUser /></PrivateRoutes>
                    },
                    {
                        path: 'edit-user/:id',
                        element: <PrivateRoutes><EditUser /></PrivateRoutes>
                    },
                    {
                        path: 'salary-setup',
                        element: <PrivateRoutes><SalarySetup /></PrivateRoutes>
                    },
                    {
                        path: 'workingday-setup',
                        element: <PrivateRoutes><SetupWorkingdays /></PrivateRoutes>
                    },
                    {
                        path: 'attendance-process',
                        element: <PrivateRoutes><AttendanceProcess /></PrivateRoutes>
                    },
                    {
                        path: 'view-attendance',
                        element: <PrivateRoutes><ViewAttendance /></PrivateRoutes>
                    },
                    {
                        path: 'edit-attendance/:name/:date',
                        element: <PrivateRoutes><EditAttendance /></PrivateRoutes>
                    },
                    {
                        path: 'salary-process',
                        element: <PrivateRoutes><SalaryProcess /></PrivateRoutes>
                    },
                    {
                        path: 'view-salary-process',
                        element: <PrivateRoutes><ViewFinalProcess /></PrivateRoutes>
                    },
                    {
                        path: 'edit-final-salary/:id',
                        element: <PrivateRoutes><EditFinalProcessSalary /></PrivateRoutes>
                    },
                    {
                        path: 'profile',
                        element: <PrivateRoutes><Profile /></PrivateRoutes>
                    },
                ]
            }
        ]
    },
    {
        path: '*',
        element: <div>
            <h3 className="text-red-500 py-20 text-center">No routes found, go to home..</h3>
        </div>
    }

]);

export default router;
