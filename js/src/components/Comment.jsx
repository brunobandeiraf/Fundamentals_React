import { useState } from "react";
import styles from './Comment.module.css';

import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';

export function Comment({ content, onDeleteComment }) {
  
  const [likeCount, setLikeCount] = useState(0);

  {/*onDeleteComment - é a função disparada no botão*/}
  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    //setLikeCount(likeCount + 1);
    setLikeCount((state) => {
      return state + 1
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/Anselmo5.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Anselmo</strong>
              <time title="24 de Junho às 11:45h" dateTime="2022-05-11 08:13:00">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          {/* 
            Recebe o valor da propriedade content
          */}
          <p>{content}</p>
        </div>

        <footer>
          {/*
            onClick={ () => handleLikeComment(likeCount + 1)}
          */}
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}