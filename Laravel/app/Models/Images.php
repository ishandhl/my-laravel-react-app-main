<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Relation;


class Images extends Model
{
    protected $table = 'images';

    protected $fillable = [
        'image',
        'image_id',
        'image_type'
    ];

    public function images(): MorphTo
    {
        return $this->morphTo(Projects::class);
    }
}
