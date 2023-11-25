<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;
    protected $fillable = [
        'service',
        'marketing_person',
        'client',
        'contact_no',
        'email',
        'payment_method',
        'project_value',
        'paid',
        'due',
        'profit',
        'date',
        'details'
    ];
}
