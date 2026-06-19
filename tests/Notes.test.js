import { describe, it, expect } from 'vitest'

describe('Priority Filter', () => {
    it('returns only high priority notes', () => {
        const notes = [
            { priority: 'low' },
            { priority: 'high' },
            { priority: 'high' }
        ]

        const filtered = notes.filter(
            note => note.priority === 'high'
        )

        expect(filtered.length).toBe(2)
    })
})