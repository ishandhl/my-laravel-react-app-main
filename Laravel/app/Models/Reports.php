<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reports extends Model
{
    use HasFactory;
    protected $primaryKey = 'reportID';

    protected $fillable = [
        'report',
        'userID',
        'projectID'
    ];
}
