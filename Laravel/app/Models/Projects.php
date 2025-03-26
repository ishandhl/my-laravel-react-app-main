<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\morphMany;

class Projects extends Model
{
    use HasFactory;
    protected $primaryKey = 'projectID';
    protected $fillable = [
        'project_title',
        'short_description',
        'description',
        'type',
        'start_date',
        'end_date',
        'status',
        'funding_goal',
        'cover_image',
        'genre_id',
        'creator_id'
    ];

    protected $table = "projects";

    public function genres()
    {
        return $this->belongsToOne(Genre::class);
    }

    public function images(): morphMany
    {
        return $this->morphMany(Images::class, 'images');
    }

    public function rewards()
    {
        return $this->hasMany(Rewards::class);
    }
}
