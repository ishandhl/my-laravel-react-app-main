<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Genre;
use App\Models\Images;
use App\Models\Rewards;
use App\Models\Updates;
use App\Models\Projects;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Termwind\Components\Raw;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function users() //Returns all user information
    {
        $users = User::select('id', 'name', 'role', 'email', 'email_verified_at', 'location', 'status')->get();
        return response()->json([
            $users
        ]);
    }

    public function user(Request $request) //Returns a specific user's information
    {
        $user = User::select('id', 'name', 'role', 'email', 'email_verified_at', 'location', 'status')
            ->find($request->id);

        return response()->json([
            $user
        ]);
    }

    public function verifyEmail($id)
    {
        // Logic to verify email for user with ID $id
        $user = User::findOrFail($id);
        $user->email_verified_at = now();
        $user->save();

        return response()->json(['message' => 'Email verified successfully']);
    }

    public function resetPassword($id)
    {
        // Logic to reset password for user with ID $id
        $user = User::findOrFail($id);
        // Reset password logic here...

        return response()->json(['message' => 'Password reset successfully']);
    }

    public function update_user(Request $request) //Updates a user's information
    {
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->location = $request->location;
        $user->save();

        return response()->json([
            'message' => 'User updated successfully'
        ]);
    }

    // Add a new project as a user
    public function add_project(Request $request)
    {
        $coverImage = $request->file('coverImage');

        // Process cover image
        if (is_array($coverImage)) {
            // If coverImage is an array (multiple files uploaded)
            $filenameArray = [];
            foreach ($coverImage as $singleFile) {
                $filename = time() . '_' . $singleFile->getClientOriginalName();
                $singleFile->move(public_path('/images'), $filename);
                $filenameArray[] = "images\\$filename"; // Store full path
            }
            $coverImage = implode(',', $filenameArray); // Store comma-separated paths
        } else {
            // If coverImage is a single file
            $filename = time() . '_' . $coverImage->getClientOriginalName();
            $coverImage->move(public_path('/images'), $filename);
            $coverImage = "images\\$filename"; // Store full path
        }

        // Process other images
        $otherImages = [];
        if ($request->hasFile('otherImages')) {
            foreach ($request->file('otherImages') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('/images'), $filename);
                $otherImages[] = "images\\$filename"; // Store full path
            }
        }
        // Create project
        $project = Projects::create([
            'project_title' => $request->projectTitle,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'type' => $request->type,
            'start_date' => $request->startDate,
            'end_date' => $request->endDate,
            'funding_goal' => $request->goal,
            'cover_image' => $coverImage,
            'genre_id' => $request->genre,
            'creator_id' => $request->user
        ]);

        foreach ($otherImages as $imagePath) {
            Images::create([
                'image' => $imagePath,
                'image_id' => $project->projectID, // Use the retrieved project ID
                'image_type' => 'App\Projects'
            ]);
        }

        if ($request->rewards != null) {

            foreach ($request->rewards as $index => $rewardData) {
                $reward = Rewards::create([
                    'title' => $rewardData['title'],
                    'description' => $rewardData['description'],
                    'amount' => is_numeric((float)$rewardData['amount']) ? $rewardData['amount'] : null,
                    'estimated_delivery' => $rewardData['delivery'],
                    'projectID' => $project->projectID,
                    'reward_image' => '' // Default value for reward_image
                ]);

                // Process reward images
                if ($request->hasFile("rewards.$index.images")) {
                    $rewardImages = $request->file("rewards.$index.images");
                    foreach ($rewardImages as $rewardImage) {
                        $filename = time() . '_' . $rewardImage->getClientOriginalName();
                        $rewardImage->move(public_path('/images/rewards'), $filename);
                        $imagePath = "images/rewards/$filename";
                        $reward->reward_image = $imagePath; // Update reward_image for each image
                        $reward->save();
                    }
                }
            }
        }

        // Return response indicating success
        return response()->json([
            'message' => 'Project created successfully',
            'project_type' => $request->type,
        ]);
    }


    //for project page to show the details of the project for viewing, edit view to be done through the user 
    public function project_edit(Request $request)
    {
        $project = Projects::where('ProjectID', $request->id)->get();
        $genre = Genre::where('genreID', $project[0]->genre_id)->get();
        $creator = User::where('id', $project[0]->creator_id)->get();
        $images = Images::where('image_id', $request->id)->get();
        $rewards = Rewards::where('projectID', $request->id)->get();
        $transaction = Transactions::where('projectID', $request->id)->get();
        $backers = [];
    
        $totalAmount = 0;
    
        if (!$transaction->isEmpty()) {
            $backers = User::where('id', $transaction[0]->backerID)->get();
    
            $totalAmount = $transaction->reduce(function ($carry, $transaction) {
                return $carry + floatval($transaction->amount);
            }, 0);
        }
    
        $project[0]->backers = $backers;
        $project[0]->total_transactions = count($transaction);
        $project[0]->total_amount_raised = $totalAmount;
        $project[0]->genre = $genre[0]->name ?? null;
        $project[0]->creator = $creator[0]->name ?? null;
        $project[0]->creator_email = $creator[0]->email ?? null;
        $project[0]->images = $images;
        $project[0]->rewards = $rewards;
    
        return response()->json([
            'project' => $project,
        ]);
    }
    
    public function project_complete(Request $request, $id)
    {
        $project = Projects::where('projectID', $id)->firstOrFail();
        $project->status = 'Complete';
        $project->save();
    
        return response()->json([
            'message' => 'Project marked as completed',
        ]);
    }

    public function updateProjectDetails(Request $request, $id)
    {
        $project = Projects::where('projectID', $id)->firstOrFail();

        // Update project details
        $project->project_title = $request->input('project_title') ?: 'Default Project Title';
        $project->short_description = $request->input('short_description') ?: 'Default Short Description';
        $project->description = $request->input('description') ?: 'Default Description';
        $project->save();

        return response()->json([
            'message' => 'Project details updated successfully'
        ]);
    }

    public function updateProjectImages(Request $request, $id)
    {

        $project = Projects::where('projectID', $id)->firstOrFail();

        // Update cover image if changed
        if ($request->hasFile('cover_image')) {
            // Delete the old cover image
            if ($project->cover_image) {
                $oldCoverImage = public_path($project->cover_image);
                if (file_exists($oldCoverImage)) {
                    unlink($oldCoverImage);
                }
            }

            $coverImage = $request->file('cover_image');
            $filename = time() . '_' . $coverImage->getClientOriginalName();
            $coverImage->move(public_path('/images'), $filename);
            $project->cover_image = "images/$filename";
            $project->save();
        }

        // Process other images
        if ($request->hasFile('otherImages')) {
            // Delete the old images
            $oldImages = Images::where('image_id', $project->id)
                ->where('image_type', 'App\\Projects')
                ->get();

            foreach ($oldImages as $oldImage) {
                $oldImagePath = public_path($oldImage->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
                $oldImage->delete();
            }

            foreach ($request->file('otherImages') as $index => $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('/images'), $filename);
                $imagePath = "images/$filename";

                Images::create([
                    'image' => $imagePath,
                    'image_id' => $project->projectID,
                    'image_type' => 'App\\Projects'
                ]);
            }
        }

        return response()->json([
            'message' => 'Project images updated successfully',
            'project' => $project,
        ]);
    }

    public function deleteProjectImages(Request $request, $id, $imageid)
    {
        $image = Images::find($imageid);


        $filename = basename($image->image);

        // Check if the image exists
        if ($image) {
            // Delete the image record from the database
            $image->delete();

            // Remove the image file from the storage folder
            Storage::delete($filename);

            return response()->json(['message' => 'Image deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Image not found'], 404);
        }
    }

    public function add_project_reward(Request $request)
    {
        // Create a new reward instance
        $reward = Rewards::create([
            'title' => $request->title,
            'description' => $request->description,
            'amount' => $request->amount,
            'estimated_delivery' => $request->estimated_delivery,
            'projectID' => $request->projectID,
            'reward_image' => ''
        ]);

        // Process reward images if provided
        if ($request->hasFile("reward_image")) {
            $rewardImage = $request->file("reward_image");
            // Generate a unique filename for the image
            $filename = time() . '_' . $rewardImage->getClientOriginalName();
            // Move the image to the desired location
            $rewardImage->move(public_path('/images/rewards'), $filename);
            // Update reward_image for each image
            $imagePath = "images/rewards/$filename";
            $reward->reward_image = $imagePath;
            $reward->save();
        }
        return response()->json(['reward' => $reward], 200);
    }

    public function delete_project_reward(Request $request)
    {

        $reward = Rewards::find($request->rewardID);
        $reward->delete();
        return response()->json(['message' => 'Reward deleted successfully'], 200);
    }

    public function add_transaction(Request $request)
    {
        // Create a new transaction instance
        $transaction = Transactions::create([
            'transactionID' => $request->transaction_id,
            'amount' => $request->amount,
            'transactiondate' => $request->transaction_date,
            'projectID' => $request->project_id,
            'backerID' => $request->user_id,
            'rewardID' => $request->reward_id,
        ]);

        return response()->json(['transaction' => $transaction], 200);
    }

    public function add_project_updates(Request $request)
    {
        $projectUpdate = Updates::create([
            'projectID' => $request->project_id,
            'content' => $request->newUpdates,
        ]);

        return response()->json(['project_update' => $projectUpdate], 200);
    }

    public function project_updates(Request $request)
    {
        $projectUpdates = Updates::where('projectID', $request->id)->get();
        return response()->json(['project_updates' => $projectUpdates], 200);
    }

    public function delete_update(Request $request)
    {
        try {
            $update = Updates::where('updateID', $request->updateid)->first();

            if (!$update) {
                return response()->json(['error' => 'Update not found'], 404);
            }

            $update->delete();

            return response()->json(['message' => 'Update deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting update'], 500);
        }
    }
}
