<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcessSalary extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "email",
        "basic_salary",
        "advance",
        "ta",
        "bonus",
        "total_attendance",
        "final_salary",
        "month",
        "year"
    ];
}
