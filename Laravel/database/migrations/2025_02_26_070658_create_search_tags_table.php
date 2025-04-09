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
        Schema::create('search_tags', function (Blueprint $table) {
            $table->id('searchID');
            $table->unsignedBigInteger('projectID');
            $table->json('keywords'); // Assuming you want to store an array of keywords as JSON

            $table->foreign('projectID')->references('projectID')->on('projects');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('search_tags');
    }
};
