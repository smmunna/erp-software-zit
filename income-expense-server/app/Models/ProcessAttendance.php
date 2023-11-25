<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProcessAttendance extends Model
{
    use HasFactory;
    protected $fillable = [
        "emp_id",
        "name",
        "email",
        "attendance_status",
        "date"
    ];
}
