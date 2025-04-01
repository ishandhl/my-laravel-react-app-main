<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rewards extends Model
{
    use HasFactory;
    protected $primaryKey = 'rewardID';

    protected $fillable = [
        'title',
        'description',
        'minimumamount',
        'estimated_delivery',
        'projectID',
        'reward_image'
    ];  
}
