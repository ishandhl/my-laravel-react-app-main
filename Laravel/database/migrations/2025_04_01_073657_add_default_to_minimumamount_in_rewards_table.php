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
         Schema::table('rewards', function (Blueprint $table) {
             //
             $table->integer('minimumamount')->default(0)->change();  // Set default to 0
         });
     }
 
     /**
      * Reverse the migrations.
      */
     public function down(): void
     {
         Schema::table('rewards', function (Blueprint $table) {
             //
             $table->integer('minimumamount')->nullable()->change();  // Remove default value
         });
     }
 };
