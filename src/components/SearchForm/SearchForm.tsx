import { useId } from 'react';
interface SearchFormProps {
    onSubmit: (query: string) => void;
}


export default function SearchForm ({onSubmit}: SearchFormProps) {
    const fieldId = useId();

    const handleSubmit = (formData: FormData) => {
        const query = formData.get('topic')  as string;
        
        if (!query) {
            alert('Please enter something');
            return;
        }
        onSubmit(query);

    };


    return (
        <>
        <form action={handleSubmit}>
            <label htmlFor={`${fieldId}-topic`}>Type topic</label>
        <input id={`${fieldId} - topic`} type="text" name="topic" />
            <button type="submit">Search</button>
        </form>
        </>
    )
}

