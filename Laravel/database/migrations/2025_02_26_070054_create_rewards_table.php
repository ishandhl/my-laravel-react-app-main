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
        Schema::create('rewards', function (Blueprint $table) {
            $table->id('rewardID');
            $table->string('title');
            $table->text('description');
            $table->decimal('minimumamount', 10, 2);
            $table->timestamp('estimated_delivery');
            $table->unsignedBigInteger('projectID');

            $table->foreign('projectID')->references('projectID')->on('projects');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
