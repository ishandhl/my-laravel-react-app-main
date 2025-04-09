<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_genre', function (Blueprint $table) {
            $table->id('genreid');
            $table->unsignedBigInteger('projectid');

            $table->foreign('genreID')->references('genreID')->on('genre');
            $table->foreign('projectID')->references('projectID')->on('projects');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_genre');
    }
};
