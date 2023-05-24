import React, { useState } from 'react';

const Comentario = ({ onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(comment);
        setComment('');
    };

    return (
        <div>
            <h3>Añadir Comentario</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Escribe tu comentario..."
                    rows={4}
                ></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Comentario;
