import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs';

const CompEditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Utiliza destructuring para extraer el id de los parámetros

    useEffect(() => {
        const getBlogById = async () => {
            try {
                const res = await axios.get(`${URI}/${id}`); // Corrige la URL para incluir el id correctamente
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (error) {
                console.error("Error fetching blog by id:", error);
            }
        };
        
        getBlogById(); // Llama a getBlogById dentro de useEffect
    }, [id]); // Agrega [id] como dependencia para que se vuelva a ejecutar cuando cambie el id

    // Procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI}/${id}`, { // Corrige la URL para incluir el id correctamente
                title: title,
                content: content
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    // Devuelve el JSX del componente
    return (
        <div>
            <h3>Edit Post</h3>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className="form-label">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <button type="submit" className='btn btn-primary'>Update</button>
            </form>
        </div>
    );
};

export default CompEditBlog;
