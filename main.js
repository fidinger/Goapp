// frontend/components/NoteEditor.jsx
import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function NoteEditor({ noteId }) {
  const [content, setContent] = useState('');
  const [telegramToken, setTelegramToken] = useState('');

  useEffect(() => {
    if (noteId) {
      ipcRenderer.invoke('get-note', noteId).then(note => {
        setContent(note.content);
      });
    }
  }, [noteId]);

  const handleSave = () => {
    ipcRenderer.invoke('save-note', { id: noteId, content });
  };

  const handleSetToken = () => {
    ipcRenderer.invoke('set-telegram-token', telegramToken);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={handleSave}>Сохранить</button>
        <input 
          type="password" 
          placeholder="Telegram Bot Token" 
          value={telegramToken}
          onChange={(e) => setTelegramToken(e.target.value)}
        />
        <button onClick={handleSetToken}>Подключить бота</button>
      </div>
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        placeholder="Напишите свою заметку здесь. Используйте #goal для целей..."
      />
    </div>
  );
}

export default NoteEditor;
