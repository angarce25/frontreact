import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs';

const CompEditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [Url_image, setUrl_image] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getBlogById = async () => {
            try {
                const res = await axios.get(`${URI}/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setUrl_image(res.data.Url_image); // Aquí ajustamos para usar Url_image
            } catch (error) {
                console.error("Error fetching blog by id:", error);
            }
        };
        
        getBlogById();
    }, [id]);

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI}/${id}`, {
                title: title,
                content: content,
                Url_image: Url_image // Ajustamos para usar Url_image
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

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
                <div className='mb-3'>
                    <label className="form-label">Image URL</label>
                    <input
                        value={Url_image}
                        onChange={(e) => setUrl_image(e.target.value)}
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
