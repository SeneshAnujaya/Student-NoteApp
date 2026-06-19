import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';

export default function useNotes() {

    const notes = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const currentPage = ref(1);
    const lastPage = ref(1);

    const filter = ref("");

    const form = ref({
        title: "",
        content: "",
        priority: "low"
    });

    const fetchNotes = async (page = 1) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(`/api/notes?page=${page}`)
            notes.value = res.data

            notes.value = res.data.data.data;
            currentPage.value = res.data.data.current_page;
            lastPage.value = res.data.data.last_page;
        } catch (error) {
            error.value = "failed to load notes";
        } finally {
            loading.value = false;
        }
    }

    const createNote = async () => {
        try {
            await axios.post('/api/notes', form.value)

            form.value = {
                title: "",
                content: "",
                priority: "low"
            }
            toast.success('Note created successfully!');
            fetchNotes(currentPage.value)
        } catch (error) {
            error.value = "Failed to create note";
            toast.error('Failed to create note');
        }
    }

    const archive = async (id) => {
        console.log('archived');

        try {
            await axios.patch(`/api/notes/${id}/archive`);
            fetchNotes(currentPage.value)
            toast.success('Note archived successfully!');
        } catch (error) {
            error.value = "Failed to archive note";
            toast.success('Note archived failed!');
        }
    }

    const filteredNotes = computed(() => {
        if (!filter.value) return notes.value

        return notes.value.filter(n => n.priority === filter.value)
    })


    return {
        notes,
        loading,
        error,
        filter,
        form,
        filteredNotes,
        fetchNotes,
        createNote,
        archive,
        currentPage,
        lastPage
    };




}



