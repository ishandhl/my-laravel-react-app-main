<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Genre;
use App\Models\Images;
use App\Models\Reports;
use App\Models\Rewards;
use App\Models\Projects;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ProjectController extends Controller
{
    //for home page or instances to show the cover images of the project
    public function all_user_projects(Request $request)
    {
        $projects = Projects::where('creator_id', $request->id)->get();
        foreach ($projects as $project) {
            //error_log('Project ID: ' . $project->projectID); // Log the ProjectID for debugging
            $transaction = Transactions::where('projectID', $project->projectID)->get();

            // Calculate total amount raised only if $transaction is not null
            $totalAmount = 0;
            if (!is_null($transaction)) {
                $totalAmount = $transaction->reduce(function ($carry, $transaction) {
                    return $carry + floatval($transaction->amount);
                }, 0);
            }

            $project->total_transactions = count($transaction);
            $project->total_amount_raised = $totalAmount;
        }

        return response()->json([
            'projects' => $projects
        ]);
    }

    public function involved_project(Request $request)
    {
        $inv_projects_id = Transactions::where('backerID', $request->id)->get();

        $inv_projects = [];

        foreach ($inv_projects_id as $inv_project) {
            $project = Projects::where('ProjectID', $inv_project->projectID)->get();
            $genre = Genre::where('genreID', $project[0]->genre_id)->get();
            $creator = User::where('id', $project[0]->creator_id)->get();
            $images = Images::where('image_id', $inv_project->projectID)->get();
            $rewards = Rewards::where('rewardID', $inv_project->rewardID)->get();

            $project[0]->genre = $genre[0]->name;
            $project[0]->creator = $creator[0]->name;
            $project[0]->creator_email = $creator[0]->email;
            $project[0]->images = $images;
            $project[0]->rewards = $rewards;

            array_push($inv_projects, $project[0]);
        }

        return response()->json([
            'inv_projects' => $inv_projects
        ]);
    }

    //show projects on the home page working 
    public function home_projects()
    {
        $projects = Projects::all();

        foreach ($projects as $project) {
            //error_log('Project ID: ' . $project->projectID); // Log the ProjectID for debugging
            $transaction = Transactions::where('projectID', $project->projectID)->get();

            // Calculate total amount raised only if $transaction is not null
            $totalAmount = 0;
            if (!is_null($transaction)) {
                $totalAmount = $transaction->reduce(function ($carry, $transaction) {
                    return $carry + floatval($transaction->amount);
                }, 0);
            }

            $project->total_transactions = count($transaction);
            $project->total_amount_raised = $totalAmount;
        }

        return response()->json([
            'projects' => $projects
        ]);
    }
    //projects datas in pages 
    public function project(Request $request)
    {
        $project = Projects::where('ProjectID', $request->id)->get();
        $genre = Genre::where('genreID', $project[0]->genre_id)->get();
        $creator = User::where('id', $project[0]->creator_id)->get();
        $images = Images::where('image_id', $request->id)->get();
        $rewards = Rewards::where('projectID', $request->id)->get();
        $transaction = Transactions::where('projectID', $request->id)->get();


        // Only fetch transactions and backers if transactions exist
        if (!is_null($transaction) && count($transaction) > 0) {
            // Sort transactions by amount (desc) to find top donors
            $sortedTransactions = $transaction->sortByDesc('amount');

            // Get the top 3 donors
            $topThreeTransactions = $sortedTransactions->take(3);
            $topThreeDonors = $topThreeTransactions->map(function ($transaction) {
                $user = User::where('id', $transaction->backerID)->first();
                return [
                    'name' => $user->name,
                    'email' => $user->email,
                    'amount' => $transaction->amount
                ];
            });

            // Set top three donors
            $project[0]->top_three_donors = $topThreeDonors;

            // Calculate total amount raised
            $totalRaised = $transaction->sum('amount');
            $project[0]->total_amount_raised = $totalRaised;

            // Optionally get all backers (only if type is 'Invest')
            if ($project[0]->type === 'Invest') {
                $backers = User::whereIn('id', $transaction->pluck('backerID'))->get();
                $project[0]->backers = $backers;
            }
        }


        // Calculate total amount raised only if $transaction is not null
        $totalAmount = 0;
        if (!is_null($transaction)) {
            $totalAmount = $transaction->reduce(function ($carry, $transaction) {
                return $carry + floatval($transaction->amount);
            }, 0);
        }

        $project[0]->total_transactions = count($transaction);
        $project[0]->total_amount_raised = $totalAmount;
        $project[0]->genre = $genre[0]->name;
        $project[0]->creator = $creator[0]->name;
        $project[0]->creator_email = $creator[0]->email;
        $project[0]->images = $images;
        $project[0]->rewards = $rewards;

        return response()->json([
            'project' => $project,
        ]);
    }


    public function add_report(Request $request)
    {
        Reports::create(
            [
                'projectID' => $request->project_id,
                'report' => $request->report,
                'userID' => $request->user_id
            ]
        );

        return response()->json([
            'message' => 'Report sent successfully'
        ]);
    }

    public function reports(Request $request)
    {
        $reports = Reports::where('projectID', $request->id)->get();

        if ($reports->isNotEmpty()) {
            $user = User::find($reports[0]['userid']);

            // Check if user exists before trying to access the 'name' property
            if ($user) {
                $reports[0]->user = $user->name;
            } else {
                // Handle the case where the user doesn't exist (maybe set a default name or null)
                $reports[0]->user = 'User not found'; // You can customize this based on your needs
            }
        }

        return response()->json([
            'reports' => $reports
        ]);
    }
}
