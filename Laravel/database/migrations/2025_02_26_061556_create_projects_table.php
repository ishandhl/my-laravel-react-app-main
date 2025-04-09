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
        Schema::create('projects', function (Blueprint $table) {
            $table->id('projectID');
            $table->string('project_title');
            $table->text('description');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('status')->default('pending');
            $table->decimal('funding_goal', 10, 2);
            $table->decimal('current_funding', 10, 2)->default(0.00);
            $table->string('cover_image')->nullable();
            $table->unsignedBigInteger('genre_id');
            $table->unsignedBigInteger('creator_id');

            $table->foreign('genre_id')->references('genreID')->on('genre');
            $table->foreign('creator_id')->references('id')->on('users');

            // You may include additional columns as needed for the projects table.

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
