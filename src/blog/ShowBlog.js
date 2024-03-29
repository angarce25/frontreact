import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Form } from 'react-bootstrap';

const URI = 'http://localhost:8000/blogs';

const CompShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filtrar los blogs según el término de búsqueda
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Obtener los blogs actuales en la página
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <main>
            <div className="container">
                <div className="row justify-content-between mt-4">
                    <div className="col-md-6">
                        <Form.Control
                            type="text"
                            placeholder="Buscar blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    {currentBlogs.map((blog) => (
                        <div className="col-md-6 mb-4" key={blog.id}>
                            <article className="card">
                                <div className="card-body">
                                    <h2 className="card-title">{blog.title}</h2>
                                    <p className="card-text">{blog.content}</p>
                                    <img src={blog.Url_image} alt={blog.title} className="card-img-top" style={{ width: '100%', height: 'auto' }} />
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/edit/${blog.id}`} className="btn btn-info"><i className="fa-regular fa-pen-to-square"></i></Link>
                                        <button onClick={() => deleteBlog(blog.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <Pagination>
                            {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, index) => (
                                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CompShowBlogs;


