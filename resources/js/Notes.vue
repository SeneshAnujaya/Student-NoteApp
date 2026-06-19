<template>
    <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-center mb-8">
             Note App
        </h1>

        <!-- Create Note -->
        <div class="bg-slate-100 shadow-md rounded-lg p-6 mb-6">
            <div class="space-y-4">
                <input
                    v-model="form.title"
                    type="text"
                    placeholder="Title"
                    class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <textarea
                    v-model="form.content"
                    placeholder="Content"
                    rows="4"
                    class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>

                <select
                    v-model="form.priority"
                    class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>

                <button
                    @click="createNote"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Create Note
                </button>
            </div>
        </div>

        <!-- Filter -->
         <div class="flex justify-between gap-2">
            <div class="mb-6">
            <select
                v-model="filter"
                class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <p class="mb-4 text-gray-600">
    Total Notes: {{ filteredNotes.length }}
</p>
        
         </div>
        

        <!-- Loadin -->
        <p v-if="loading" class="text-blue-600 font-medium">
            Loading...
        </p>

        <p v-if="error" class="text-red-500 font-medium">
            {{ error }}
        </p>

        <!-- Notes -->
        <div class="grid grid-cols-3 gap-4 p-3">
            <div
                v-for="note in filteredNotes"
                :key="note.id"
                class="bg-white shadow rounded-lg p-5 border"
            >
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-xl font-semibold">
                        {{ note.title }}
                    </h3>

                    <span
                        class="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        :class="{
                            'bg-green-500': note.priority === 'low',
                            'bg-yellow-500': note.priority === 'medium',
                            'bg-red-500': note.priority === 'high'
                        }"
                    >
                        {{ note.priority }}
                    </span>
                </div>

                <p class="text-gray-600 mb-4">
                    {{ note.content }}
                </p>

                <p
                    v-if="note.is_archived"
                    class="text-red-500 font-medium mb-3"
                >
                    Archived
                </p>


                <button
    v-if="!note.is_archived"
    @click="archive(note.id)"
    class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
>
    Archive
</button>

<button
    v-else
    @click="unarchive(note.id)"
    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
>
    Unarchive
</button>
            </div>
        </div>

        <div
    v-if="lastPage > 1"
    class="flex justify-center items-center gap-2 mt-6"
>
    <button
        @click="fetchNotes(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 border rounded disabled:opacity-50"
    >
        Previous
    </button>

    <button
        v-for="page in lastPage"
        :key="page"
        @click="fetchNotes(page)"
        class="px-4 py-2 rounded"
        :class="
            page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
        "
    >
        {{ page }}
    </button>

    <button
        @click="fetchNotes(currentPage + 1)"
        :disabled="currentPage === lastPage"
        class="px-4 py-2 border rounded disabled:opacity-50"
    >
        Next
    </button>
</div>
    </div>
</template>

<script setup> 
import { onMounted } from "vue";
import useNotes from "./composables/useNotes";

const {loading,
    error,
    filter,
    form,
    filteredNotes,
    fetchNotes,
    createNote,
    archive, currentPage, lastPage, unarchive } = useNotes();

    onMounted(() => {
        fetchNotes()
    })
</script>

