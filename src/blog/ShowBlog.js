import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs';

const CompShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        try {
            const res = await axios.get(URI);
            if (Array.isArray(res.data)) {
                setBlogs(res.data);
            } else {
                console.error("Data returned is not an array:", res.data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${URI}/${id}`);
            getBlogs(); // Recargar la lista después de eliminar
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    <Link to="/create" className="btn btn-primary mt-2 mb-2"><i className="fa-solid fa-plus"></i></Link>
                    <table className="table">
                        <thead className='table-primary'>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Url_image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.content}</td>
                                    <td>
                                        <img src={blog.Url_image} alt={blog.title} style={{ maxWidth: '80px' }} />
                                    </td>
                                    <td>
                                        <Link to={`/edit/${blog.id}`} className="btn btn-info"><i className="fa-regular fa-pen-to-square"></i></Link>
                                        <button onClick={() => deleteBlog(blog.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompShowBlogs;
