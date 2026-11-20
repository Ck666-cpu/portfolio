import { useEffect, useState } from 'react';

// Small typing effect: types, pauses, deletes, moves to next word.
export function useTyping(words, { type = 70, erase = 35, hold = 1600 } = {}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const word = words[i % words.length];
    if (reduce) {
      setText(word);
      const t = setTimeout(() => setI((n) => n + 1), hold * 1.5);
      return () => clearTimeout(t);
    }
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), hold);
    else if (deleting && text === '') {
      setDeleting(false);
      setI((n) => n + 1);
    } else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? erase : type,
      );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, type, erase, hold]);

  return text;
}
