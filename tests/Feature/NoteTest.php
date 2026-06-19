<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NoteTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_a_note()
    {
        $response = $this->postJson('/api/notes', [
            'title' => 'Test Note',
            'content' => 'This is a test note content',
            'priority' => 'high',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('notes', [
            'title' => 'Test Note'
        ]);
    }

    public function test_can_archive_a_note()
    {
        $note = Note::create([
            'title' => 'Test',
            'content' => 'Content here',
            'priority' => 'low',
        ]);

        $response = $this->patchJson("/api/notes/{$note->id}/archive");

        $response->assertStatus(200);

        $this->assertDatabaseHas('notes', [
            'id' => $note->id,
            'is_archived' => true
        ]);
    }
}