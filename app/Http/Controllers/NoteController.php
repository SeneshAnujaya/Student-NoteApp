<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Requests\StoreNoteRequest;

class NoteController extends Controller
{
    public function index() {
    $notes = Note::latest()->paginate(6);

    // return response()->json($notes);
     return response()->json([
            'success' => true,
            'data' => $notes
        ], 200);
    }

    public function store(StoreNoteRequest $request) {

        $validated = $request->validate([
            'title'=> 'required|max:120',
            'content'=>'required|max:1000',
            'priority'=>'required|in:low,medium,high'
        ]);

        $note = Note::create($validated);
        return response()->json($note, 201);

}

public function archive($id) {
    $note = Note::findOrFail($id);

    if ($note->is_archived) {
        return response()->json([
            'message' => 'Note already archived'
        ], 403);
    }

    $note->is_archived = true;
    $note->save();

    return response()->json(['message' => 'Note Archived Successfully'], 201);
}

}
